import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'erro', mensagem: 'Método não permitido' });
  }

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
}
