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
      const [data] = await connection.execute("SELECT * from boleta");
      console.log(`El total de boletas son ${data.length}`);
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


export {c1};
