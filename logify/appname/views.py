from django.shortcuts import render


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
import re

log_pattern = re.compile(r'(?P<date>\d{4}-\d{2}-\d{2}) (?P<timestamp>\d{2}:\d{2}:\d{2}\.\d{3}) (?P<process_id>\d+) (?P<type>[A-Z]+) (?P<component>[^\s]+) \[.*\] (?P<message>.+)')

@csrf_exempt
def upload_file(request):
    if request.method == 'POST' and request.FILES['file']:
        uploaded_file = request.FILES['file']

        # Convert text file to CSV
        logs = []
        for line in uploaded_file:
            match = log_pattern.match(line.decode('utf-8'))
            if match:
                logs.append(match.groupdict())

        df = pd.DataFrame(logs)

        # Save the DataFrame to a CSV file
        csv_file_path = 'media/uploaded_file.csv'
        df.to_csv(csv_file_path, index=False)

        return JsonResponse({'status': 'success', 'csv_file_path': csv_file_path})

    return JsonResponse({'status': 'error', 'message': 'Invalid request'})


