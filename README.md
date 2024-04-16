# Coop API Gateway
This is a simple backend that manages the store information. One perform basic CRUD operation. This application uses [express.js](https://expressjs.com/), typeorm and postgres.

## Getting Started

### Install the dependencies
```bash
npm install
```

### Running development server
Start database server
```bash
npm run docker:db:up
```

Start development server
```bash
npm run dev
```

Server will be listening on [http://localhost:6000](http://localhost:6000) unless you change with env variable.

### Build
```bash
npm run build
```

### Running tests
End to End
Use [hurl](https://hurl.dev/) to perform end to end testing
```bash
npm run e2e:tests:with-debug
npm run e2e:tests:silent
```

## Stopping Database Server
```bash
npm run docker:db:down
```
