import * as uuid from 'uuid/v4';
import { Collection, Db } from 'mongodb';

import { getDb } from '../db';
import * as clientsService from './clients';

type Installation = {
  _id: string;
  timestamp: Date;
  clientId: string;
  clientName: string;
  application: string;
  version: string;
};

const INSTALLATIONS = 'installations';

let db: Db;

const getCollection = () => {
  if (!db) {
    db = getDb();
  }

  return db.collection<Installation>(INSTALLATIONS);
};

export const create = async (
  timestamp: Date,
  clientName: string,
  application: string,
  version: string
) => {
  const collection = getCollection();

  let client = await clientsService.findOne(clientName);

  if (!client) {
    client = await clientsService.create(clientName);
  }

  const installation = {
    _id: uuid(),
    timestamp: timestamp || new Date(),
    clientId: client._id,
    clientName: client.name,
    application: application,
    version: version
  };

  await collection.insertOne(installation);

  return installation;
};

export const findOne = async (name: string) => {
  const collection = getCollection();

  return await collection.findOne({
    name: { $regex: `^${name}$`, $options: 'i' }
  });
};

export const find = async (
  clientName: string,
  timestampStart: Date,
  timestampEnd: Date
) => {
  const collection = getCollection();

  let andQuery = [];

  if (clientName) {
    andQuery = [
      ...andQuery,
      { clientName: { $regex: `^${clientName}$`, $options: 'i' } }
    ];
  }

  if (timestampStart) {
    andQuery = [...andQuery, { timestamp: { $gte: timestampStart } }];
  }

  if (timestampEnd) {
    andQuery = [...andQuery, { timestamp: { $lt: timestampEnd } }];
  }

  let query = {};

  if (andQuery.length) {
    query = {
      ...query,
      $and: andQuery
    };
  }

  return await collection.find(query).toArray();
};

export const deleteOne = async (id: string) => {
  const collection = getCollection();

  return await collection.deleteOne({ _id: id });
};
