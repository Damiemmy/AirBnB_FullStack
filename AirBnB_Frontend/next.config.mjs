// /** @type {import('next').NextConfig} */
// const nextConfig = {

//     images: {
//         remotePatterns:[
//             {
//                 protocol: 'http',
//                 hostname: 'localhost',
//                 port: '8000',
//                 pathname: '/**'
//             }
//         ]
//     }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
                'localhost',
                'localhost:80',
            ],
        },
    },

    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
