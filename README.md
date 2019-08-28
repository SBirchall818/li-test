# li-test

Overview
---

Prerequisites
---
Postgres database available on local dev environment with the following credentials
DATABASE: landinsight
DATABASE_USER postgres
DATABASE_PASSWORD postgres

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
DROP TABLE epcs
```

Assumptions
---
The external API method can only take a single `ADDRESS` per call but it can respond to an infinte amount of such calls in parallel.

Fully Automated Design
---

- Further tools / resources to use?
- How would I scale the import?
- How often to run the import?
- How to know if the import has failed

Notes
---

- Pass in absolute project directory
- Certificates unzipped into data directory