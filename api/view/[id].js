export default async function handler(req, res) {
  const { id } = req.query;

  // Monta o link do blob original
  const blobUrl = `https://ffmoxgz5bqepn5e.public.blob.vercel-storage.com/${id}.html`;

  // Faz redirecionamento 302
  res.redirect(blobUrl);
}