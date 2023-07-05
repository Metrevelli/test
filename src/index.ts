import express, { Express } from 'express';
import users from './routes/users';
import posts from './routes/posts';
import { dataSource } from './config/app-data-source';

dataSource
  .initialize()
  .then(() => {
    console.log('Data soource Initialized!');
  })
  .catch((err: Error) => {
    console.error('Data source initialization Error:', err);
  });

const app: Express = express();

app.use('/api/users', users);
app.use('/api/posts', posts);

const PORT: number = 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
