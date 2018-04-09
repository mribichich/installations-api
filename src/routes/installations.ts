import * as express from 'express';
import * as uuid from 'uuid/v4';
import { Collection } from 'mongodb';

import { getDb } from '../db';
import { Request as BaseRequest } from './index';
import * as clientsService from '../services/clients';
import * as installationsService from '../services/installations';

const router = express.Router();

router.get('/', async (req, res) => {
  const { client, timestampStart, timestampEnd } = req.query;

  const installations = await installationsService.find(
    client,
    timestampStart ? new Date(timestampStart) : null,
    timestampEnd ? new Date(timestampEnd) : null
  );

  res.json(installations);
});

router.post('/', async (req, res) => {
  const { body } = req as {
    body: {
      timestamp: string;
      client: string;
      application: string;
      version: string;
    };
  };

  const installation = await installationsService.create(
    body.timestamp ? new Date(body.timestamp) : null,
    body.client,
    body.application,
    body.version
  );

  res.json({ id: installation._id });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await installationsService.deleteOne(id);

  res.sendStatus(200);
});

export default router;
