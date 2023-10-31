import { DownloadIcon, UploadCloudIcon } from 'lucide-react'
import ButtonOption from '@/app/components/buttonOption'

const Action = ({ blobUrl, contentType }) => {
	const handleDownload = () => {
		const a = document.createElement('a')
		document.body.appendChild(a)
		a.style = 'display: none'
		a.href = blobUrl
		a.download = `RDD-${Date.now()}.${contentType.extension}`
		a.click()
	}

	return (
		<div className="flex h-full flex-col items-center justify-center gap-10">
			<video
				controls
				src={blobUrl}
				className="aspect-video h-[50svh]"
				autoPlay
			></video>
			<div className="mx-auto flex gap-10">
				<ButtonOption
					as="button"
					onClick={handleDownload}
					Icon={DownloadIcon}
					buttonText="Unduh Video"
				/>
				<ButtonOption
					as="button"
					Icon={UploadCloudIcon}
					buttonText="Analisis Video"
				/>
			</div>
		</div>
	)
}

export default Action
