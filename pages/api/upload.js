<<<<<<< HEAD
// pages/api/upload.js
import { put } from '@vercel/blob';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false, // importante: receberemos o raw body
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // lê todo o body como Buffer
    const fileBuffer = await buffer(req);
    const fileName = req.headers['x-filename'] || `transcript-${Date.now()}.html`;

    // salva no Blob (público)
    const blob = await put(fileName, fileBuffer, {
      access: 'public',        // torna público
      addRandomSuffix: true,   // evita sobrescrever com mesmo nome
    });

    return res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error('Erro no upload API:', err);
    return res.status(500).json({ error: 'Upload failed', detail: err.message });
  }
}
=======
// pages/api/upload.js
import { put } from '@vercel/blob';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false, // importante: receberemos o raw body
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // lê todo o body como Buffer
    const fileBuffer = await buffer(req);
    const fileName = req.headers['x-filename'] || `transcript-${Date.now()}.html`;

    // salva no Blob (público)
    const blob = await put(fileName, fileBuffer, {
      access: 'public',        // torna público
      addRandomSuffix: true,   // evita sobrescrever com mesmo nome
    });

    return res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error('Erro no upload API:', err);
    return res.status(500).json({ error: 'Upload failed', detail: err.message });
  }
}
>>>>>>> 7a21eac (Add upload API route)
