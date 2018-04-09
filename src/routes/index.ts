import * as express from 'express';
import { Db } from 'mongodb';

import { getDb } from '../db';

import installations from './installations';
import clients from './clients';

export interface Request extends express.Request {
  db: Db;
}

const router = express.Router();

router.use((req: Request, res, next) => {
  const db = getDb();
  req.db = db;
  next();
});

// router.get('/', (req, res) => {
//   res.sendStatus(200);
// });

router.use('/installations', installations);
router.use('/clients', clients);

export default router;
