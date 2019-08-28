# li-test

Overview
---
This program will iterate over directories 1-deep in the *data/* folder and work through each *certificates.csv* file entering `LMK_KEY`, `LODGEMENT_DATE`, `TRANSACTION_TYPE`, `TOTAL_FLOOR_AREA`, `ADDRESS` and `POSTCODE` columns into a local postgres database. If there is a previous record for the EPC entry it will be updated. The API method is called `fetchLatLong` and has been faked.

Prerequisites
---
Postgres database available on local dev environment with the following credentials
- DATABASE: landinsight
- DATABASE_USER: postgres
- DATABASE_PASSWORD postgres

Instructions
---
**Install node libraries**
```
npm i
```

**Run**
```
npm start
```

**Test**
```
npm test
```

**Reset Database in Postgres**
```
DROP TABLE epcs;
```

Assumptions
---
- The external API method can only take a single `ADDRESS` per call but it can respond to an infinte amount of such calls in parallel.
- There is an external ELK stack that the **logger** can log out to and that this does not affect the performance of the processing
- Assume there is a container orchestrator (kubernetes) that can spin up the program in a container. The container will follow the process to download and extract the zip file into the *data/* directory. If the process completes for all files the container can terminate, if there is an error however the container should stay alive so the problem can be inspected.

Fully Automated Design
---

- Further tools / resources to use?
Container orchestration and a bot tool
- How would I scale the import?
Could assign different files across multiple containers
- How often to run the import?
Daily (unless there's a predefined publication date) and then run a checksum to see if the import needs to be run fully
- How to know if the import has failed
It can log out to the centralized logger and send an alert to a developer. The failed container can be kept alive and inspected to find the root of error


Performance
---
- Use a large integer format for the epc database model. Ensure it is indexed
- Check if the Epc model has changed since the last time before making a DB update call to update to the same info. Use a no-op
- Instead of making many parallel calls to create or update batch them together into 1 create call and 1 update call to the DB
- The maximum open TCP connections that can run simulataneously are determined by the host system. On mac this is typically 256, linux 1024 and the VS Code terminal emulator cites 10240. It may be that we have to subtract a safety number from the value given by `ulimit -n` in order to find the most performant chunk size.

Future Notes
---

- Have more code coverage
- More defensive programming around user inputs
- More resiliancy to change in the CSV file format - maybe a pre-flight check on each file to see if the data is still in the correct format.
- Check the file at the path is present before attempting to open stream

Automating fetching the zip
---
Perhaps use a headless browser or other browser bot automation tool with the following endpoints

GET https://epc.opendatacommunities.org/login

Get the token from element
<input id="__anti-forgery-token" name="__anti-forgery-token" type="hidden" value="5eZ9nIqP/Kl7+iY7/ynwY8Sc4FECyYaVf4w01qoKh1b2LpPY14lPbcMrfBQi0qZEg7CAlnID/3ja/cSR" />


POST https://epc.opendatacommunities.org/login
params
__anti-forgery-token: 5eZ9nIqP/Kl7+iY7/ynwY8Sc4FECyYaVf4w01qoKh1b2LpPY14lPbcMrfBQi0qZEg7CAlnID/3ja/cSR
email: name@email.com

Use a subdomain email that get's sent to an S3 bucket
click here to sign in (from email element)
https://epc.opendatacommunities.org/login-with-token?token=8d2f2ec5c1d5e70e3e842d5b4b4de1850cedbb08&email=name%40email.com

GET https://epc.opendatacommunities.org/login-with-token?token=8d2f2ec5c1d5e70e3e842d5b4b4de1850cedbb08&email=name%40email.com


Send Ring session cookie with
https://epc.opendatacommunities.org/files/all-domestic-certificates.zip

https://mhclg-epcs-precanned-2019-july.s3.amazonaws.com/all-domestic-certificates.zip?AWSAccessKeyId=AKIAJPR5AXDNTVEMUQ5A&Expires=1567079636&Signature=FSP6Apn0FWZh1zxV%2BUlnHFiVujk%3D