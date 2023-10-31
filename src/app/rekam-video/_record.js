'use client'

import { useRef, useState } from 'react'
import Webcam from 'react-webcam'

const Record = ({
	contentType = {},
	setBlob = () => {},
	videoConstraints = {},
	locationData = [],
	setLocationData = () => {},
}) => {
	const webCamRef = useRef(null)
	const mediaRecorderRef = useRef(null)
	const captureLocation = useRef()
	const [capturing, setCapturing] = useState(false)
	const [durationData, setDurationData] = useState({})

	const startCapture = async () => {
		mediaRecorderRef.current = new MediaRecorder(webCamRef.current.stream, {
			mimeType: contentType.type,
		})
		mediaRecorderRef.current.addEventListener(
			'dataavailable',
			handleDataAvailable
		)
		mediaRecorderRef.current.addEventListener('start', () => {
			setBlob()
			setLocationData([])
			setCapturing(true)
			setDurationData({
				start: Date.now(),
				stop: null,
				duration: '00:00:00',
			})
			captureLocation.current = setInterval(() => {
				getDuration()
				getLocation()
			}, 1000)
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
					setLocationData((prev) => [
						...prev,
						{
							microTime: Date.now(),
							latitude: position.coords.latitude,
							longitude: position.coords.longitude,
						},
					])
				},
				() => {
					console.log('Unable to retrieve your location')
				}
			)
		}
	}

	const handleDataAvailable = ({ data }) => {
		clearInterval(captureLocation.current)
		setCapturing(false)
		if (data.size > 0) {
			const blob = new Blob([data], {
				type: contentType.type,
			})
			setBlob(blob)
		}
	}

	return (
		<section className="flex h-full w-full items-center justify-center">
			<div className="relative border-2 border-c-blue">
				<Webcam
					audio={false}
					ref={webCamRef}
					videoConstraints={videoConstraints}
				/>
				<p className="float-left px-2 py-1">
					[{locationData[locationData.length - 1]?.latitude ?? '--'},
					{locationData[locationData.length - 1]?.longitude ?? '--'}]
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
			</div>
		</section>
	)
}

export default Record
