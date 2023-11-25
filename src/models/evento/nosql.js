import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true, // Equivalente a allowNull: false en Sequelize
      maxlength: 255,
    },
    direccion: {
      type: String,
      required: false, // Este campo puede ser nulo
      maxlength: 255,
    },
    titulo: {
      type: String,
      required: true, // Este campo puede ser nulo
      maxlength: 29,
    },
    descripcion: {
      type: String,
      required: true, // Este campo puede ser nulo
      maxlength: 255,
    },
    organizador: {
      type: String,
      required: false,
      maxlength: 255,
    },
    horario: {
      type: Date,
      required: false,
      maxlength: 255,
    },
  },
  {
    timestamps: {
      createdAt: "timestamp", // Personaliza el nombre del campo de timestamp
    },
  }
);

export default model("Eventos", eventoSchema);
