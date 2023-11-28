import mysql2 from "mysql2/promise";
import connectionConfig from "../../database/connection.js";

const createConnection = async () => {
  try {
    const connection = await mysql2.createConnection(connectionConfig);
    console.log("Connection created successfully");
    return connection;
  } catch (error) {
    console.error("Error creating connection:", error);
    throw error;
  }
};
let connection;
// Controladores de boleta
const generateVoucher = async (req, res) => {
  try {
    const boleta = req.body;
    const connection = await createConnection();
    await connection.execute(
      "INSERT INTO boleta (id_boleta, estado, descripcion, monto, fecha) VALUES (?, ?, ?, ?, ?)",
      [
        boleta.id_boleta,
        boleta.estado,
        boleta.descripcion,
        boleta.monto,
        boleta.fecha,
      ]
    );
    await connection.end();

    return res.status(200).json({
      status: true,
      message: "Boleta creada",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Problemas al crear la deuda",
      code: error,
    });
  }
};

const getVoucher = async (req, res) => {
  try {
    const connection = await createConnection();
    const [boleta] = await connection.execute("SELECT * from boleta");
    console.log(`El total de boletas son ${boleta.length}`);
    await connection.end();

    return res.status(200).json({
      success: true,
      totalboletas: boleta,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Problemas al traer las boletas",
      code: error,
    });
  }
};

const getVoucherById = async (req, res) => {
  try {
    const connection = await createConnection();
    const [boletabyid] = await connection.execute(
      "SELECT * from boleta WHERE id_boleta = ?",
      [req.params.id_boleta]
    );
    await connection.end();

    return res.status(200).json({
      success: true,
      boleta: boletabyid,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Problemas al traer las boletas",
      code: error,
    });
  }
};

const updateVoucher = async (req, res) => {
  try {
    const boleta = req.body;
    const connection = await createConnection();
    const { id_boleta } = req.params;
    await connection.execute(
      "UPDATE boleta SET estado = ?, descripcion = ?, monto = ?, fecha = ? WHERE id_boleta = ?",
      [boleta.estado, boleta.descripcion, boleta.monto, boleta.fecha, id_boleta]
    );
    await connection.end();

    return res.status(200).json({
      status: true,
      message: "Boleta actualizada correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: "Problemas al actualizar la boleta",
      code: error,
    });
  }
};
const deleteVoucher = async (req, res) => {
  try {
    const connection = await createConnection();
    const { boletabyid } = await connection.execute(
      "DELETE from boleta WHERE id_boleta = ?",
      [req.params.id_boleta]
    );
    await connection.end();

    return res.status(200).json({
      success: true,
      boleta: boletabyid,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Problemas al eliminar las boletas",
      code: error,
    });
  }
};

//Controladores

