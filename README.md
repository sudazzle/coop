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

Server will be listening on [http://localhost:8080](http://localhost:8080) unless you change with env variable.

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

### Available endpoints
#### Open
```bash
GET /health // for health check
GET /api/v1/stores // get all stores
GET /api/v1/stores?page=1&itemsPerPage=100 // paginated pages
POST /api/v1/stores // create store
PATCH /api/v1/stores/:id // patch store
DELETE /api/v1/stores/:id // remove
```

#### Require authentication
Its the same endpoints just behind the doors
```bash
GET /api/v1/admin/stores // get all stores
GET /api/v1/admin/stores?page=1&itemsPerPage=100 // paginated pages
POST /api/v1/admin/stores // create store
PATCH /api/v1/admin/stores/:id // patch store
DELETE /api/v1/admin/stores/:id // remove
```

## Stopping Database Server
```bash
npm run docker:db:down
```
