'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
	AlignLeft,
	AlertOctagon,
	PlaySquare,
	List,
	TableProperties,
	Map,
	Pencil,
	Trash,
	Clock,
	Eye,
} from 'lucide-react'

import FramePopup from '@/app/replay/_framePopup'
import IconComponent from '@/app/components/IconComponents'
import clsx from 'clsx'

export default function Replay() {
	const dummyData = [
		{
			id: 1,
			duration: '34',
			title: 'Jl Gamping',
			totalKerusakan: 13,
			videoData: [
				{
					id: 1,
					text: 'Video',
				},
				{
					id: 2,
					text: 'Lokasi',
				},
			],
			prediction: [
				{
					xMin: 0.6484375,
					yMin: 0.3375,
					xMax: 0.7203125,
					yMax: 0.371875,
					confidence: 0.5252203941345215,
					class: 'pothole',
					classId: 0,
				},
			],
		},
		{
			id: 2,
			duration: '57',
			title: 'Maguwoharjo',
			totalKerusakan: 7,
			videoData: [
				{
					id: 1,
					text: 'Video',
				},
			],
			prediction: [
				{
					xMin: 0.6484389,
					yMin: 0.3356,
					xMax: 0.7203195,
					yMax: 0.371876,
					confidence: 0.5252203941345215,
					class: 'pothole',
					classId: 0,
				},
			],
		},
		{
			id: 3,
			duration: '87',
			title: 'Parangkritis',
			totalKerusakan: 32,
			videoData: [
				{
					id: 1,
					text: 'Video',
				},
				{
					id: 2,
					text: 'Lokasi',
				},
			],
		},
		{
			id: 4,
			duration: '90',
			title: 'Jl Pramuka',
			totalKerusakan: 6,
			videoData: [
				{
					id: 1,
					text: 'Video',
				},
			],
		},
		{
			id: 5,
			duration: '111',
			title: 'Jl Monjali',
			totalKerusakan: 2,
			videoData: [
				{
					id: 1,
					text: 'Video',
				},
			],
		},
		{
			id: 6,
			duration: '134',
			title: 'Kauman',
			totalKerusakan: 19,
			videoData: [
				{
					id: 1,
					text: 'Video',
				},
				{ id: 2, text: 'Lokasi' },
			],
		},
		{
			id: 7,
			duration: '156',
			title: 'Babarsari',
			totalKerusakan: 5,
			videoData: [
				{
					id: 1,
					text: 'Video',
				},
				{ id: 2, text: 'Lokasi' },
			],
		},
	]

	const saveVideo = () => {
		setIsSaved(true)
	}

	const icons = [
		{ icon: <TableProperties />, name: 'Lihat Tabel' },
		{ icon: <Map />, name: 'Lihat Peta' },
		{ icon: <Pencil />, name: 'Edit' },
		{ icon: <Trash />, name: 'Hapus' },
	]

	const iconsDetail = [{ icon: <Eye />, name: 'Lihat Frame' }]

	const videoFile = 'example-video.mp4'
	const vidRef = useRef(null)
	const [activeTimestamp, setActiveTimestamp] = useState(0)
	const [frameDataUrl, setFrameDataUrl] = useState(null)
	const [showPopup, setShowPopup] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	const [activeBox, setActiveBox] = useState()

	useEffect(() => {
		console.log(activeBox)
	}, [activeBox])

	const handleSeeFrameClick = (duration) => {
		const video = vidRef.current

		if (video) {
			video.currentTime = duration
			setActiveTimestamp(duration)
		}
	}

	useEffect(() => {
		let video

		const handleSeeked = (activePrediction) => {
			console.log(activePrediction)
			const canvas = document.createElement('canvas')
			const context = canvas.getContext('2d')

			canvas.width = video.videoWidth
			canvas.height = video.videoHeight

			context.drawImage(video, 0, 0, canvas.width, canvas.height)

			// Kotak
			if (!!activePrediction) {
				const { xMax, xMin, yMax, yMin } = activePrediction
				const rectX = xMin * canvas.width
				const rectY = yMin * canvas.height
				const rectWidth = (xMax - xMin) * canvas.width
				const rectHeight = (yMax - yMin) * canvas.height
				context.strokeStyle = 'red'
				context.strokeRect(rectX, rectY, rectWidth, rectHeight)
			} else {
				console.log(activePrediction)
			}

			const frameData = canvas.toDataURL()
			setFrameDataUrl(frameData)
			console.log(frameData)
		}

		if (!!vidRef.current) {
			video = vidRef.current
			vidRef.current.addEventListener('seeked', () => handleSeeked(activeBox))
		}

		return () => {
			if (video) {
				video.removeEventListener('seeked', () => handleSeeked(activeBox))
			}
		}
	}, [activeBox])

	useEffect(() => {
		if (frameDataUrl !== null) {
			setShowPopup(true)
		}
	}, [frameDataUrl])

	return (
		<div className="min-h-screen w-full bg-[#fff] pt-24 text-2xl text-black">
			<FramePopup
				frameDataUrl={frameDataUrl}
				onClose={() => setShowPopup(false)}
				className={clsx(showPopup ? null : 'hidden')}
			/>
			<div className="container mx-auto w-[831px]">
				<div className="w-full">
					<video
						muted
						controls
						src={videoFile}
						id="video-player"
						ref={vidRef}
						className="rounded-2xl"
					/>
				</div>
				<div className="mt-12 flex w-full items-center gap-5">
					{isSaved ? (
						<>
							<div className="w-full px-6 py-3">{videoFile}</div>
							<div className="grid w-1/2 grid-cols-4">
								{icons.map((item, index) => {
									return (
										<IconComponent
											icon={item.icon}
											name={item.name}
											key={index}
										/>
									)
								})}
							</div>
						</>
					) : (
						<>
							<div className="w-full rounded-full border border-slate-300 px-6 py-3">
								{videoFile}
							</div>
							<div
								className="w-1/8 cursor-pointer rounded-full border border-[#FDC403] px-4 py-1 text-[#292E66]"
								onClick={saveVideo}
							>
								Simpan
							</div>
						</>
					)}
				</div>
			</div>

			{isSaved ? (
				<>
					<div className="container mx-auto px-32 py-16">
						<table className="w-full bg-white text-lg font-medium md:text-xl">
							<thead className="">
								<tr>
									<td className="border-b border-r py-2 text-center md:py-4">
										<div className="flex items-center justify-center gap-4">
											<Clock />
											<p>Durasi Video</p>
										</div>
									</td>
									<td className="border-b border-r px-3 py-2 text-center md:py-4">
										<div className="flex items-center justify-center gap-4">
											<AlignLeft />
											<p>Longitude</p>
										</div>
									</td>
									<td className="border-b border-r px-3 py-2 text-center md:py-4">
										<div className="flex items-center justify-center gap-4">
											<AlignLeft />
											<p>Latitude</p>
										</div>
									</td>
									<td className="border-b border-r px-3 py-2 text-center md:py-4">
										<div className="flex items-center justify-center gap-4">
											<AlertOctagon />
											<p>Total Kerusakan</p>
										</div>
									</td>
									<td className="border-b border-r px-3 py-2 text-center md:py-4">
										<div className="flex items-center justify-center gap-4">
											<PlaySquare />
											<p>Data Video</p>
										</div>
									</td>
									<td className="border-b px-3 py-2 text-center md:py-4">
										<div className="flex items-center justify-center gap-4">
											<List />
											<p>Detail</p>
										</div>
									</td>
								</tr>
							</thead>

							<tbody>
								{dummyData?.length !== 0 ? (
									dummyData.map((item, index) => (
										<tr key={index}>
											<td className="border-r py-2 text-center md:py-4">
												{item.duration}
											</td>
											<td className="py-2 text-center md:py-4">{item.title}</td>
											<td className="border-r py-2 text-center md:py-4">
												{item.title}
											</td>
											<td className="border-r py-2 text-center md:py-4">
												{item.totalKerusakan}
											</td>
											<td className="flex gap-2 border-r px-4 py-2 text-center md:py-4">
												{item.videoData.map((data, index) => {
													return (
														<div
															className="rounded-lg bg-pink-300 px-2.5 py-1 text-lg"
															key={index}
														>
															{data.text}
														</div>
													)
												})}
											</td>
											<td className="px-3 py-2 text-center md:py-4">
												<div className="grid w-full grid-cols-1">
													{iconsDetail.map((iconDetail, index) => {
														return (
															<IconComponent
																onClick={() => {
																	setActiveBox(...item.prediction)
																	handleSeeFrameClick(item.duration)
																}}
																icon={iconDetail.icon}
																name={iconDetail.name}
																key={index}
															/>
														)
													})}
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td className="py-2 text-center text-2xl italic md:py-4">
											No data found
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</>
			) : null}
		</div>
	)
}
