# In Good Hands

## Environment variables

### Docker
```
JWT_SECRET=secret
PORT=3000
POSTGRES_PASSWORD=secret
```

### Client
```
API_URL=http://server
```

### Server
```
DATABASE_URL=postgresql://postgres:password@in_good_hands_db:5432/postgres?schema=public
JWT_SECRET=secret
```

## Run

### Production
```sh
yarn prod
```

### Development
```sh
yarn dev
```

### Test

Test server

```sh
yarn test
```

### Types generation

Generate types for Strapi

```sh
yarn typegen
```
