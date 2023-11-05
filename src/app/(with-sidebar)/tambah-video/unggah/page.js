'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useMutation } from 'react-query'

import Button from '@/app/components/button'
import UploadFile from '@/app/components/uploadFile'
import { uploadFileToMinio } from '@/utils/services/upload'
import { createRoad, updateRoadLocationByCSV } from '@/utils/services/road'
import { useRouter } from 'next/navigation'

export default function TambahVideo() {
	const router = useRouter()
	const [error, setError] = useState()
	const [title, setTitle] = useState()
	const [file, setFile] = useState()
	const [fileCSV, setFileCSV] = useState()

	const uploadFile = useMutation({
		mutationKey: ['upload-video'],
		mutationFn: () => {
			const formData = new FormData()
			formData.append('file', file)
			return uploadFileToMinio({
				formData: formData,
			})
		},
		onSuccess: (res) => saveVideo.mutateAsync(res.data.data),
	})

	const saveVideo = useMutation({
		mutationKey: ['save-video'],
		mutationFn: (data) => createRoad({ title: title, url: data.url }),
		onSuccess: (res) => {
			if (fileCSV) updateVideo.mutateAsync(res.data)
			else router.push(`/rekaman/${res.data._id}`)
		},
	})

	const updateVideo = useMutation({
		mutationKey: ['update-video-csv'],
		mutationFn: (data) => {
			const formData = new FormData()
			formData.append('csv', fileCSV)
			return updateRoadLocationByCSV({
				id: data._id,
				formData: formData,
			})
		},
		onSuccess: (res) => {
			router.push(`/rekaman/${res.data._id}`)
		},
	})

	return (
		<section className="flex h-full w-full flex-col items-start justify-start gap-6 px-10 py-8 md:py-16">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-semibold">Unggah Video</h1>
			</div>
			<div className="flex w-full flex-col gap-10 md:flex-grow">
				<UploadFile
					title="Unggah file video"
					name="video"
					className="!md:w-2/3"
					type="video"
					required
					disabled={
						uploadFile.isLoading || saveVideo.isLoading || updateVideo.isLoading
					}
					onChange={setFile}
				></UploadFile>
				<UploadFile
					title="Unggah file lokasi"
					name="location"
					className="!md:w-1/3"
					onChange={setFileCSV}
					disabled={
						uploadFile.isLoading || saveVideo.isLoading || updateVideo.isLoading
					}
					type="csv"
				></UploadFile>
			</div>
			{file ? (
				<div className="flex w-full flex-col gap-2">
					<span className="flex w-full gap-2 max-md:flex-col">
						<input
							type="text"
							className="flex-grow rounded-full border border-c-blue px-4 py-1 placeholder-shown:text-sm placeholder-shown:font-light disabled:bg-c-blue/10 max-md:text-xs"
							placeholder="Nama video"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							disabled={
								uploadFile.isLoading ||
								saveVideo.isLoading ||
								updateVideo.isLoading
							}
						/>
						<Button
							loading={
								uploadFile.isLoading ||
								saveVideo.isLoading ||
								updateVideo.isLoading
							}
							onClick={() => {
								setError()
								if (!file) {
									setError('File video harus diisi')
									return
								}
								if (!title) {
									setError('Nama video harus diisi')
									return
								}
								if (file && title) uploadFile.mutateAsync()
							}}
							text="Simpan"
							className="w-fit py-2 max-md:mx-auto"
						/>
					</span>
					<small className="text-red-500">{error}</small>
				</div>
			) : null}
		</section>
	)
}
