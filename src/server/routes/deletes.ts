import { Router, Request, Response } from 'express';
import responses from '../responses';

export default (routes: Router) => {
  routes.delete('/', (req: Request, res: Response) => {
    res.jsonp(responses('error', 'Example'));
  });
};
