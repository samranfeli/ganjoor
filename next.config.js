/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "api.ganjoor.net", pathname: "**" }
        ],
        formats: ["image/avif", "image/webp"],
    },
}

module.exports = nextConfig
