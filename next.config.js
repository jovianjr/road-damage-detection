/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/auth/:path*',
				destination: '/api/auth/:path*',
			},
			{
				source: '/api/:path*',
				destination: `${process.env.API_URL}/:path*`,
			},
		]
	},
}

module.exports = nextConfig
