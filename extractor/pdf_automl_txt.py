import sys
import json
from google.api_core.client_options import ClientOptions
from google.cloud import automl_v1
from google.cloud.automl_v1.proto import service_pb2
import re
import collections

def inline_text_payload(file_path):
  with open(file_path, 'rb') as ff:
    content = ff.read()
  return {'text_snippet': {'content': content, 'mime_type': 'text/plain'} }

def pdf_payload(file_path):
  return {'document': {'input_config': {'gcs_source': {'input_uris': [file_path] } } } }

def get_prediction(file_path, model_name):
  options = ClientOptions(api_endpoint='automl.googleapis.com')
  prediction_client = automl_v1.PredictionServiceClient(client_options=options)

  # payload = inline_text_payload(file_path)
  # Uncomment the following line (and comment the above line) if want to predict on PDFs.
  payload = pdf_payload(file_path)

  params = {}
  request = prediction_client.predict(model_name, payload, params)
  return request  # waits until request is returned

if __name__ == '__main__':
  file_path = sys.argv[1]
  model_name = sys.argv[2]
output_obj = get_prediction(file_path, model_name) 
term_dict={}  
key_count=len(output_obj.payload)
for i in range(0,key_count):
  display_name = output_obj.payload[i].display_name
  content = output_obj.payload[i].text_extraction.text_segment.content
  values_list=[]
  score=output_obj.payload[i].text_extraction.score
  values_list.append(content)
  values_list.append(score)
  if term_dict.get(display_name)==None:
    term_dict[display_name]=values_list
  else:
    existing_term=term_dict.get(display_name)
    if score>existing_term[1]:
      term_dict[display_name]=values_list


dict_final={}
pdf_filename = re.findall("[ \w-]+?(?=\.)",file_path)
pdf_filename=pdf_filename[0]
txt_file_path='/home/srinidhi/angular/uploads/'+pdf_filename+'.txt'
file = open(txt_file_path, 'r')
count=0
for line in file.readlines():
  for key in term_dict.keys():
    if term_dict[key][0] in line:
      try:
        line=line.split(":")[1]
        line=line.replace(',', '')
        dict_final[key]=(re.findall("\S[0-9]\S{0,10}", line))
        term_dict.pop(key, None)
      except:
        print("exception")
      break
op = open("/home/srinidhi/angular/extractor/automl_logger.txt", "w")
def preprocessing(term_list):
  new_list=[]
  if term_list is None:
      term_list=[0,0,0]
  else:
    for ele in term_list:
      if ele.startswith('('):
        ele=ele.replace("(","-")
        ele=ele.replace(")","")
        new_list.append(ele)
      else:
        new_list.append(ele)
    term_list=new_list
  return term_list
list_TR=dict_final.get('TotalRevenue')
pre_TR=preprocessing(list_TR)
TotalRevenue=list(map(float,pre_TR))
op.writelines("\n"+"TotalRevenue--"+str(TotalRevenue))

list_COGS=dict_final.get('COGS')
pre_COGS=preprocessing(list_COGS)
COGS=list(map(float,pre_COGS))
op.writelines("\n"+"COGS--"+str(COGS))


if dict_final.get('GrossProfit') == None:
  GrossProfit = [i-j for i, j in zip(map(float,TotalRevenue), map(float,COGS))]
  op.writelines("\n"+"GrossProfit--"+str(GrossProfit))

else:
  list_GrossProfit=dict_final.get('GrossProfit')
  pre_GrossProfit=preprocessing(list_GrossProfit)
  GrossProfit=list(map(float,pre_GrossProfit))
  op.writelines("\n"+"GrossProfit--"+str(GrossProfit))

list_EBIT=dict_final.get('EBIT')
pre_EBIT=preprocessing(list_EBIT)
EBIT=list(map(float,pre_EBIT))
op.writelines("\n"+"EBIT--"+str(EBIT))

SGA = [i-j for i, j in zip(map(float,GrossProfit), map(float,EBIT))]
op.writelines("\n"+"SGA--"+str(SGA))

list_EBT=dict_final.get('EBT')
pre_EBT=preprocessing(list_EBT)
EBT=list(map(float,pre_EBT))
op.writelines("\n"+"EBT--"+str(EBT))

netInterest = [i-j for i, j in zip(map(float,EBIT), map(float,EBT))]
op.writelines("\n"+"netInterest--"+str(netInterest))

list_Taxes=dict_final.get('Taxes')
pre_Taxes=preprocessing(list_Taxes)
Taxes=list(map(float,pre_Taxes))
op.writelines("\n"+"Taxes--"+str(Taxes))

list_netIncome=dict_final.get('NetIncome')
pre_netIncome=preprocessing(list_netIncome)
netIncome=list(map(float,pre_netIncome))
op.writelines("\n"+"netIncome--"+str(netIncome))

list_DandA=dict_final.get('DandA')
pre_DandA=preprocessing(list_DandA)
DandA=list(map(float,pre_DandA))
op.writelines("\n"+"DandA--"+str(DandA))

years=[]
for i in range(0,key_count):
  display_name = output_obj.payload[i].display_name
  if display_name == 'Company':
    Company=output_obj.payload[i].text_extraction.text_segment.content
  elif display_name == 'Year1'or display_name == 'Year2'or display_name == 'Year3':
    year=output_obj.payload[i].text_extraction.text_segment.content
    years.append(year)
op.writelines("\n"+"Company--"+Company)
op.writelines("\n"+"years--"+str(years))
