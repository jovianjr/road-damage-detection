/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
		MINIO_PORT: process.env.MINIO_PORT,
		MINIO_SSL: process.env.MINIO_SSL,
	},
	async rewrites() {
		return [
			{
				source: '/api/upload-file',
				destination: '/api/upload-file',
			},
			{
				source: '/api/:path*',
				destination: `${process.env.API_URL}/:path*`,
			},
		]
	},
}

module.exports = nextConfig
