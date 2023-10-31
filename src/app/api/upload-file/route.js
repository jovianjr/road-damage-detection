import * as Minio from 'minio'

export async function POST(req) {
	let formData = await req.formData()
	let body = Object.fromEntries(formData)

	const minioClient = new Minio.Client({
		endPoint: process.env.MINIO_ENDPOINT,
		port: parseInt(process.env.MINIO_PORT),
		useSSL: process.env.MINIO_SSL === 'true' ? true : false,
	})

	const file = body.file
	const buffer = Buffer.from(await file.arrayBuffer())
	const filename = Date.now() + '-' + file.name

	try {
		const data = await minioClient.putObject(
			'videos',
			filename,
			buffer,
			file.size,
			{
				'Content-Type': file.type,
			}
		)
		return new Response(
			JSON.stringify({
				data: {
					...data,
					url: `${process.env.MINIO_SSL === 'true' ? 'https' : 'http'}://${
						process.env.MINIO_ENDPOINT
					}:${process.env.MINIO_PORT}/videos/${filename}`,
				},
				success: 'File Uploaded succesfully',
			})
		)
	} catch (error) {
		console.log(error)
		return new Response(JSON.stringify({ error: 'Server Side Error !' }), {
			status: 500,
		})
	}
}
