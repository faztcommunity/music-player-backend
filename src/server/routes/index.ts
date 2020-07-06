import { Router } from 'express';

// Import gets routes (gets, posts, deletes, patchs)
import gets from './gets';
import posts from './posts';
import patchs from './patchs';
import deletes from './deletes';

// Initialize the express router
const routes = Router();

// Initialize the  routes (gets, posts, deletes, patchs)
gets(routes);
posts(routes);
patchs(routes);
deletes(routes);

// Export routes
export default routes;
