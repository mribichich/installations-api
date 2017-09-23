import * as express from 'express';
import * as uuid from 'uuid/v4';
import { Collection } from 'mongodb';

import { getDb } from '../db';

interface Request extends express.Request {
  collection: Collection<Installation>;
}

interface Installation {
  _id: uuid;
  timestamp: Date;
  clientId: uuid;
  application: string;
  version: string;
}

const INSTALLATIONS = 'installations';
const router = express.Router();
// const db = getDb();

router.use((req: Request, res, next) => {
  const db = getDb();
  req.collection = db.collection('INSTALLATIONS');
  next();
});

router.get('/', async (req: Request, res) => {
  const installations = await req.collection.find().toArray();

  res.json(installations);
});

router.post('/', async (req: Request, res) => {
  const { body } = req;

  const installation: Installation = {
    _id: uuid(),
    timestamp: body.timestamp || new Date(),
    clientId: body.clientId,
    application: body.application,
    version: body.version
  };

  await req.collection.insertOne(installation);

  res.json({ id: installation._id });
});

router.delete('/', async (req: Request, res) => {
  const { id } = req.query;

  await req.collection.deleteOne({ _id: id });

  res.sendStatus(200);
});

export default router;
