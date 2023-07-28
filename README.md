**CSV Data Fetcher and Scheduler**

This Node.js application fetches data from an API, converts it into a different format (DTO - Data Transfer Object), and stores it in CSV files. It also includes a scheduler to perform periodic data extraction and a cleanup task to manage the CSV files over time.

**Requirements**
Node.js (version 12 or higher)

**Installation**
Clone this repository to your local machine.
Navigate to the project directory.
Install the dependencies using the following command:
`npm install`

**Usage**

1. To fetch data from the API, convert it into the desired format, and store it as a CSV file.

2. The application includes a scheduler that fetches data from the API every 5 minutes. The scheduler is set to extract data using the fetchDataFromAPI function.

3. The application also includes a cleanup task that runs daily at 3 AM to remove old CSV files from the "PostCSV" folder.


**Note**
Adjust the cron schedules (cron.schedule) for data extraction and cleanup according to your requirements.
