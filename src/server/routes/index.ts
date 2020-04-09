import { Router } from 'express';

// Import gets routes (gets, posts, deletes, patchs)
import gets from './gets';
import posts from './posts';
import deletes from './deletes';
import patchs from './patchs';

// Initialize the express router
const routes = Router();

// Initialize the  routes (gets, posts, deletes, patchs)
// gets(routes); // TODO: Corregir error y luego descomentar
posts(routes);
deletes(routes);
patchs(routes);

// Export routes
export default routes;
