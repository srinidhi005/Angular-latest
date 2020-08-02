import sys
import json
import mysql.connector
from google.api_core.client_options import ClientOptions
from google.cloud import automl_v1
from google.cloud.automl_v1.proto import service_pb2
import re
import collections
import datetime
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
  company_name = sys.argv[3]
  period = sys.argv[4]
  user = sys.argv[5]
  industry = sys.argv[6]
  statement_type = sys.argv[7]
  filename = sys.argv[8]
output_obj = get_prediction(file_path, model_name)
term_dict={}
total_revenue_patterns = ["Total revenue","Net revenue","Net Revenue","Net Revenues","Total net sales","Revenues","Total revenues","NET OPERATING REVENUES","Total Net Revenue","Total Revenue","Total Revenues",
                 "Revenue","Sales to customer","Net Sale","Net Sales","NET SALES","Net sales",
                 "Total net revenues.*"]  
depriciation_amort=[   "Depreciation and amortization",
        "Depreciation and amortization of property, equipment and intangibles",
        "Depreciation, amortization, and other",
        "Depreciation and amortization expense",
"Depreciation and amortization expenses",
        "Depreciation expense",
        "Depreciation",
        ]
key_count=len(output_obj.payload)
print(output_obj.payload)
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
res_str=file.read()
res=res_str.split("Row:")
Company='NA'
op= open("/home/srinidhi/angular/extractor/automl_logger.txt", "w")
years=[]
for i in range(0,key_count):
  display_name = output_obj.payload[i].display_name
  if display_name == "Company":
    Company=output_obj.payload[i].text_extraction.text_segment.content
    op.writelines("\n"+"Company--"+Company)
  if display_name == 'Year1'or display_name == 'Year2'or display_name == 'Year3':
    year=output_obj.payload[i].text_extraction.text_segment.content
    if year.startswith('20'):
      years.append(year)
      years=years[:3]
      years.sort(reverse = True)

if not years:
  for line in res:
    years=re.findall("201[0-9]+|202[0-9]+",line)
    if years:
      break
op.writelines("\n"+"years--"+str(years))
for line in res:
  for i in total_revenue_patterns:
    if i in line:
      line=line.replace(',', '')
      line=line.replace('$','')
      dict_final['TotalRevenue']=(re.findall("\S[0-9]\S{0,10}", line))
      TotalRevenue=(re.findall("\S[0-9]\S{0,10}", line))
      break
  for key in term_dict.keys():
    if term_dict[key][0] in line:
      try:
        line=line.replace(',', '')
        line=line.replace('$','')
        dict_final[key]=(re.findall("\S[0-9]\S{0,10}", line))
        term_dict.pop(key, None)
      except:
        print("exception")
      break
  for i in depriciation_amort:
    if i in line:
      line=line.replace(',', '')
      line=line.replace('$','')
      dict_final['DandA']=(re.findall("\S[0-9]\S{0,10}", line))
      DandA=(re.findall("\S[0-9]\S{0,10}", line))
      break
years=dict_final.get('Year3')
print("final",years)
def preprocessing(term_list):
  new_list=[]
  if not term_list or term_list is None:
    print(years)
    for i in years:
      new_list.append(0)
    term_list=new_list
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

#list_year=[]
#list_year1=dict_final.get('Year1')
#list_year2=dict_final.get('Year2')
#list_year.append(list_year1)
#list_year.extend(list_year2)
#list_year.extend(list_year3)
#print("final_years",list_year)
#print("lis2",list_year2)
##print("list_year1",list_year1)
#print("l3",list_year3)
list_TR=dict_final.get('TotalRevenue')
pre_TR=preprocessing(list_TR)
TotalRevenue=list(map(float,pre_TR))
op.writelines("\n"+"TotalRevenue--"+str(TotalRevenue))

list_COGS=dict_final.get('COGS')
pre_COGS=preprocessing(list_COGS)
COGS=list(map(float,pre_COGS))
op.writelines("\n"+"COGS--"+str(COGS))

list_GrossProfit=dict_final.get('GrossProfit')
pre_GrossProfit=preprocessing(list_GrossProfit)
GrossProfit=list(map(float,pre_GrossProfit))
if not any(GrossProfit):
  GrossProfit = [i-j for i, j in zip(map(float,TotalRevenue), map(float,COGS))]
op.writelines("\n"+"GrossProfit--"+str(GrossProfit))

list_EBIT=dict_final.get('EBIT')
pre_EBIT=preprocessing(list_EBIT)
EBIT=list(map(float,pre_EBIT))
if list_EBIT is not None:
  SGA = [i-j for i, j in zip(map(float,GrossProfit), map(float,EBIT))]


if list_EBIT is None:
  list_SGA=dict_final.get('SGA')
  pre_SGA=preprocessing(list_SGA)
  SGA=list(map(float,pre_SGA))
  op.writelines("\n"+"SGA--"+str(SGA))
  EBIT=[i-j for i, j in zip(map(float,GrossProfit), map(float,SGA))]
op.writelines("\n"+"EBIT--"+str(EBIT))

if list_EBIT is not None:
  SGA = [i-j for i, j in zip(map(float,GrossProfit), map(float,EBIT))]
  op.writelines("\n"+"SGA--"+str(SGA))

