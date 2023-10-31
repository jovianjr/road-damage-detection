'use client'
import Link from 'next/link'
import { UploadCloudIcon, VideoIcon } from 'lucide-react'
import ButtonOption from '@/app/components/buttonOption'

export default function TambahVideo() {
	return (
		<section className="flex h-full w-full items-center justify-center gap-10">
			<Link href="/tambah-video/unggah">
				<ButtonOption Icon={UploadCloudIcon} buttonText="Unggah Video" />
			</Link>
			<Link href="/rekam-video">
				<ButtonOption Icon={VideoIcon} buttonText="Rekam Video" />
			</Link>
		</section>
	)
}
