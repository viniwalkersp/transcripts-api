import { put } from '@vercel/blob';
import { nanoid } from 'nanoid';

export const config = {
  api: { bodyParser: false }, // vamos receber o arquivo cru
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // nome do arquivo, se não vier no header, gera um aleatório
    const filename = req.headers['x-filename'] || `transcript-${nanoid()}.html`;

    // salva direto no Blob
    const blob = await put(filename, req, { access: 'public' });

    res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error('Erro no upload:', err);
    res.status(500).json({ error: 'Falha no upload', detail: err.message });
  }
}
