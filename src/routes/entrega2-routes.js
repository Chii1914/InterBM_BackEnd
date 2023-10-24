import { Router } from "express";
import { c1
  
} from "../controllers/entrega2-controller.js";
const router = Router();

//Siempre hay que anteponer "http://localhost:4000/boletas/" y luego la ruta definida dependiendo de la accion crud.

router.route(`/c1/`).get(c1);
//router.route(`/e2/`).get(getVoucher);
//router.route(`/e3/`).get(getVoucher);
//router.route(`/e4/`).get(getVoucher);
//router.route(`/e5/`).get(getVoucher);

export default router;
