# Postgressql Testing w/ Docker

## Requirements
1. Docker

## Commands
```
docker run --name my-postgres -e POSTGRES_PASSWORD=password -d postgres

// On password entry, enter 'password'
docker run -it --rm --link my-postgres:postgres postgres psql -h postgres -U postgres
```

