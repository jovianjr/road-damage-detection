'use client'

import Button from '@/app/components/button'
import UploadFile from '@/app/components/uploadFile'
import Link from 'next/link'

export default function TambahVideo() {
	return (
		<section className="flex h-full w-full flex-col items-start justify-start gap-6 px-10 py-16">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-semibold">Unggah Video</h1>
			</div>
			<div className="flex w-full flex-grow gap-10">
				<UploadFile
					title="Unggah file video"
					name="video"
					className="!w-2/3"
					onChange={() => {}}
					type="video"
					required
				></UploadFile>
				<UploadFile
					title="Unggah file lokasi"
					name="location"
					className="!w-1/3"
					onChange={() => {}}
					type="csv"
				></UploadFile>
			</div>
			<Link href="/rekaman/detail" className="w-full">
				<Button text="Upload Video" className="w-full py-2" />
			</Link>
		</section>
	)
}
