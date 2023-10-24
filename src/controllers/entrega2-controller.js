import mysql2 from "mysql2/promise";
import connectionConfig from "../database/connection.js";

/**
 * The function creates a connection to a MySQL database using the provided configuration.
 * @returns a promise that resolves to a MySQL connection object.
 */
const createConnection = async () => {
  return await mysql2.createConnection(connectionConfig);
};

const c1 = async (req, res) => {
  try {
    const connection = await createConnection();
    const [data] = await connection.execute("SELECT b.estado, COUNT(b.id_boleta) AS cantidad, COUNT(DISTINCT u.run) AS usuarios_relacionados FROM boleta b LEFT JOIN usuario u ON b.id_boleta = CAST(u.run AS INTEGER) GROUP BY b.estado HAVING cantidad > 1;");
    await connection.end();

    return res.status(200).json({
      success: true,
      totaldata: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Problemas al ejecutar la consulta",
      code: error,
    });
  }
};

const c2 = async (req, res) => {
  try {
    const connection = await createConnection();
    const [data] = await connection.execute("SELECT r.run, COUNT(*) AS cantidad_pagos, GROUP_CONCAT(b.estado) AS estados_boletas FROM realizar_pago r LEFT JOIN boleta b ON r.run = CAST(b.id_boleta AS INTEGER) GROUP BY r.run HAVING cantidad_pagos >= 1;");
    await connection.end();
    return res.status(200).json({
      success: true,
      totaldata: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Problemas al ejecutar la consulta",
      code: error,
    });
  }
};

const c3 = async (req, res) => {
  try {
    const connection = await createConnection();
    const [data] = await connection.execute("SELECT u.run, b.estado AS estado_boleta FROM usuario u LEFT JOIN boleta b ON u.run = CAST(b.id_boleta AS INTEGER) WHERE u.run NOT IN (SELECT run FROM realizar_pago);");
    await connection.end();

    return res.status(200).json({
      success: true,
      totaldata: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Problemas al ejecutar la consulta",
      code: error,
    });
  }
};

const c4 = async (req, res) => {
  try {
    const connection = await createConnection();
    const [data] = await connection.execute("SELECT b.id_boleta, b.monto, u.run AS usuario_run FROM boleta b LEFT JOIN usuario u ON b.id_boleta = CAST(u.run AS INTEGER) WHERE b.monto IN (1000, 2000, 5000);");
    await connection.end();

    return res.status(200).json({
      success: true,
      totaldata: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Problemas al ejecutar la consulta",
      code: error,
    });
  }
};

const c5 = async (req, res) => {
  try {
    const connection = await createConnection();
    const [data] = await connection.execute("SELECT r.run FROM realizar_pago r LEFT JOIN boleta b ON r.run = CAST(b.id_boleta AS INTEGER) WHERE b.id_boleta IS NULL;");
    await connection.end();

    return res.status(200).json({
      success: true,
      totaldata: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Problemas al ejecutar la consulta",
      code: error,
    });
  }
};

export { c1, c2, c3, c4, c5 };
