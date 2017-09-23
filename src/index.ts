import app from './app';
import db from './db';

const dbUrl = process.env.MONGO_URL
  ? `${process.env.MONGO_URL}/${process.env.MONGO_DB}`
  : 'mongodb://localhost:27017/installations-api';
const port = process.env.PORT || 5010;

(async () => {
  app(port);

  await db(dbUrl);
})();
