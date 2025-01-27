import time
from datetime import datetime
import random
import requests

while True:
    print(f"Service1: Current time is {datetime.now()}", flush=True)

    # URL of the file you want to download
    url = 'http://image-storage-service:3000/img.jpeg'  # Replace with your file URL

    # Send a GET request to fetch the file
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Define the file path where you want to save the file
        file_path = 'my_custom_image.png'
        
        # Open the file in write-binary mode and save the content
        with open(file_path, 'wb') as file:
            file.write(response.content)
        
        print(f"File downloaded successfully and saved as {file_path}")
    else:
        print(f"Failed to download file. HTTP Status Code: {response.status_code}")

    
    time.sleep(random.uniform(1, 5))
    