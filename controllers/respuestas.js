const Respuesta = require('../models/respuestas.js');
const DeudasModel = require("../models/deuda.js");
const apiConsume = require("../controllers/ia.js");
const { response } = require('express');
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
    const respuesta = await Respuesta.find({ id_user: id })
      .populate('id_user')
      .sort({ createdAt: -1 })  // Ordena por la fecha de creación (descendente)
      .limit(1); // Limita el resultado al más reciente

    if (respuesta.length === 0) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }

    res.status(200).json(respuesta[0]); // Devuelve solo el objeto más reciente
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la respuesta', error });
  }
};


// Crear una nueva respuesta
const createRespuesta = async (req, res) => {
  const body = req.body;
  const { id_user } = req.params;
  let deudas;

  try {
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "No se han encontrado datos" });
    }

    if (!id_user) {
      return res.status(400).json({ message: "No se ha encontrado al usuario" });
    }

    // Consume la API para generar el plan financiero
    const planFinanciero = await apiConsume(body);

    // Guardar la respuesta inmutable con el plan financiero generado
    const inmutableResponses = new Respuesta({
      id_user,
      ...body,
      planFinanciero, // Aquí almacenamos el plan financiero generado por la API
    });

    const inmutableResponsesValue = await inmutableResponses.save();

    // Guardar las deudas si existen
    if (body.deudas && Array.isArray(body.deudas) && body.deudas.length > 0) {
      const deudaRegisters = body.deudas.map(entry => ({
        concepto: entry.concepto,
        monto: entry.monto,
      }));

      const deudaParejaRegisters =
        body.deudasPareja && Array.isArray(body.deudasPareja)
          ? body.deudasPareja.map(entry => ({
              concepto: entry.concepto,
              monto: entry.monto,
            }))
          : [];

      const deuda = new DeudasModel({
        id_user,
        deuda: deudaRegisters,
        deudaPareja: deudaParejaRegisters,
      });

      deudas = await deuda.save();
    }

    // Populamos el usuario en la respuesta inmutable
    const populatedResponses = await inmutableResponsesValue.populate('id_user');

    // Respuesta final
    res.status(201).json({ populatedResponses, deudas, planFinanciero });
  } catch (error) {
    console.error(error);
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
