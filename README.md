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

| key | format | default |
| ----- | ----- | ----- |
| PORT | number | 5010 |
| MONGO_URL | string | mongodb://0.0.0.0:27017 |
| MONGO_DB | string | installations-api |
