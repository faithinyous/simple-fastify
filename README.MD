# Full backend docker + typeorm + postgres + rediscache

## Requirements
Please install https://github.com/faithinyous/full-backend-sample

```bash
# in full-backend-sample repository
docker compose build
docker compose up pg_master pg_slave redis -d

# create database following  https://github.com/faithinyous/full-backend-sample/blob/master/README.md#prepare-sample-data
```

## Usage

```bash
yarn dev
```


## Test

```bash
curl http://localhost:5001/user
```
