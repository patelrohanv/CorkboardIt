# Postgressql Testing w/ Docker

## Requirements
1. Docker
2. docker-compose

## Commands
Unfortunately you will have to run this twice because I don't know how to run containers in order via one liner

This will spin up the containers for psql with mock data

```
docker-compose run shell psql -h postgresdb1 -U postgres
docker-compose run shell psql -h postgresdb1 -U postgres
```

### Test database
**Don't forget the semicolon at the end~**
```
SELECT * FROM CorkBoard;
```

