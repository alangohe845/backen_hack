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
  const {id_user} = req.params
  const body = req.body
  try {

    let inmutableResponsesValue
    let deudaValue
    let chatgptValue
    
    if (!body) {
      res.status(404).json({ message: "No se han encontrado datos"})
    }
    
    if (!id_user) {
      res.status(404).json({message: "No se ha encontrado al usuario"})
    }

    //Primero tenemos que realizar el pront de chatgpt 



    // segundo una vez obtenida la respuesta realizar el desencriptado del json
    // si esto no arroja lo esperado realizar las condiciones de abajo 


    // se me ocurre que regrese un true si se encuentra la estructura de json
    // que tenemos esperada
    // dependiento de las respuesta ejecutar inmutableResponses y deudas

  // la condicion se ejecuta si se cumple correctamente lo de gemini
    if (condition) {
      const inmutableResponses =  new Respuesta({id_user, ...body})

      inmutableResponsesValue = inmutableResponses

      inmutableResponses.save()
    }
    
    // filtrar con el condicional && si la respuesta del gemini tambien es correcta
    if (body.deudas &&) {
      body.deudas.map((entry) => {
        const deuda = new DeudasModel({id_user, deuda : entry.deuda, deudaPareja: entry.deudaPareja})

        deudaValue = deuda
        deuda.save()
      })
    }

    
    res.status(201).json({ inmutableResponsesValue, deudaValue, chatgptValue });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la respuesta', error });
  }
};

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
