const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

// Configura las variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configuración de OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Middleware para parsear JSON
app.use(express.json());

// Ruta para manejar la interpretación de respuestas
app.post('/api/interpretar-respuesta', async (req, res) => {
  const { respuesta } = req.body;

  try {
    // Llama a la API de OpenAI para interpretar la respuesta
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: respuesta }],
    });

    const solucion = completion.data.choices[0].message.content;

    // Devuelve la solución en formato JSON
    res.status(200).json({ solucion });
  } catch (error) {
    console.error("Error al interpretar la respuesta:", error);
    res.status(500).json({ error: "Error al interpretar la respuesta" });
  }
});

// Servidor en ejecución
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
