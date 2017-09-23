import { MongoClient, Db } from 'mongodb';

let mongoDb: Db;

const reconnect = (url: string, timeout: number, cb: (db: Db) => void) => {
  setTimeout(async () => {
    try {
      console.log('connecting to mongodb...');

      const db = await MongoClient.connect(url);

      console.log('connected to mongodb');

      cb(db);
    } catch (e) {
      console.error(e);

      reconnect(url, timeout * 2, cb);
    }
  }, timeout);
};

export default (url: string) => {
  return new Promise(resolve => {
    reconnect(url, 200, db => {
      mongoDb = db;
      resolve(db);
    });
  });
};

export const close = () => {
  mongoDb.close();
};

export const getDb = () => {
  return mongoDb;
};
