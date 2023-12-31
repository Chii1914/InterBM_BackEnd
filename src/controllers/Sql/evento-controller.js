import mysql2 from "mysql2/promise";
import connectionConfig from "../../database/connection.js";
import bcrypt from "bcryptjs";

/**
 * The function creates a connection to a MySQL database using the provided configuration.
 * @returns a promise that resolves to a MySQL connection object.
 */
const createConnection = async () => {
  return await mysql2.createConnection(connectionConfig);
};

const crearEvento = async (req, res, next) => {
  const type = req.params;
  if (type.typebd == "mongo") {
    next();
    return;
  }
  try {
    const connection = await createConnection();
    const evento = req.body;
    await connection.execute(
      "INSERT INTO evento (_id, descripcion, titulo, localizacion, organizador, fecha_hora) VALUES (?, ?, ?, ?, ?, ?)",
      [
        evento._id,
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
      evento: evento,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al crear el evento",
      code: error,
    });
  }
};

const getEvento = async (req, res, next) => {
  if (req.params.typebd == "mongo") {
    next();
    return;
  } else {
    try {
      const connection = await createConnection();
      const [rows] = await connection.execute("SELECT * from evento");
      await connection.end();
      return res.status(200).json({
        success: true,
        evento: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error: "Problemas al traer el evento",
        code: error,
      });
    }
  }
};

const getEventoId = async (req, res, next) => {
  if (req.params.typebd == "mongo") {
    next();
    return;
  }
  try {
    const connection = await createConnection();
    const evento = req.params;
    const [rows] = await connection.execute(
      "SELECT * FROM evento WHERE _id = ?",
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

const updateEvento = async (req, res, next) => {
  if (req.params.typebd == "mongo") {
    next();
    return;
  }
  try {
    const connection = await createConnection();
    const evento = req.body;
    const id_evento = req.params.id_evento;

    // Perform the update
    const [updateResult] = await connection.execute(
      "UPDATE evento SET descripcion = ?, titulo = ?, localizacion = ?, organizador = ?, fecha_hora = ? WHERE _id = ?",
      [
        evento.descripcion,
        evento.titulo,
        evento.localizacion,
        evento.organizador,
        evento.fecha_hora,
        id_evento
      ]
    );

    // Check if any row was updated
    if (updateResult.affectedRows === 0) {
      await connection.end();
      return res.status(404).json({
        status: false,
        message: "Evento no encontrado o no modificado",
      });
    }

    // Fetch the updated row
    const [updatedRows] = await connection.execute(
      "SELECT * FROM evento WHERE _id = ?",
      [id_evento]
    );

    await connection.end();
    return res.status(200).json({
      status: true,
      message: "El evento fue actualizado",
      evento: updatedRows[0], // Return the first (and should be only) updated row
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al actualizar el evento o no existe",
      code: error,
    });
  }
};


const deleteEvento = async (req, res, next) => {
  if (req.params.typebd == "mongo") {
    next();
    return;
  }

  try {
    const connection = await createConnection();
    const evento = req.params;
    const { id_evento } = evento;
    await connection.execute("DELETE FROM evento WHERE _id = ?", [
      id_evento,
    ]);
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

export { crearEvento, getEvento, getEventoId, updateEvento, deleteEvento };
