const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RespuestaSchema = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    respuesta: {
      type: String,
      required: true,
    },
  },
);

const Respuesta = mongoose.model("Respuesta", RespuestaSchema);

module.exports = Respuesta;
