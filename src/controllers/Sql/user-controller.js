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

//REUNIR POR MIDDLEWARE USUARIO Y CUENTA
const crearUsuario = async (req, res) => {
  let connection;

  try {
    connection = await createConnection();
    const { run, nombre_completo, categoria } = req.body;

    if (!run) {
      return res.status(400).json({
        status: false,
        error: "El campo 'run' es obligatorio",
      });
    }

    await connection.execute(
      "INSERT INTO usuario (run, nombre_completo, categoria) VALUES (?, ?, ?)",
      [run, nombre_completo, categoria]
    );
    const usuario = { run, nombre_completo, categoria };
    await connection.end();
    return res.status(200).json({
      status: true,
      message: "Usuario creado",
      usuario,
    });
  } catch (error) {
    console.error(error);

    if (connection) await connection.end();
    return res.status(500).json({
      status: false,
      error: "Error al crear el usuario",
      detalle: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute("SELECT * from usuario");
    await connection.end();
    return res.status(200).json({
      success: true,
      usuarios: rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al traer el usuarios",
      code: error,
    });
  }
};

const getUserRun = async (req, res) => {
  try {
    const connection = await createConnection();
    const usuario = req.params;
    const [rows] = await connection.execute(
      "SELECT * FROM usuario WHERE RUN = ?",
      [usuario.RUN]
    );
    await connection.end();
    return res.status(200).json({
      status: true,
      usuarios: rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al visualizar usuario o no existe",
      code: error,
    });
  }
};

const updateRun = async (req, res) => {
  try {
    const connection = await createConnection();
    const usuarior = req.body;
    const run = req.params;
    await connection.execute(
      "UPDATE usuario SET nombre_completo = ?, categoria = ? WHERE RUN = ?",
      [usuarior.nombre_completo, usuarior.categoria, run.RUN]
    );
    await connection.end();
    return res.status(200).json({
      status: true,
      message: "El usuario fue actualizado",
      usuarior,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Problemas al actualizar el usuario o no existe",
      code: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const connection = await createConnection();
    const usuario = req.params;
    const { RUN } = usuario;
    await connection.execute("DELETE FROM usuario WHERE RUN = ?", [RUN]);
    await connection.end();
    return res.status(200).json({
      status: true,
      message: "Usuario eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al eliminar el usuario o no existe",
      code: error,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const connection = await createConnection();
    const { categorias } = req.params;
    const [rows] = await connection.execute(
      "SELECT * FROM usuario WHERE categoria = ?",
      [categorias]
    );
    await connection.end();
    return res.status(200).json({
      status: true,
      usuarios: rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Problemas al traer las categorías y usuarios",
      code: error,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    const connection = await createConnection();
    const [rows] = await connection.execute(
      "SELECT password FROM usuario WHERE RUN = ?",
      [user.RUN]
    );
    if (rows.length === 0) {
      return res.status(200).json({
        status: false,
        message: "Usuario no existente",
      });
    }
    await connection.end();
    const result = await bcrypt.compare(user.password, rows[0].password);
    if (result) {
      return res.status(200).json({
        status: true,
      });
    }

    return res.status(200).json({
      status: false,
      message: "Contraseña incorrecta",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al visualizar usuario o no existe",
      code: error,
    });
  }
};

export {
  getUsers,
  crearUsuario,
  getUserRun,
  updateRun,
  deleteUser,
  getCategories,
  verifyUser,
};
