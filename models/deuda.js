const mongoose = require('mongoose');
const { Schema } = mongoose;

//Revisar que el modelo este funcionando puede ocurrir error por eso 

const DeudaSchema = new Schema({
  deuda: {
    type: [
        {
            concepto: String,
            monto: Number
        }
    ],
    required: [true, 'La deuda es requerida'],
  },
  deudaPareja: {
    type: [
        {
            concepto: String,
            monto: Number
        }
    ],
    required: [true, 'La deudaPareja es requerida'],
  },
  id_user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

});

const DeudasModel =   mongoose.model('Deuda', DeudaSchema);

module.exports =  DeudasModel