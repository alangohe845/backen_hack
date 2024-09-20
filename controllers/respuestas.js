const Respuesta = require('../models/respuestas.js');

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
  const { id_user, respuesta } = req.body;
  try {
    const nuevaRespuesta = new Respuesta({ id_user, respuesta });
    console.log(nuevaRespuesta)
    await nuevaRespuesta.save();
    res.status(201).json({ message: 'Respuesta creada correctamente', nuevaRespuesta });
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
