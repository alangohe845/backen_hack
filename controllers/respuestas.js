const Respuesta = require('../models/respuestas.js');
const DeudasModel = require("../models/deuda.js")
// Obtener todas las respuestas
const getRespuestas = async (req, res) => {
  try {
    const respuestas = await Respuesta.find().populate('id_user'); // Usamos `populate` para obtener los datos del usuario
    res.status(200).json(respuestas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las respuestas', error });
  }
};

// Obtener una respuesta por ID
const getRespuesta = async (req, res) => {
  const { id } = req.params;
  try {
    const respuesta = await Respuesta.findById(id).populate('id_user'); // Usamos `populate` para obtener el usuario
    if (!respuesta) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la respuesta', error });
  }
};

// Crear una nueva respuesta
const createRespuesta = async (req, res) => {
  const body = req.body;
  const { id_user } = req.params;
  let deudas

  try {
    console.log(body);
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "No se han encontrado datos" });
    }

    if (!id_user) {
      console.log(id_user);
      return res.status(400).json({ message: "No se ha encontrado al usuario" });
    }

    // Guardar la respuesta inmutable
    const inmutableResponses = new Respuesta({ id_user, ...body });
    const inmutableResponsesValue = await inmutableResponses.save()

    // Condición para guardar las deudas del usuario
    if (body.deudas && Array.isArray(body.deudas) && body.deudas.length > 0) {
      const deudaRegisters = await body.deudas.map(entry => ({
        concepto: entry.concepto,
        monto: entry.monto
      }));
    
      const deudaParejaRegisters = 
        body.deudasPareja && Array.isArray(body.deudasPareja) 
        ? await body.deudasPareja.map(entry => ({
            concepto: entry.concepto,
            monto: entry.monto
          }))
        : []; // Inicializa como un arreglo vacío si no existe o no es un arreglo
    
      console.log(deudaParejaRegisters, deudaRegisters);
      
      const deuda = new DeudasModel({
        id_user,
        deuda: deudaRegisters,
        deudaPareja: deudaParejaRegisters 
      });
      console.log(deuda);
      
      deudas = await deuda.save();
    }
    

    // Condición para guardar las deudas de la pareja
    // if (body.deudasPareja && Array.isArray(body.deudasPareja) && body.deudasPareja.length > 0) {
    //   const deudaPareja = new DeudasModel({
    //     id_user,
    //     deuda: [], // Inicializamos vacío si no hay deudas del usuario
    //     deudaPareja: body.deudasPareja.map(entry => ({
    //       concepto: entry.concepto,
    //       monto: entry.monto
    //     }))
    //   });

     
      // Populando el usuario en la respuesta inmutable
      const populatedResponses = await inmutableResponsesValue.populate('id_user');

    
    res.status(201).json({populatedResponses, deudas});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la respuesta', error });
  }
}



// Actualizar una respuesta por ID
const updateRespuesta = async (req, res) => {
  const { id } = req.params;
  const { respuesta } = req.body;
  try {
    const respuestaActualizada = await Respuesta.findByIdAndUpdate(id, { respuesta }, { new: true });
    if (!respuestaActualizada) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    res.status(200).json({ message: 'Respuesta actualizada correctamente', respuestaActualizada });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la respuesta', error });
  }
};

// Eliminar una respuesta por ID
const deleteRespuesta = async (req, res) => {
  const { id } = req.params;
  try {
    const respuestaEliminada = await Respuesta.findByIdAndDelete(id);
    if (!respuestaEliminada) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    res.status(200).json({ message: 'Respuesta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la respuesta', error });
  }
};

// Exportar todas las funciones del controlador
module.exports = {
  getRespuestas,
  getRespuesta,
  createRespuesta,
  updateRespuesta,
  deleteRespuesta
};
