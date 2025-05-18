const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota para receber os dados e enviar ao Google Apps Script
app.post('/reserva', async (req, res) => {
  const { pessoas, data, horario, telefone } = req.body;

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxe8QJwHIIScxzG8HBdzyi3XHWcbYV-EY3-dAl3ccvmA-o69FZSWxMMiHU9n49ffRiEdg/exec';

  try {
    const resposta = await axios.post(scriptURL, {
      pessoas,
      data,
      horario,
      telefone
    });

    res.status(200).json({ status: "enviado", resposta: resposta.data });
  } catch (erro) {
    console.error("Erro ao enviar para Apps Script:", erro.message);
    res.status(500).json({ status: "erro", erro: erro.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
