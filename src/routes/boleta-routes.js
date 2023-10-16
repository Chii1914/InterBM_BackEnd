import { Router } from "express";
import {
  deleteVoucher,
  generateVoucher,
  getVoucher,
  getVoucherById,
  updateVoucher,
} from "../controllers/boleta-controller.js";
const router = Router();

//Siempre hay que anteponer "http://localhost:4000/boletas/" y luego la ruta definida dependiendo de la accion crud.

router.route(`/voucher`).post(generateVoucher);
router.route(`/voucher/`).get(getVoucher);
router.route(`/voucher/:id_boleta`).get(getVoucherById);
router.route(`/voucher/:id_boleta`).patch(updateVoucher);
router.route(`/voucher/:id_boleta`).delete(deleteVoucher);

export default router;
