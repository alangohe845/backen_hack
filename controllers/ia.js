const axios = require("axios");

async function apiConsume(data) {
  try {
    const question = `Por favor, crea un plan financiero personalizado en formato JSON utilizando la siguiente información:

Estado Civil: ${data.estadoCivil}.
Años de matrimonio: ${data.aniosMatrimonio}.
Número de hijos: ${data.numeroHijos} de ${data.edadesHijos}.
Frecuencia de compra: ${data.frecuenciaCompra}.
Productos más comprados: ${data.productosMasComprados}.
Ingresos mensuales: ${data.salarioMensual}.
Bonificaciones: ${data.bonificaciones}.
Ingresos adicionales: ${data.ingresosAdicionales}.
Presupuesto mensual: ${data.presupuestoMensual}.
Salario mensual de la pareja: ${data.ingresosPareja}.
Gastos educativos: ${data.gastosEducativos}.
Gastos de salud: ${data.gastosSalud}.
Seguro médico: ${data.seguroMedico}.
Ahorros mensuales: ${data.ahorrosMensuales}.
Calificación de buró de crédito: ${data.calificacionBuroCredito}.
Deudas personales:
Concepto: ${data.deudas[0]?.concepto ?? 'N/A'}, Monto: ${data.deudas[0]?.monto ?? 0}.
Deudas de la pareja:
Concepto: ${data.deudasPareja[0]?.concepto ?? 'Ninguna'}, Monto: ${data.deudasPareja[0]?.monto ?? 0}.
Salud financiera: No tiene créditos pendientes.
Gastos estimados mensuales: {proporcione detalles sobre los gastos, incluidos los gastos diarios o cualquier gasto adicional importante}.
Con base en esta información, elabora un plan financiero detallado que incluya recomendaciones sobre:

Cómo administrar las deudas actuales y reducirlas.
Cómo optimizar los gastos en salud, educación y compras regulares.
Sugerencias para incrementar el ahorro mensual.
Cualquier estrategia para mejorar la calificación crediticia.
Cualquier inversión o forma de aumentar los ingresos adicionales.
El plan financiero debe devolver una estructura clara en formato JSON que detalle cada aspecto mencionado.`;

return question
    // Realiza la llamada a la API
    // const response = await axios.post(
    //   "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY",
    //   { prompt: question } // Cambia la estructura del cuerpo de acuerdo con la API
    // );

    // // Verificar si la API respondió correctamente
    // if (response.data) {
    //   // Devolver la respuesta de la API en formato JSON
    //   return response.data;
    // } else {
    //   console.error("Error al generar el plan financiero");
    //   return { message: "Error en la generación del plan financiero" };
    // }
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw new Error("Error en la llamada a la API");
  }
}

module.exports = apiConsume;
