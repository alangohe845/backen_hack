const mongoose = require("mongoose");
const deuda = require("./deuda");
const Schema = mongoose.Schema;

const RespuestaSchema = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    frecuenciaCompra: {
      type: String,
      required: [true, 'La frecuencia de compra es requerida'],
    },
    productosMasComprados: {
      type: String,
      required: [true, 'Este campo es requerido'],
    },
    presupuestoMensual: {
      type: Number,
      required: [true, 'Este campo es requerido'],
    },
    salarioMensual: {
      type: Number,
      required: [true, 'El salario mensual es requerido'],
    },
    ingresosAdicionales: {
      type: String,
      required: [true, 'Este campo es requerido'],
    },
    bonificaciones: {
      type: String,
      required: [true, 'Este campo es requerido'],
    },
    creditos: {
      type: String,
      required: [true, 'Este campo es requerido'],
    },
    ahorrosMensuales: {
      type: Number,
      required: [true, 'Este campo es requerido'],
    },
    estadoSalud: {
      type: String,
      required: [true, 'Este campo es requerido'],
    },
    gastosSalud: {
      type: Number,
      required: [true, 'Este campo es requerido'],
    },
    seguroMedico: {
      type: String,
      required: [true, 'Este campo es requerido'],
    },
    estadoCivil: {
      type: String,
      required: [true, 'El estado civil es requerido'],
    },
    aniosMatrimonio: {
      type: Number,
      required: [true, 'Este campo es requerido'],
    },
    ingresosPareja: {
      type: Number,
      required: [true, 'Este campo es requerido'],
    },
    
    numeroHijos: {
      type: Number,
      required: [true, 'Este campo es requerido'],
    },
    edadesHijos: {
      type: String,
      required: [true, 'Este campo es requerido'],
    },
    gastosEducativos: {
      type: Number,
      required: [true, 'Este campo es requerido'],
    },
    calificacionBuroCredito: {
      type: Number,
      required: [true, 'Este campo es requerido'],
    },
    deudas: [deuda.schema],
   
  },
);

const Respuesta = mongoose.model("Respuesta", RespuestaSchema);

module.exports = Respuesta;
