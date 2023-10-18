import mysql2 from "mysql2/promise";
import connectionConfig from "../database/connection.js";
import bcrypt from "bcryptjs";

/**
 * The function creates a connection to a MySQL database using the provided configuration.
 * @returns a promise that resolves to a MySQL connection object.
 */
const createConnection = async () => {
  return await mysql2.createConnection(connectionConfig);
};

const crearEvento = async (req, res) => {
  try {
    const connection = await createConnection();
    const evento = req.body;
    await connection.execute(
      "INSERT INTO evento (id_evento, descripcion, titulo, localizacion, organizador, fecha_hora) VALUES (?, ?, ?, ?, ?, ?)",
      [
        evento.id_evento,
        evento.descripcion,
        evento.titulo,
        evento.localizacion,
        evento.organizador,
        evento.fecha_hora,
      ]
    );
    await connection.end();
    return res.status(200).json({
      status: true,
      message: "Evento creado",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al crear el evento",
      code: error,
    });
  }
};

const getEvento = async (req, res) => {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute("SELECT * from evento");
    await connection.end();
    return res.status(200).json({
      success: true,
      usuarios: rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al traer el evento",
      code: error,
    });
  }
};

const getEventoId = async (req, res) => {
  try {
    const connection = await createConnection();
    const evento = req.params;
    const [rows] = await connection.execute(
      "SELECT * FROM evento WHERE id_evento = ?",
      [evento.id_evento]
    );
    await connection.end();
    return res.status(200).json({
      status: true,
      usuarios: rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al visualizar evento o no existe",
      code: error,
    });
  }
};

const updateEvento = async (req, res) => {
  try {
    const connection = await createConnection();
    const evento = req.body;
    const id_evento = req.params;
    await connection.execute(
      "UPDATE evento SET descripcion = ?, titulo = ?, localizacion = ?, organizador = ?, fecha_hora = ? WHERE id_evento = ?",
      [
        evento.descripcion,
        evento.titulo,
        evento.localizacion,
        evento.organizador,
        evento.fecha_hora,
        id_evento.id_evento,
      ]
    );
    await connection.end();
    return res.status(200).json({
      status: true,
      message: "El evento fue actualizado",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al actualizar el evento o no existe",
      code: error,
    });
  }
};

const deleteEvento = async (req, res) => {
  try {
    const connection = await createConnection();
    const evento = req.params;
    const { id_evento } = evento;
    await connection.execute("DELETE FROM evento WHERE id_evento = ?", [id_evento]);
    await connection.end();
    return res.status(200).json({
      status: true,
      message: "Evento eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al eliminar el evento o no existe",
      code: error,
    });
  }
};

export { crearEvento ,getEvento, getEventoId, updateEvento, deleteEvento };
