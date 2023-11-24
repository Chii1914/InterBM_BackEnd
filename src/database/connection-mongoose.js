import mongoose from "mongoose";

const uriMongo =
  "mongodb+srv://tiano:3hDDX9ieKz2VLluJ@interbmmongodb.gdl8zzf.mongodb.net/";

mongoose.connect(uriMongo, {}).catch((error) => console.log(error));

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongo Db conectado!");
});
