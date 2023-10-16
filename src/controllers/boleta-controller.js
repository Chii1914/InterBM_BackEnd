import mysql2 from "mysql2/promise";
import connectionConfig from "../database/connection.js";

const createConnection = async () => {
  return await mysql2.createConnection(connectionConfig);
};

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
      "UPDATE boleta SET id_boleta = ?, estado = ?, descripcion = ?, monto = ?, fecha = ? WHERE id_boleta = ?",
      [
        boleta.id_boleta,
        boleta.estado,
        boleta.descripcion,
        boleta.monto,
        boleta.fecha,
        id_boleta,
      ]
    );
    await connection.end();

    return res.status(200).json({
      status: true,
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: "Problemas al actualizar el usuario",
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

export {
  generateVoucher,
  getVoucher,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
};
