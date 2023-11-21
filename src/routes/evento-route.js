import { Router } from "express";
import {
  crearEvento,
  getEvento,
  getEventoId,
  updateEvento,
  deleteEvento,
} from "../controllers/Sql/evento-controller.js";

import{
  getEventoNoSQL,
} from "../controllers/NoSql/evento-controllerNoSql.js";
const router = Router();

//Siempre hay que anteponer "http://localhost:4000/evento/" y luego la ruta definida dependiendo de la accion crud.
//SQL
router.route(`/evento/:id_evento`).post(crearEvento );
router.route(`/evento/:typebd`).get(getEvento, getEventoNoSQL);
router.route(`/evento/:id_evento/`).get(getEventoId);
router.route(`/evento/:id_evento`).patch(updateEvento);
router.route(`/evento/:id_evento`).delete(deleteEvento);
//NoSQL


export default router;
