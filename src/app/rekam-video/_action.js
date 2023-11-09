import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'
import { useEffect, useState } from 'react'
import { DownloadIcon, UploadCloudIcon } from 'lucide-react'

import ButtonOption from '@/app/components/buttonOption'
import Button from '@/app/components/button'

import { uploadFileToMinio } from '@/utils/services/upload'
import { createRoad, updateRoad } from '@/utils/services/road'

const Action = ({ blob, contentType, locationData }) => {
	const router = useRouter()
	const [blobUrl, setBlobUrl] = useState()

	useEffect(() => {
		const url = URL.createObjectURL(blob)
		setBlobUrl(url)
	}, [blob])

	const handleDownloadVideo = () => {
		const videoEl = document.createElement('a')
		document.body.appendChild(videoEl)
		videoEl.style = 'display: none'
		videoEl.href = blobUrl
		videoEl.download = `RDD-${Date.now()}.${contentType.extension}`
		videoEl.click()
		document.body.removeChild(videoEl)
	}

	const handleDownloadCSV = () => {
		let dummyData = 'microTime,latitude,longitude\n'
		locationData.forEach((e) => {
			dummyData += `${e.microTime},${e.latitude},${e.longitude}\n`
		})
		const csvContent = `data:text/csv;charset=utf-8,${dummyData}`
		const encodedURI = encodeURI(csvContent)
		const csvEl = document.createElement('a')
		document.body.appendChild(csvEl)
		csvEl.style = 'display: none'
		csvEl.href = encodedURI
		csvEl.download = `RDD-${Date.now()}.csv`
		csvEl.click()
	}

	const handleUpload = () => {
		uploadFile.mutateAsync()
	}

	const uploadFile = useMutation({
		mutationKey: ['upload-video'],
		mutationFn: () => {
			const formData = new FormData()
			formData.append('file', blob)
			return uploadFileToMinio({
				formData: formData,
			})
		},
		onSuccess: (res) => saveVideo.mutateAsync(res.data.data),
	})

	const saveVideo = useMutation({
		mutationKey: ['save-video'],
		mutationFn: (data) =>
			createRoad({ title: `video-${Date.now()}`, url: data.url }),
		onSuccess: (res) => {
			updateVideo.mutateAsync(res.data)
		},
	})

	const updateVideo = useMutation({
		mutationKey: ['update-video'],
		mutationFn: (data) =>
			updateRoad({
				id: data._id,
				locations: locationData,
			}),
		onSuccess: (res) => {
			router.push(`/rekaman/${res.data._id}`)
		},
	})
	return (
		<div className="flex h-full flex-col items-center justify-center gap-10">
			<video
				controls
				src={blobUrl}
				className="aspect-video h-[50svh]"
				autoPlay
			></video>
			<div className="mx-auto flex gap-10 max-md:gap-2 max-md:px-2">
				<ButtonOption
					as="button"
					buttonText="Unduh Video"
					className="hover:!bg-white"
				>
					<DownloadIcon className="h-20 w-20 text-c-blue" />
					<span className="flex flex-col gap-1">
						<Button text="Unduh Video" onClick={handleDownloadVideo} />
						<Button text="Unduh CSV" onClick={handleDownloadCSV} />
					</span>
				</ButtonOption>
				<ButtonOption
					as="button"
					onClick={handleUpload}
					Icon={UploadCloudIcon}
					buttonText="Analisis Video"
				/>
			</div>
		</div>
	)
}

export default Action
