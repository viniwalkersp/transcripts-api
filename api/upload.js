import { put } from '@vercel/blob';
import { nanoid } from 'nanoid';

export const config = {
  api: {
    bodyParser: false, // vamos receber o arquivo cru
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // pega o nome enviado no header ou cria um novo
    const filename = req.headers['x-filename'] || `transcript-${nanoid()}.html`;

    // faz o upload pro Blob Storage com o token
    const blob = await put(filename, req, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    // responde com o link público
    res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error('Erro no upload:', err);
    res.status(500).json({ error: 'Falha no upload', detail: err.message });
  }
}
