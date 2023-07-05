import express, { Request, Response } from 'express';
import { PostEntity } from '../entities/post.entity';
import https from 'https';
import { IncomingMessage } from 'http';
import { dataSource } from '../config/app-data-source';

const router = express.Router();

router.get('/:userId', async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);
  const uri: string = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

  const userPosts = await dataSource
    .getRepository(PostEntity)
    .findBy({ userId });

  https.get(uri, async (response: IncomingMessage) => {
    if (Object.keys(response).length !== Object.keys(userPosts).length) {
      let data = '';

      response.on('data', (chunk: { userId: string }) => {
        data += chunk;
      });

      response.on('end', async () => {
        const posts = JSON.parse(data);

        await dataSource.getRepository(PostEntity).upsert(posts, ['id']);

        res.send(posts);
      });
    } else {
      res.send(userPosts);
    }
  });
});

export default router;
