/* The code is creating a router object using the `Router` class from the `express` module. It then
defines two routes: */
import { Router } from "express";

import {
    actualizarID,
  crearUsuario,
  deleteID,
  getUsuarioID,
  getUsuarios,
} from "../controllers/user.js";

/* `const router = Router();` is creating a new router object using the `Router` class from the
`express` module. This router object will be used to define routes and handle HTTP requests. */
const router = Router();


router.route("/user/").post(crearUsuario);
router.route("/user/").get(getUsuarios);
router.route("/user/:RUN").get(getUsuarioID);
router.route("/user/:RUN").patch(actualizarID)
router.route("/user/:RUN").delete(deleteID)



export default router;
