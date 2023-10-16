<<<<<<< HEAD
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
//CREAR EL CRUD PA EVENTOS Y ACTUALIZAR DELETE BIEM 
/**
 * This JavaScript function creates a user by inserting their name and email into a database table.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request. It includes properties such as `body`, `query`, and `params`.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, headers, and sending the response body.
 * @returns a JSON response with a status code of 200 and a message indicating that the user has been
 * created successfully.
 */
const crearUsuario = async (req, res) => {
  try {
    const connection = await createConnection();
    const usuario = req.body;
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);
    await connection.execute(
      "INSERT INTO usuario (RUN, password, Dirección_completa, telefono_emergencia, nombre_completo, rol, categoria, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [usuario.RUN, hashedPassword, usuario.Dirección_completa, usuario.telefono_emergencia, usuario.nombre_completo,usuario.rol, usuario.categoria, usuario.telefono]
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

/**
 * The function `getUsuarios` is an asynchronous function that retrieves all users from a database and
 * returns them as a JSON response.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes details such as the request method, headers, query
 * parameters, and body.
 * @param res - The `res` parameter is the response object that is used to send the HTTP response back
 * to the client. It contains methods and properties that allow you to set the response status,
 * headers, and body. In this code snippet, it is used to send the JSON response with the list of users
 * retrieved
 * @returns a response with a status code of 200 and a JSON object containing the success status and
 * the list of users (rows) retrieved from the database.
 */
const getUsuarios = async (req, res) => {
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

const getUsuarioID = async (req, res) => {
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

const actualizarID = async (req, res) =>{
    try{
        const connection = await createConnection();
        const usuario = req.body;
        const RUN = req.params;
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);
        await connection.execute(
        "UPDATE usuario SET Dirección_completa = ?,, password = ? WHERE RUN = ?",
        [usuario.Dirección_completa,
        usuario.telefono_emergencia,
        usuario.nombre_completo,
        usuario.rol,
        usuario.categoria,
        usuario.telefono,
        hashedPassword,
        RUN]
        );
        await connection.end();
        return res.status(200).json({
        status: true,
        usuarios: rows,
        });
    }catch(error){
        return res.status(500).json({
            status: false,
            error: "Problemas al actualizar el usuario o no existe",
            code: error,
          });
    }
}

const deleteID = async (req, res) =>{
    try{
        const connection = await createConnection();
        const usuario = req.params;
        const {RUN} = usuario;
        await connection.execute('DELETE FROM usuario WHERE RUN = ?', [RUN]);
        await connection.end();
        return res.status(200).json({
            status: true,
            message: 'Usuario eliminado',
            });
    }catch(error){
        return res.status(500).json({
            status: false,
            error: "Problemas al eliminar el usuario o no existe",
            code: error,
          });
    }
}

/* The `export` statement is used to export functions, objects, or values from a module so that they
can be imported and used in other modules. In this case, the `export` statement is exporting the
`getUsuarios` and `crearUsuario` functions from the current module. This allows other modules to
import and use these functions. */
export { getUsuarios, crearUsuario, getUsuarioID, actualizarID, deleteID};
=======
>>>>>>> parent of 938994d (Merge branch 'Chii-Branch')
