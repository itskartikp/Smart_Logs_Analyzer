from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import pandas as pd
import re
import boto3
from botocore.exceptions import NoCredentialsError



# Set your AWS credentials and S3 details
AWS_ACCESS_KEY_ID = 'AKIAZQ3DRH5NBLPVG4A4'
AWS_SECRET_ACCESS_KEY = 'fhiJWEq4NpIIzWUVGe1a6tIBUbWNo4IuJ0w1XvQq'
AWS_REGION = 'ap-southeast-2'
AWS_S3_BUCKET_NAME = 'oslogfiles1'

s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY, region_name=AWS_REGION)


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

            # Save the DataFrame to a CSV file
            csv_file_path = 'uploaded_file.csv'
            df.to_csv(csv_file_path, index=False)

            # Upload the CSV file to S3
            upload_to_s3(csv_file_path, AWS_S3_BUCKET_NAME, 'uploaded_file.csv')

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



