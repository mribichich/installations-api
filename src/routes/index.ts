import * as express from 'express';

import installations from './installations';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(200);
});

router.use('/installations', installations);

export default router;