list_DandA=dict_final.get('DandA')
pre_DandA=preprocessing(list_DandA)
DandA=list(map(float,pre_DandA))
op.writelines("\n"+"DandA--"+str(DandA))

list_EBT=dict_final.get('EBT')
pre_EBT=preprocessing(list_EBT)
EBT=list(map(float,pre_EBT))

if list_EBT is None:
  list_netInterest=dict_final.get('InterestExpense')
  pre_netInterest=preprocessing(list_netInterest)
  netInterest=list(map(float,pre_netInterest))
  EBT=[i-j for i, j in zip(map(float,EBIT), map(float,netInterest))]
else:
  netInterest = [i-j for i, j in zip(map(float,EBIT), map(float,EBT))]
op.writelines("\n"+"netInterest--"+str(netInterest))

list_netIncome=dict_final.get('NetIncome')
pre_netIncome=preprocessing(list_netIncome)
netIncome=list(map(float,pre_netIncome))

list_Taxes=dict_final.get('Taxes')
pre_Taxes=preprocessing(list_Taxes)
Taxes=list(map(float,pre_Taxes))

if list_Taxes is None:
  Taxes=[i-j for i, j in zip(map(float,EBT), map(float,netIncome))]
op.writelines("\n"+"Taxes--"+str(Taxes))

if list_netIncome is None:
  netIncome=[i-j for i, j in zip(map(float,EBT), map(float,Taxes))]
op.writelines("\n"+"netIncome--"+str(netIncome))

otherIncome=[]
for i in range(len(years)):
  otherIncome.append('0')
EBT=EBT[:3]
op.writelines("\n"+"EBT--"+str(EBT))
created_on = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
try:
  connection = mysql.connector.connect(host="35.225.71.54",
                                          database='finance',
                                          user='investor',
                                          password='investor')
  if connection.is_connected():
    db_Info = connection.get_server_info()
    print("Connected to MySQL Server version ", db_Info)
    cursor = connection.cursor()

  projections = 4  # hardcodedd
  print(Company)
  query = "insert into company_master (companyname,company,period,actuals,projections,createdby,createdon,filename,industry,statementtype)" \
          "values ('" + company_name + "','" + Company + "','" + period + "'," + str(len(years)) + "," + str(projections) + ",'" + user + "','" + created_on + "','" + filename + "','" + industry + "','" + statement_type + "')"

  cursor.execute(query)
  connection.commit()
  latest = 0
  for i in range(len(years)):
    ebitda = EBIT[i] + DandA[i]
    if all(v == 0 for v in TotalRevenue):
      grossprofitmargin=0
      ebitmargin=0
      ebitdamargin=0
      ebtmargin=0
      netincomemargin=0
    else:
      grossprofitmargin = float((GrossProfit[i] / TotalRevenue[i]) * 100)      
      ebitmargin = float((EBIT[i] / TotalRevenue[i]) * 100)
      ebitdamargin = float((ebitda/ TotalRevenue[i]) * 100)
      print("ebitdamargin",ebitdamargin)
      ebtmargin = float((EBT[i] / TotalRevenue[i]) * 100)
      print("ebtmargin",ebtmargin)
      netincomemargin = float((netIncome[i] /TotalRevenue[i]) * 100)
      if len(years) + latest>1:
        print(len(years))
        print(years)
        revenuepercent=0
        cogspercent=0
        sgapercent=0
        dapercent=0
        try:
          revenuepercent = ((TotalRevenue[i]-TotalRevenue[i+1])/TotalRevenue[i+1])*100
          #revenuepercent=[0,0,0]
          print("revenuepercent",revenuepercent)
          cogspercent = (COGS[i]/TotalRevenue[i])*100
          print("cogspercent",cogspercent)
          sgapercent = (SGA[i]/TotalRevenue[i])*100
          print("sgapercent",sgapercent)
          dapercent = (DandA[i]/TotalRevenue[i])*100
          print("dapercent",dapercent)
        except:
          print("excpetion in Total Revenue Percenet")

    query = "insert into company_actuals (companyname,asof,latest,totalrevenue,cogs,sga,da,netinterest,otherincome," \
            "taxes,grossprofit,ebit,ebitda,netincome,grossprofitmargin,ebitmargin,ebitdamargin,ebtmargin,netincomemargin,ebt,revenuepercent,cogspercent,sgapercent,dapercent) values(" \
            "'" + company_name + "'," +str(years[i]) + "," + str(
                latest) + "," + str(TotalRevenue[i]) + "," + str(COGS[i]) + "," + str(SGA[i]) + "," + str(
                DandA[i]) + "," + str(netInterest[i]) + "," + str(otherIncome[i]) + "," + str(abs(Taxes[i])) + "," + str(
                GrossProfit[i]) + "," + str(EBIT[i]) + "," + str(ebitda) + "," + str(netIncome[i]) + "," + str(
                grossprofitmargin) + "," + str(ebitmargin) + "," + str(ebitdamargin) + "," + str(
                ebtmargin) + "," + str(netincomemargin) + "," + str(EBT[i]) + "," + str(revenuepercent) + "," + str(cogspercent) + "," + str(sgapercent) + "," + str(dapercent) +")"  
    cursor.execute(query)
    connection.commit()  # save records
    latest -= 1
except Exception as e:
  print("Error reading data from MySQL table", e)
  op.writelines(str(created_on)+"\n\n")
  op.writelines(str(e))
  op.writelines("\n\n")
