'use client'

import { useEffect, useState } from 'react'
import { XCircleIcon } from 'lucide-react'
import Record from '@/app/rekam-video/_record'
import Action from '@/app/rekam-video/_action'

const videoConstraints = {
	width: 1080,
	height: 640,
	frameRate: { ideal: 15, max: 15 },
}

const WebcamStreamCapture = () => {
	const [browserSupport, setBrowserSupport] = useState(true)
	const [blobUrl, setBlobUrl] = useState()

	useEffect(() => {
		CheckSupportCamera()
		CheckSupportLocation()
	}, [])

	const CheckSupportCamera = () => {
		navigator.mediaDevices
			.getUserMedia({
				video: videoConstraints,
			})
			.catch(() => {
				setBrowserSupport(false)
			})
	}

	const CheckSupportLocation = () => {
		if (!navigator.geolocation) {
			setBrowserSupport(false)
		} else {
			navigator.geolocation.getCurrentPosition(
				() => {},
				() => {
					setBrowserSupport(false)
				}
			)
		}
	}

	return (
		<div className="h-screen w-screen bg-white">
			{browserSupport ? (
				blobUrl ? (
					<Action blobUrl={blobUrl} />
				) : (
					<Record setBlobUrl={setBlobUrl} videoConstraints={videoConstraints} />
				)
			) : (
				<div className="mx-auto flex h-full w-auto flex-col items-center justify-center gap-2 px-40">
					<XCircleIcon className="h-10 w-10 text-red-500 md:h-20 md:w-20" />
					<h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
						Browser tidak mendukung
					</h1>
					<p className="md:text-md text-center text-xs lg:text-lg">
						Mohon maaf, browser yang ada gunakan tidak mendukung fitur ini.
						<br />
						Pastikan browser anda mendukung:
					</p>
					<ul className="list-disc">
						<li>Camera</li>
						<li>Location</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default WebcamStreamCapture
