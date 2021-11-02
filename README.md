# JobSeekingAPI
## open terminal
## dir src->
## npm install
## npm start or node server.js

## API testing:

### get all applicant info:
#### GET:http://localhost:5001/Applicants

### get applicant by id:
#### GET:http://localhost:5001/Applicants/id_number

### add new applicant:
#### POST: http://localhost:5001/Applicants
data body format:
{
	"FirstName":"jj",
	"LastName":"he",
	"Email":"kdlasbang@mgial.com",
	"Phone":7326404497,
	"Birth":239021,
	"Address":"xxx"
}

### delete all applicants
#### DELETE: http://localhost:5001/Applicants

### delete applicatns by id
#### DELETE: http://localhost:5001/Applicants/id_number
