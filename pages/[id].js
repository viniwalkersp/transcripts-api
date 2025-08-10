// pages/[id].js
export async function getServerSideProps(context) {
  const { id } = context.params;
  const blobUrl = `https://ffmoxgz5bqepn5e.public.blob.vercel-storage.com/${id}.html`;

  return {
    redirect: {
      destination: blobUrl,
      permanent: false,
    },
  };
}

export default function RedirectPage() { return null; }
