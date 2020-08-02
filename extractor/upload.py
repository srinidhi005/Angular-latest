import sys
from google.cloud import storage


def upload_blob(bucket_name, source_file_name, destination_blob_name):

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)
    print("File {} uploaded to {}.".format(source_file_name, destination_blob_name))
    return "File {} uploaded to {}.".format(source_file_name, destination_blob_name)
   
if __name__== "__main__":
    file_path = sys.argv[1]
    destination_path=sys.argv[2]
    upload_blob('sample_pdf', file_path, destination_path)
