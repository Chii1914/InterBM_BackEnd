import mysql from "mysql"


export const gb = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1914",
    database:"interbm"

})