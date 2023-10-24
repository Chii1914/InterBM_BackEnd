import { Router } from "express";
import { c1 , c2, c3, c4, c5
  
} from "../controllers/entrega2-controller.js";
const router = Router();

//Siempre hay que anteponer "http://localhost:4000/boletas/" y luego la ruta definida dependiendo de la accion crud.

router.route(`/c1/`).get(c1);
router.route(`/c2/`).get(c2);
router.route(`/c3/`).get(c3);
router.route(`/c4/`).get(c4);
router.route(`/c5/`).get(c5);

export default router;
