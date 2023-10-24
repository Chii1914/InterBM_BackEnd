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

//REUNIR POR MIDDLEWARE USUARIO Y CUENTA
const crearUsuario = async (req, res) => {
  try {
    const connection = await createConnection();
    const usuario = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);
    await connection.execute(
      "INSERT INTO usuario (RUN, password, direccion_completa, telefono_emergencia, nombre_completo, rol, categoria, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        usuario.RUN,
        hashedPassword,
        usuario.direccion_completa,
        usuario.telefono_emergencia,
        usuario.nombre_completo,
        usuario.rol,
        usuario.categoria,
        usuario.telefono,
      ]
    );
    await connection.end();
    return res.status(200).json({
      status: true,
      message: "Usuario creado",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al crear el usuario o usuario ya está registrado",
      code: error,
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
    const usuario = req.body;
    const RUN = req.params;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);
    await connection.execute(
      "UPDATE usuario SET direccion_completa = ?, telefono_emergencia = ?, nombre_completo = ?, rol = ?, categoria = ?, telefono = ?, password = ? WHERE RUN = ?",
      [
        usuario.direccion_completa,
        usuario.telefono_emergencia,
        usuario.nombre_completo,
        usuario.rol,
        usuario.categoria,
        usuario.telefono,
        hashedPassword,
        RUN.RUN,
      ]
    );
    await connection.end();
    return res.status(200).json({
      status: true,
      message: "El usuario fue actualizado",
    });
  } catch (error) {
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

const getVoucherByUser = async (req, res) => {
  try {
    const connection = await createConnection();
    const usuario = req.params;
    const [rows] = await connection.execute(
      "SELECT usuario.*, boleta.* FROM usuario INNER JOIN realizar_pago ON usuario.run = realizar_pago.run INNER JOIN boleta ON realizar_pago.id_boleta = boleta.id_boleta;"
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

const verifyUser = async (req, res) => {
  try {
    const user = req.body;
    console.log(user)
    const connection = await createConnection();
    const [rows] = await connection.execute(
      "SELECT password FROM usuario WHERE RUN = ?",
      [user.RUN]
    );
    if(rows.length === 0){
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
}

export {
  getUsers,
  crearUsuario,
  getUserRun,
  updateRun,
  deleteUser,
  getCategories,
  getVoucherByUser,
  verifyUser,
};
