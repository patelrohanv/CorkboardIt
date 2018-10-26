# Postgressql Testing w/ Docker

## Requirements
1. Docker
2. docker-compose


## Flask Server Up and Running
### Commands
Simply enter the following
`docker-compose up`

### Endpoint
Endpoint is  `0.0.0.0:5001`

Swagger documentation is the default - you will be able to see how to call them. I recommend using postman as well to visualise the requests.

### Troubleshooting
***IMPORTANT*** Any changes to the code will require the command: `docker-compose build` in the python server or docker containers

## Simple psql shell access
### Commands
Unfortunately you will have to run this twice because I don't know how to run containers in order via one liner

This will spin up the containers for psql with mock data

```
docker-compose run shell psql -h postgresdb1 -U postgres
docker-compose run shell psql -h postgresdb1 -U postgres
```

#### Test database
**Don't forget the semicolon at the end~**
```
SELECT * FROM CorkBoard;
```

#### Reset everything
```
// Quit the psql
\q
// Quit the container bash
ctrl + c
// Kill containers
docker-compose down
```

