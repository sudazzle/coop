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

### Formatting
It uses [Biome](https://biomejs.dev/) for linting and formatting
```bash
npm run format:check // only checks for issues
npm run format:fix // only formats safely
npm run format:fix:unsafe // also tries to make changes to suggested improvements
```

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
