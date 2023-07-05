import express, { Request, Response } from 'express';
import https from 'https';
import { IncomingMessage } from 'http';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const uri: string = 'https://jsonplaceholder.typicode.com/users';

  https.get(uri, function (response: IncomingMessage) {
    response.pipe(res);
  });
});

export default router;
