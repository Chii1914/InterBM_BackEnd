import { Router } from "express";
import {
  crearEvento,
  getEvento,
  getEventoId,
  updateEvento,
  deleteEvento,
} from "../controllers/evento-controller.js";
const router = Router();

//Siempre hay que anteponer "http://localhost:4000/evento/" y luego la ruta definida dependiendo de la accion crud.

router.route(`/evento`).post(crearEvento);
router.route(`/evento/`).get(getEvento);
router.route(`/evento/:id_evento`).get(getEventoId);
router.route(`/evento/:id_evento`).patch(updateEvento);
router.route(`/evento/:id_evento`).delete(deleteEvento);

export default router;
