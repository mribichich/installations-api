import app from './app';
import db from './db';

const mongoUrl = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';
const dbName = process.env.MONGO_DB || 'installations-api';
const dbUrl = `${mongoUrl}/${dbName}`;
const port = process.env.PORT || 5010;

(async () => {
  app(port);

  await db(dbUrl);
})();
