export default function manifest() {
    return {
        name: 'Lumina',
        short_name: 'lumina',
        description: 'Aplicacion PWA construida con Next.js',
        start_url: '/',
        display: 'standalone',
        background_color: '#FFDB58',
        theme_color: '#FFFFFF',
        icons: [
            {
                src: '/cross-duotone.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/cross-duotone.png',
                sizes: '512x512',
                type: 'image/png', 
            },
        ],
    };
}