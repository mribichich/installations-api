import app from './app';
import db from './db';

const mongoHost = process.env.MONGO_HOST || '0.0.0.0';
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoUrl = `mongodb://${mongoHost}:${mongoPort}`;
const dbName = process.env.MONGO_DB || 'installations-api';
const dbUrl = `${mongoUrl}/${dbName}`;
const port = process.env.PORT || 5010;

(async () => {
  app(port);

  await db(dbUrl);
})();
