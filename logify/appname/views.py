from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import pandas as pd
import re
import boto3
from botocore.exceptions import NoCredentialsError
from elasticsearch import Elasticsearch, RequestsHttpConnection, helpers
from requests_aws4auth import AWS4Auth
import csv
from io import StringIO
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import numpy as np




# Set your AWS credentials and S3 details
AWS_ACCESS_KEY_ID = 'AKIAZQ3DRH5NBLPVG4A4'
AWS_SECRET_ACCESS_KEY = 'fhiJWEq4NpIIzWUVGe1a6tIBUbWNo4IuJ0w1XvQq'
AWS_REGION = 'ap-southeast-2'
AWS_S3_BUCKET_NAME = 'oslogfiles1'
S3_KEY = 'uploaded_file.csv'

es_host = 'my-deployment-da4b4a.es.us-east-2.aws.elastic-cloud.com'  # Without https:// and the trailing slash, e.g., my-deployment.es.amazonaws.com
index_name = 'poplol'  # Example index name
es_username = 'elastic'
es_password = 'vg1vgEgNLdfKYmENLHR2gSjs'

s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY, region_name=AWS_REGION)

awsauth = AWS4Auth(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, 'es', session_token=None)
es = Elasticsearch(
    hosts=[{'host': es_host, 'port': 443}],
    http_auth=(es_username, es_password),
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection
)




log_pattern = re.compile(r'(?P<date>\d{4}-\d{2}-\d{2}) (?P<timestamp>\d{2}:\d{2}:\d{2}\.\d{3}) (?P<process_id>\d+) (?P<type>[A-Z]+) (?P<component>[^\s]+) \[.*\] (?P<message>.+)')


@csrf_exempt
def upload_file(request):
    try:
        if request.method == 'POST' and 'file' in request.FILES:
            uploaded_file = request.FILES['file']

            # Convert text file to CSV
            logs = []
            for line in uploaded_file:
                match = log_pattern.match(line.decode('utf-8'))
                if match:
                    logs.append(match.groupdict())

            df = pd.DataFrame(logs)

            df['IP_Address'] = df['message'].str.extract(r'(\d+\.\d+\.\d+\.\d+)')
            df['HTTP_Status'] = df['message'].str.extract(r'status: (\d+)')
            

            label_mapping = {
                # Compute (Nova)
                'nova.osapi_compute.wsgi.server': 'Compute',
                'nova.compute.api': 'Compute',
                'nova.scheduler': 'Compute',
                'nova.conductor': 'Compute',
                'nova.compute.manager': 'Compute',

                # Storage (Cinder for Block Storage, Swift for Object Storage)
                'cinder.api.openstack.wsgi': 'Storage',
                'cinder.volume.api': 'Storage',
                'cinder.scheduler': 'Storage',
                'cinder.volume.manager': 'Storage',
                'cinder.backup.api': 'Storage',
                'swift.object': 'Storage',
                'swift.container': 'Storage',
                'swift.account': 'Storage',

                # Networking (Neutron)
                'neutron.api.v2.router': 'Networking',
                'neutron.plugins.ml2': 'Networking',
                'neutron.dhcp.agent': 'Networking',
                'neutron.l3.agent': 'Networking',
                'neutron.agent.securitygroups_implementation': 'Networking',

                # Identity (Keystone)
                'keystone.endpoint': 'Identity',
                'keystone.assignment': 'Identity',
                'keystone.auth.plugins.password': 'Identity',
                'keystone.catalog': 'Identity',
                'keystone.identity': 'Identity',

                # General or common components not specific to a class
                'oslo_concurrency.lockutils': None,
            }
            
            def refine_classification(row):
                
                label = label_mapping.get(row['component'], None)
                
                if label is None:
                    message = row['message'].lower()  # Convert message to lowercase to ensure consistent matching
                    if 'cinder' in message:
                       label = 'Storage'
                    elif 'nova' in message:
                       label = 'Compute'
                    elif 'neutron' in message:
                       label = 'Networking'
                    else:
                       label = 'Compute'  # Default to Compute if no specific keyword is found

                return label

                

            df['label'] = df['component'].map(label_mapping)
            df['label'] = df.apply(refine_classification, axis=1)
    

            



            new_csv_file_path = 'enhanced_uploaded_file.csv'



            # Save the DataFrame to a CSV file
            csv_file_path = 'uploaded_file.csv'
            df.to_csv(new_csv_file_path, index=False)

            # Upload the CSV file to S3
            upload_to_s3(new_csv_file_path, AWS_S3_BUCKET_NAME, 'enhanced_uploaded_file.csv')

            es.indices.delete(index=index_name)
            es.indices.create(index=index_name, body={
              "settings": {
                "number_of_shards": 1,
                "number_of_replicas": 1
              },
              "mappings": {
                "properties": {
                  "date": {
                    "type": "date",
                    "format": "yyyy-MM-dd"
                  },
                  "timestamp": {
                    "type": "date",
                    "format": "HH:mm:ss.SSS"
                  },
                  "process_id": {
                    "type": "integer"
                  },
                  "type": {
                    "type": "keyword"
                  },
                  "component": {
                    "type": "keyword"
                  },
                  "message": {
                    "type": "text"
                  }
                }
              }
            })



            csv_data = fetch_and_parse_csv_from_s3(AWS_S3_BUCKET_NAME, 'enhanced_uploaded_file.csv')
            index_data_to_es(csv_data, index_name)

            


            return JsonResponse({'status': 'success', 's3_file_path': f'https://{AWS_S3_BUCKET_NAME}.s3.amazonaws.com/uploaded_file.csv'})

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

    return JsonResponse({'status': 'error', 'message': 'Invalid request'})




def upload_to_s3(local_file_path, bucket, s3_file_path):
    s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

    try:
        s3.upload_file(local_file_path, bucket, s3_file_path)
    except FileNotFoundError:
        raise FileNotFoundError(f"The file {local_file_path} was not found.")
    except NoCredentialsError:
        raise Exception("Credentials not available")

    return True

def fetch_and_parse_csv_from_s3(bucket, key):
    response = s3.get_object(Bucket=bucket, Key=key)
    lines = response['Body'].read().decode('utf-8')
    csv_data = csv.DictReader(StringIO(lines))
    return list(csv_data)  # Convert to list to iterate over it multiple times if needed

# Function to index data into Elasticsearch
def index_data_to_es(data, index_name):
    actions = [
        {
            "_index": index_name,
            "_source": row,
        }
        for row in data
    ]
    helpers.bulk(es, actions)




