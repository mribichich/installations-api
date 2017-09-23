import { getDb } from './db';

const getStatus = () => {
  const db = getDb();

  const dbStatus = db !== undefined && db !== null;
  const all = dbStatus;

  return {
    all: all,
    db: dbStatus
  };
};

export default (req, res) => {
  res.json(getStatus());
};
