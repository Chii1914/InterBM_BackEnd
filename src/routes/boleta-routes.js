import { Router } from "express";
import {
  deleteDeuda,
  generateBoleta,
  getVoucher,
  getVoucherById,
  updateDeuda,
} from "../controllers/boleta-controller.js";
const router = Router();

//Siempre hay que anteponer "http://localhost:4000/boletas/" y luego la ruta definida dependiendo de la accion crud.

router.route(`/boletas`).post(generateBoleta);
router.route(`/boletas/`).get(getVoucher);
router.route(`/boletas/:id_boleta`).get(getVoucherById);
router.route(`/boletas/:id_boleta`).patch(updateDeuda);
router.route(`/boletas/:id_boleta`).delete(deleteDeuda);

export default router;
