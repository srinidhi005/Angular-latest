import sys
from google.cloud import vision_v1
from google.cloud.vision_v1 import enums
import io
import json
from google.cloud import storage
import os


def sample_batch_annotate_files(storage_uri):
    # os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\user\Desktop\doc_ai\rmi-insights-3e257c9c456c.json"

    """Perform batch file annotation."""
    mime_type = "application/pdf"

    client = vision_v1.ImageAnnotatorClient()

    gcs_source = {"uri": storage_uri}
    input_config = {"gcs_source": gcs_source, "mime_type": mime_type}
    features = [{"type": enums.Feature.Type.DOCUMENT_TEXT_DETECTION}]

    # The service can process up to 5 pages per document file.
    # Here we specify the first, second, and last page of the document to be
    # processed.
    pages = [1, 2, 3]
    requests = [{"input_config": input_config, "features": features, "pages": pages}]
    response = client.batch_annotate_files(requests)


    #Accessing Internal memory 1
    f = open("/home/srinidhi/angular/uploads/visionoutput.txt","w+")
    for image_response in response.responses[0].responses:
        f.write(image_response.full_text_annotation.text)
    f.close()


    #Reading it line by line
    f1 = open("/home/srinidhi/angular/uploads/visionoutput.txt","r")
    list_output = []
    line = f1.readlines() 
    line = [x.rstrip('\\n').rstrip() for x in line]
    print(line)
    
    #Storing in a dictionary
    dict_output ={}
    dict_output['data'] = line


    #Uploading file to  bucket
    #Filename is the name you want to store in bucket
    storage_client = storage.Client()
    bucket = storage_client.get_bucket('sample_pdf')
    filename ="visionoutput.json"
    blob = bucket.blob(filename)
    #Removing Internal memory     
    # os.remove("visionoutput.txt")
    # os.remove("visionoutput.json")
if __name__ == '__main__':
    file_path = sys.argv[1]
    sample_batch_annotate_files(file_path)