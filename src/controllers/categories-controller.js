// categories-controller.js
import mysql2 from "mysql2/promise";
import connectionConfig from "../database/connection.js";

const createConnection = async () => {
  return await mysql2.createConnection(connectionConfig);
};

export const getCategoriesAndUsers = async (req, res) => {
  try {
    const connection = await createConnection();
    const [users] = await connection.execute("SELECT * FROM usuario");
    await connection.end();

    const categories = users.reduce((acc, user) => {
      if(!acc.includes(user.categoria)) {
        acc.push(user.categoria);
      }
      return acc;
    }, []);

    return res.status(200).json({
      success: true,
      categories,
      users
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
