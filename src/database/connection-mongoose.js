import mongoose from "mongoose";
import values from "../const/const.js";

mongoose.connect(values.URIMONGO, {}).catch((error) => console.log(error));

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongo Db conectado!");
});
