import mysql2 from 'mysql2/promise';
import connectionConfig from '../database/connection.js';
import bcrypt from "bcryptjs"

/**
 * The function creates a connection to a MySQL database using the provided configuration.
 * @returns a promise that resolves to a MySQL connection object.
 */
const createConnection = async ( ) => {
    return await mysql2.createConnection(connectionConfig);
}

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
        //const usuario = req.body; //en el cuerpo de la solicitud vamos a enviar data  'POST PUT'
        // -const filters = req.query; //?query1=valorquery1&query2=valorquery2
        // const parametros = req.params; // /create/:parametro
        const connection = await createConnection();
        const q = 'SELECT * FROM usuario where RUN = ?'
        console.log(req.body.username + " FLAGGG " + req.body.password)
        /* 
        //SI SE DESCOMENTA ESTA WEA QUEDA LA CAGA NO SÉ PORQUEEE
        await connection.query(q, [req.body.username], (err, data) =>{
            if(err) return res.json(err)
            if(data.length) return res.status(409).json("Usuario YA registrado") 
        })
        */
        
        await connection.execute('INSERT INTO usuario (RUN, password) VALUES (?, ?)', [req.body.username, req.body.password]);
        await connection.end();
       
        // console.log("BODY", usuario);
        // console.log("QUERY", filters);
        // console.log("PARAMS", parametros);

        return res.status(200).json({
            status: true,
            message: "Usuario creado"
        });
        
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al crear el usuario",
            code: error
        });
    };
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
const getUsuarios = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT * from usuario');
        await connection.end();

        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al traer el usuarios",
            code: error
        });
    }
}

/* The `export` statement is used to export functions, objects, or values from a module so that they
can be imported and used in other modules. In this case, the `export` statement is exporting the
`getUsuarios` and `crearUsuario` functions from the current module. This allows other modules to
import and use these functions. */
export {
    getUsuarios,
    crearUsuario,
}