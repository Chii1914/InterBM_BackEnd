/* The code is creating a router object using the `Router` class from the `express` module. It then
defines two routes: */
import { Router } from 'express';

import { crearUsuario, getUsuarios } from '../controllers/user.js';

/* `const router = Router();` is creating a new router object using the `Router` class from the
`express` module. This router object will be used to define routes and handle HTTP requests. */
const router = Router();

/* `router.route('/create').post(crearUsuario)` is defining a route for the HTTP POST method on the
'/create' endpoint. */
router.route('/create')
    .post(crearUsuario);

/* `router.route('/get-all').get(getUsuarios)` is defining a route for the HTTP GET method on the
'/get-all' endpoint. This means that when a GET request is made to the '/get-all' endpoint, the
`getUsuarios` function will be called to handle the request. */
router.route('/get-all')
    .get( getUsuarios );


export default router;