import { Router } from "express";
import {
  deleteVoucher,
  generateVoucher,
  getVoucher,
  getVoucherById,
  updateVoucher,
  getVoucherByRun,
  updateVoucherByUser,
  deleteUserData,
  createUserData,
  getAllVoucherByUser,
} from "../controllers/Sql/boleta-controller.js";
const router = Router();

//Siempre hay que anteponer "http://localhost:4000/boletas/" y luego la ruta definida dependiendo de la accion crud.

router.route(`/voucher`).post(generateVoucher);
router.route(`/voucher/`).get(getVoucher);
router.route(`/voucher/:id_boleta`).get(getVoucherById);
router.route(`/voucher/:id_boleta`).patch(updateVoucher);
router.route(`/voucher/:id_boleta`).delete(deleteVoucher);

//Controladores de consulta mixta
router.route("/uservoucher/").post(createUserData);
router.route("/uservoucher/").get(getAllVoucherByUser);
router.route("/uservoucher/:run").get(getVoucherByRun);
router.route("/uservoucher/:run").delete(deleteUserData);
//router.route("/uservoucher/:id_boleta").patch(updateVoucherByUser);

export default router;
