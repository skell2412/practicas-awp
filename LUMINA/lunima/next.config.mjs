/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'morwxmynscblwjbzjtmd.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/fotos/**'

      },
    ],
  },
};

export default nextConfig;
