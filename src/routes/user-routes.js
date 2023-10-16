/* The code is creating a router object using the `Router` class from the `express` module. It then
defines two routes: */
import { Router } from "express";

import {
  crearUsuario,
  deleteUser,
  getUserRun,
  getUsers,
  updateRun,
} from "../controllers/user-controller.js";

/* `const router = Router();` is creating a new router object using the `Router` class from the
`express` module. This router object will be used to define routes and handle HTTP requests. */
const router = Router();

router.route("/user/").post(crearUsuario);
router.route("/user/").get(getUsers);
router.route("/user/:RUN").get(getUserRun);
router.route("/user/:RUN").patch(updateRun);
router.route("/user/:RUN").delete(deleteUser);

export default router;
