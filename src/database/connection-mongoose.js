import mongoose from "mongoose";

const uriMongo =
  "URI DADA POR EL LOCO TIANO Q ESTÁ EN LA NUBE";

mongoose.connect(uriMongo, {}).catch((error) => console.log(error));

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongo Db conectado!");
});
