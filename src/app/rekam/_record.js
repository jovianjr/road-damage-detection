'use client'

import { useRef, useState } from 'react'
import Webcam from 'react-webcam'

const Record = ({ setBlobUrl = () => {}, videoConstraints = {} }) => {
	const webCamRef = useRef(null)
	const mediaRecorderRef = useRef(null)
	const captureLocation = useRef()
	const [capturing, setCapturing] = useState(false)
	const [recordedChunks, setRecordedChunks] = useState([])
	const [locationData, setLocationdata] = useState([])
	const [durationData, setDurationData] = useState({})

	const startCapture = async () => {
		setLocationdata([])
		setRecordedChunks([])
		setCapturing(true)

		let mediaChunks = []

		mediaRecorderRef.current = new MediaRecorder(webCamRef.current.stream, {
			mimeType: 'video/webm',
		})
		mediaRecorderRef.current.addEventListener('dataavailable', ({ data }) => {
			mediaChunks.push(data)
		})

		mediaRecorderRef.current.addEventListener('start', () => {
			setBlobUrl()
			setLocationdata([])
			setDurationData({
				start: Date.now(),
				stop: null,
				duration: '00:00:00',
			})

			console.log(':stttartt')
			captureLocation.current = setInterval(() => {
				getDuration()
				getLocation()
			}, 1000)
		})

		mediaRecorderRef.current.addEventListener('stop', () => {
			clearInterval(captureLocation.current)
			setCapturing(false)
			if (mediaChunks.length) {
				const blob = new Blob(mediaChunks, {
					type: 'video/webm',
				})
				const url = URL.createObjectURL(blob)
				setBlobUrl(url)
				mediaChunks = []
			}
		})

		mediaRecorderRef.current.start()
	}

	const getDuration = () => {
		setDurationData((prev) => {
			const durationTime = Date.now() - prev.start

			const formatTime = (time) => String(time).padStart(2, '0')
			const seconds = formatTime(Math.floor(durationTime / 1000) % 60)
			const minutes = formatTime(Math.floor(durationTime / (1000 * 60)) % 60)
			const hours = formatTime(Math.floor(durationTime / (1000 * 60 * 60)) % 24)

			return {
				...prev,
				duration: `${hours}:${minutes}:${seconds}`,
			}
		})
	}

	const getLocation = () => {
		if (!navigator.geolocation) {
			alert('Geolocation is not supported by your browser')
		} else {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocationdata((prev) => [
						...prev,
						{
							lat: position.coords.latitude,
							long: position.coords.longitude,
						},
					])
				},
				() => {
					console.log('Unable to retrieve your location')
				}
			)
		}
	}

	return (
		<section className="flex h-full w-full items-center justify-center">
			<div className="border-c-blue relative border-2">
				<Webcam
					audio={false}
					ref={webCamRef}
					videoConstraints={videoConstraints}
				/>
				<p className="float-left px-2 py-1">
					[{locationData[locationData.length - 1]?.lat ?? '--'},
					{locationData[locationData.length - 1]?.long ?? '--'}]
				</p>
				<p className="float-right px-2 py-1">
					{durationData?.duration ?? '--:--:--'}
				</p>
			</div>
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2">
				{capturing ? (
					<button
						className="rounded-full bg-white px-4 py-2 transition-all hover:bg-slate-500 hover:text-white"
						onClick={() => mediaRecorderRef.current.stop()}
					>
						Stop Capture
					</button>
				) : (
					<button
						className="rounded-full bg-white px-4 py-2 transition-all hover:bg-slate-500 hover:text-white"
						onClick={startCapture}
					>
						Start Capture
					</button>
				)}
				{recordedChunks.length > 0 && (
					<button onClick={handleDownload}>Download</button>
				)}
			</div>
		</section>
	)
}

export default Record
