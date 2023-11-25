import { Router } from "express";
import {
  crearEvento,
  getEventoId,
  updateEvento,
  deleteEvento,
  getEvento,
} from "../controllers/Sql/evento-controller.js";

import noSqlCliente from "../controllers/NoSql/evento-controllerNoSql.js";
const router = Router();
//Siempre hay que anteponer "http://localhost:4000/evento/" y luego la ruta definida dependiendo de la accion crud.
//SQL
router.route(`/evento/:typebd`).post(crearEvento, noSqlCliente.crearEventoNoSQL);
router.route(`/evento/:typebd`).get(getEvento, noSqlCliente.getEventoNoSql);
router.route(`/evento/:id_evento/:typebd`).get(getEventoId);
router.route(`/evento/:typebd/:id_evento/`).patch(updateEvento, noSqlCliente.updateEventoNoSQL);
router.route(`/evento/:id_evento`).delete(deleteEvento);

export default router;