const getAllVoucherByUser = async (req, res) => {
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
const getVoucherByRun = async (req, res) => {
  try {
    const connection = await createConnection();
    const { run } = req.params; // Obtiene el 'run' del usuario desde los parámetros de la solicitud
    const [rows] = await connection.execute(
      "SELECT usuario.*, boleta.* FROM usuario INNER JOIN realizar_pago ON usuario.run = realizar_pago.run INNER JOIN boleta ON realizar_pago.id_boleta = boleta.id_boleta WHERE usuario.run = ?;",
      [run] // Filtra por el 'run' del usuario
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
const createUserData = async (req, res) => {
  let connection;

  try {
    connection = await createConnection();
    await connection.beginTransaction(); // Inicia una transacción

    // Verifica si los datos necesarios están presentes
    const { id_boleta, monto, fecha, run, nombre_completo, categoria } =
      req.body;
    if (
      !run ||
      !id_boleta ||
      !monto ||
      !fecha ||
      !nombre_completo ||
      !categoria
    ) {
      return res.status(400).json({
        status: false,
        error: "Faltan campos necesarios en los datos proporcionados",
      });
    }

    // Verificación adicional de campos específicos
    if (
      !run ||
      !id_boleta ||
      !monto ||
      !fecha ||
      !nombre_completo ||
      !categoria
    ) {
      return res.status(400).json({
        status: false,
        error: "Faltan campos necesarios en los datos proporcionados",
      });
    }
    // Insertar datos en la tabla boleta
    await connection.execute(
      "INSERT INTO boleta (id_boleta, monto, fecha) VALUES (?,?,?)",
      [id_boleta, monto, fecha]
    );
    // Insertar datos en la tabla usuario
    await connection.execute(
      "INSERT INTO usuario (run, nombre_completo, categoria) VALUES (?,?,?)",
      [run, nombre_completo, categoria]
    );

    // Insertar datos en la tabla realizar_pago
    await connection.execute(
      "INSERT INTO realizar_pago (run, id_boleta) VALUES (?,?)",
      [run, id_boleta]
    );

    await connection.commit(); // Finaliza la transacción
    await connection.end();

    return res.status(200).json({
      status: true,
      message: "Datos creados con éxito",
    });
  } catch (error) {
    if (connection) {
      await connection.rollback(); // Deshace la transacción en caso de error
      await connection.end();
    }
    console.error(error);
    return res.status(500).json({
      status: false,
      error: "Error al crear los datos",
      detalle: error.message,
    });
  }
};

const updateVoucherByUser = async (req, res) => {
  try {
    const connection = await createConnection();
    const id_boleta = req.params.id_boleta;
    const updateData = req.body; // Los datos a actualizar

    // Inicia una transacción
    await connection.beginTransaction();

    // Primero, actualizar registros relacionados en la tabla 'realizar_pago'
    // Asumiendo que quieres actualizar un campo como 'estado_pago'
    await connection.execute(
      "UPDATE realizar_pago SET estado_pago = ? WHERE id_boleta = ?",
      [updateData.estado_pago, id_boleta]
    );

    // Luego, actualizar el registro en la tabla 'boleta'
    // Asumiendo que quieres actualizar un campo como 'monto'
    await connection.execute(
      "UPDATE boleta SET monto = ? WHERE id_boleta = ?",
      [updateData.monto, id_boleta]
    );

    // Actualizar datos en la tabla 'usuario'
    // Asumiendo que quieres actualizar un campo como 'nombre_usuario'
    await connection.execute(
      `
      UPDATE usuario 
      SET nombre_usuario = ?
      WHERE run IN (
        SELECT usuario.run
        FROM usuario
        INNER JOIN realizar_pago ON usuario.run = realizar_pago.run
        WHERE realizar_pago.id_boleta = ?
      )
    `,
      [updateData.nombre_usuario, id_boleta]
    );

    // Confirma la transacción
    await connection.commit();

    await connection.end();

    return res.status(200).json({
      success: true,
      message: "Datos actualizados correctamente",
    });
  } catch (error) {
    console.log(error);
    // En caso de error, revierte la transacción
    await connection.rollback();

    return res.status(500).json({
      success: false,
      error: "Problemas al actualizar los datos",
      code: error,
    });
  }
};

const deleteUserData = async (req, res) => {
  try {
    const connection = await createConnection();
    const runUsuario = req.params.run; // Obtiene el 'run' del usuario desde los parámetros de la solicitud

    // Inicia una transacción
    await connection.beginTransaction();

    // Primero, obtén los id_boleta asociados al usuario
    const [boletas] = await connection.execute(
      "SELECT id_boleta FROM realizar_pago WHERE run = ?",
      [runUsuario]
    );

    // Luego, eliminar registros relacionados en la tabla 'realizar_pago'
    if (boletas.length > 0) {
      const idsBoleta = boletas.map((boleta) => boleta.id_boleta);
      await connection.execute("DELETE FROM realizar_pago WHERE run = ?", [
        runUsuario,
      ]);

      // Eliminar los registros en la tabla 'boleta' asociados al usuario
      for (const idBoleta of idsBoleta) {
        await connection.execute("DELETE FROM boleta WHERE id_boleta = ?", [
          idBoleta,
        ]);
      }
    }

    // Eliminar el registro del usuario
    await connection.execute("DELETE FROM usuario WHERE run = ?", [runUsuario]);

    // Confirma la transacción
    await connection.commit();

    await connection.end();

    return res.status(200).json({
      success: true,
      message:
        "Datos del usuario y registros relacionados eliminados correctamente",
    });
  } catch (error) {
    console.log(error);
    // En caso de error, revierte la transacción
    await connection.rollback();

    return res.status(500).json({
      success: false,
      error:
        "Problemas al eliminar los datos del usuario y registros relacionados",
      code: error,
    });
  }
};

export {
  generateVoucher,
  getVoucher,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
  getVoucherByRun,
  updateVoucherByUser,
  deleteUserData,
  createUserData,
  getAllVoucherByUser,
};
