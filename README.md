# crypto-order-router

## Requirements
- Node.js and npm
- Docker and docker compose 

## How to use locally
1) Create a .env file to define variables

```
PORT=3000
BINANCE_API_KEY="your_binance_api_key"
BINANCE_SECRET_KEY="your_binance_secret_key"
POSTGRES_PASSWORD="password"
POSTGRES_USER="user"
POSTGRES_DB="db"
DB_PORT="127.0.0.1:5543"
```

2) Install dependencies 
```
$ npm i
```

3) Initialize database with docker compose
```
$ docker compose up
```

4) Run migrations and start application
```
$ npm run start-dev
```