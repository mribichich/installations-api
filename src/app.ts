import * as express from 'express';
import * as bodyParser from 'body-parser';

import routes from './routes/index';
import health from './health';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

app.get('/health', health);

app.use('*', (req, res, next) => {
  res.sendStatus(404);

  next();
});

export default (port: number | string) => {
  app.listen(port, () => {
    console.log(`Listening in port ${port}`);
  });

  return app;
};
