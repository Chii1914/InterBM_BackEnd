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


const getEventoNoSQL = async (req, res) => {
  return res.status(200).json({
    status: true,
    message: "Este es un controlador de mongo",
  });
};
//ENDPOINTS
/*

  LUCCIANO POST
  STEPHANO GET Y DELETE
  WEA PATCH
*/
export {
  getEventoNoSQL,
};
