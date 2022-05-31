/* eslint-disable no-console */
import { Router, Request, Response } from 'express';
import axios from 'axios';
export const repos = Router();

interface IRepo {
  fork: boolean;
  created_at: Date;
}

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  try {
    const response = await axios.get(
      'https://api.github.com/users/silverorange/repos',
      {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );
    // eslint-disable-next-line no-shadow
    const repos: IRepo[] = response.data;
    res.json({
      repos: repos
        .filter((repo: IRepo) => !repo.fork)
        .sort((a: IRepo, b: IRepo) =>
          a.created_at > b.created_at ? -1 : a.created_at < b.created_at ? 1 : 0
        ),
    });
  } catch (error) {
    console.log(error);
    res.json({ repos: [] });
  }
});
