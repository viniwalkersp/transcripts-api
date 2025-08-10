import { put } from '@vercel/blob';
import { nanoid } from 'nanoid';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const filename = req.headers['x-filename'] || `transcript-${nanoid()}.html`;
    const blob = await put(filename, req, { access: 'public' });
    res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error('Erro no upload:', err);
    res.status(500).json({ error: 'Falha no upload', detail: err.message });
  }
}
