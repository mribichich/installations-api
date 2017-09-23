# installations-api
Api to save installations

## Requerimientos

nodejs 8.x
yarn

### Start a mongo instance

```bash
$ docker run --name mongo -d -p 27017:27017 mongo
```

## Usage

### Install dependencies


```bash
$ yarn
```

### Development

```bash
$ yarn start:watch
$ yarn test:watch
```

### Production

```bash
$ NODE_ENV=production yarn build
$ NODE_ENV=production yarn start
```

## Configuration

### Environment Variables

| key | format |
| ----- | ----- |
| PORT | number |
| MONGO_URL | string |
| MONGO_DB | string |
