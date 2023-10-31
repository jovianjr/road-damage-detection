import { useState } from 'react'
import { UploadCloudIcon } from 'lucide-react'
import Image from 'next/image'
import clsx from 'clsx'

export default function UploadFile({
	className = '',
	type = '*',
	title = '',
	name = '',
	required = false,
	dropable = true,
	preview = true,
	onChange = () => {},
}) {
	const [file, setFile] = useState({})
	const [fileUrl, setFileUrl] = useState()
	const [fileContent, setFileContent] = useState('')

	const handleFileChange = (event) => {
		const file = event.target.files[0]
		console.log(file)
		setFile(file)
		setFileUrl(URL.createObjectURL(file))
		onChange(event)
		if (type === 'csv') {
			const reader = new FileReader()
			reader.onload = (e) => {
				const text = e.target.result
				setFileContent(text)
			}
			reader.readAsText(file)
		}
	}

	const handleDrop = (event) => {
		event.preventDefault()
		const file = event.dataTransfer.files[0]
		setFile(file)
		setFileUrl(URL.createObjectURL(file))
	}

	const handleDragOver = (event) => {
		event.preventDefault()
	}

	const resetFile = () => {
		setFile({})
		setFileUrl()
	}
	return (
		<div className={clsx('flex h-full w-full flex-col gap-2', className)}>
			<span>
				{title} {required ? <span className="text-red-500">*</span> : null}
			</span>
			<label className="flex flex-grow flex-col gap-2">
				<input
					type="file"
					className="hidden"
					accept={
						type === 'video'
							? 'video/*'
							: type === 'image'
							? 'image/*'
							: type === 'csv'
							? '.csv'
							: '*'
					}
					name={name}
					onChange={handleFileChange}
				/>
				<span className="relative w-full cursor-pointer overflow-hidden rounded-full border border-c-blue px-4 py-2 hover:bg-c-blue/10">
					<span className="absolute left-0 top-0 flex h-full w-28 items-center justify-center bg-c-blue px-4 text-white">
						Pilih File
					</span>
					<span className="line-clamp-1 pl-28 text-sm">
						{file.name ?? 'Tidak ada file dipilih'}
					</span>
				</span>
				{dropable && !fileUrl ? (
					<span
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border border-c-blue text-lg text-c-blue hover:bg-c-blue/10"
					>
						<>
							<UploadCloudIcon className="h-32 w-32" />
							Atau tarik file kesini
						</>
					</span>
				) : null}
			</label>
			{preview && fileUrl ? (
				<div className="flex h-full w-full flex-col gap-1">
					{type === 'video' ? (
						<video className="aspect-video" controls autoPlay>
							<source src={fileUrl} type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					) : null}
					{type === 'image' ? (
						<div className="relative h-full w-full">
							<Image
								src={fileUrl}
								className="aspect-video object-contain"
								fill
							/>
						</div>
					) : null}
					{type === 'csv' ? (
						<div className="relative max-h-[60svh] w-full max-w-full flex-grow overflow-auto rounded-lg border border-c-blue p-1">
							<p className="absolute">{fileContent} </p>
						</div>
					) : null}
					<span className="flex w-full justify-between">
						<span className="line-clamp-1 text-sm">{file.name}</span>
						<span className="text-blue-500 hover:underline" onClick={resetFile}>
							reset
						</span>
					</span>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}
