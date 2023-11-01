'use client'

import { useState, useRef, useEffect } from 'react'
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

import FramePopup from '@/app/(with-sidebar)/rekaman/[id]/_framePopup'
import EditPopup from '@/app/(with-sidebar)/rekaman/[id]/_editPopup'
import IconComponent from '@/app/components/IconComponents'
import { useQuery } from 'react-query'
import { getRoadById } from '@/utils/services/road'

import clsx from 'clsx'

const dummyData = [
	{
		id: 1,
		duration: '34',
		latitude: 'Jl Gamping',
		longitude: 'Jl Gamping',
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
			{
				id: 3,
				text: 'Video',
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
			{
				xMin: 0.3,
				yMin: 0.3,
				xMax: 0.6,
				yMax: 0.6,
				confidence: 0.8,
				class: 'large-rectangle',
				classId: 1,
			},
			{
				xMin: 0.1,
				yMin: 0.1,
				xMax: 0.4,
				yMax: 0.4,
				confidence: 0.7,
				class: 'large-rectangle',
				classId: 1,
			},
		],
	},
	{
		id: 2,
		duration: '57',
		latitude: 'Maguwoharjo',
		longitude: 'Maguwoharjo',
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
		latitude: 'Parangkritis',
		longitude: 'Parangkritis',
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
		prediction: [
			{
				xMin: 0.1,
				yMin: 0.1,
				xMax: 0.4,
				yMax: 0.4,
				confidence: 0.7,
				class: 'large-rectangle',
				classId: 1,
			},
		],
	},
	{
		id: 4,
		duration: '90',
		latitude: 'Jl Pramuka',
		longitude: 'Jl Pramuka',
		totalKerusakan: 6,
		videoData: [
			{
				id: 1,
				text: 'Video',
			},
		],
		prediction: [
			{
				xMin: 0.2,
				yMin: 0.2,
				xMax: 0.5,
				yMax: 0.5,
				confidence: 0.6,
				class: 'medium-rectangle',
				classId: 2,
			},
		],
	},
	{
		id: 5,
		duration: '111',
		latitude: 'Jl Monjali',
		longitude: 'Jl Monjali',
		totalKerusakan: 2,
		videoData: [
			{
				id: 1,
				text: 'Video',
			},
		],
		prediction: [
			{
				xMin: 0.3,
				yMin: 0.3,
				xMax: 0.6,
				yMax: 0.6,
				confidence: 0.8,
				class: 'large-rectangle',
				classId: 1,
			},
		],
	},
	{
		id: 6,
		duration: '134',
		latitude: 'Kauman',
		longitude: 'Kauman',
		totalKerusakan: 19,
		videoData: [
			{
				id: 1,
				text: 'Video',
			},
			{ id: 2, text: 'Lokasi' },
		],
		prediction: [
			{
				xMin: 0.2,
				yMin: 0.3,
				xMax: 0.7,
				yMax: 0.7,
				confidence: 0.75,
				class: 'medium-rectangle',
				classId: 2,
			},
		],
	},
	{
		id: 7,
		duration: '156',
		latitude: 'Babarsari',
		longitude: 'Babarsari',
		totalKerusakan: 5,
		videoData: [
			{
				id: 1,
				text: 'Video',
			},
			{ id: 2, text: 'Lokasi' },
		],
		prediction: [
			{
				xMin: 0.05,
				yMin: 0.05,
				xMax: 0.45,
				yMax: 0.45,
				confidence: 0.85,
				class: 'large-rectangle',
				classId: 1,
			},
		],
	},
]

const headerTableContent = [
	{ id: 1, icon: <Clock />, name: 'Durasi Video' },
	{ id: 2, icon: <AlignLeft />, name: 'Longitude' },
	{ id: 3, icon: <AlignLeft />, name: 'Latitude' },
	{ id: 4, icon: <AlertOctagon />, name: 'Total Kerusakan' },
	{ id: 5, icon: <PlaySquare />, name: 'Jenis Kerusakan' },
	{ id: 6, icon: <List />, name: 'Detail' },
]

export default function Replay({ params }) {
	const videoFile = '/example-video.mp4'
	const vidRef = useRef(null)
	const [frameDataUrl, setFrameDataUrl] = useState(null)
	const [activeFrame, setActiveFrame] = useState({
		lat: '',
		long: '',
		secs: 0,
		holes: 0,
		jenisKerusakan: [],
	})
	const [formEdit, setFormEdit] = useState(null)

	const roadId = params.id

	const {
		isLoading: roadDataIsLoading,
		isError: roadDataIsError,
		data: roadData,
		isFetching: roadDataIsFetching,
	} = useQuery({
		refetchOnWindowFocus: false,
		queryKey: ['road-by-id', roadId],
		queryFn: () => getRoadById({ id: roadId }),
	})

	const handleSeeFrameClick = (frameItem) => {
		setActiveFrame((prev) => ({
			...prev,
			lat: frameItem.latitude,
			long: frameItem.longitude,
			secs: frameItem.duration,
			holes: frameItem.totalKerusakan,
			jenisKerusakan: frameItem.videoData,
		}))

		if (vidRef.current) {
			vidRef.current.currentTime = frameItem.duration
			vidRef.current.isclick = true
			vidRef.current.activePrediction = frameItem.prediction
		}
	}

	const handleClickEdit = () => {
		setFormEdit((prev) => ({
			...prev,
			id: roadId,
			title: roadData.data.title,
			location: roadData.data.locations,
		}))
	}

	useEffect(() => {
		const handleSeeked = () => {
			if (vidRef.current.isclick) {
				const canvas = document.createElement('canvas')
				const context = canvas.getContext('2d')

				canvas.width = vidRef.current.videoWidth
				canvas.height = vidRef.current.videoHeight

				context.drawImage(vidRef.current, 0, 0, canvas.width, canvas.height)

				// Kotak
				vidRef.current.activePrediction?.forEach((element) => {
					const { xMax, xMin, yMax, yMin } = element
					const rectX = xMin * canvas.width
					const rectY = yMin * canvas.height
					const rectWidth = (xMax - xMin) * canvas.width
					const rectHeight = (yMax - yMin) * canvas.height
					context.strokeStyle = 'red'
					context.lineWidth = 3
					context.strokeRect(rectX, rectY, rectWidth, rectHeight)
				})

				const frameData = canvas.toDataURL()
				setFrameDataUrl(frameData)
				vidRef.current.isclick = false
			}
		}

		if (!!vidRef.current && !roadDataIsLoading) {
			vidRef.current.addEventListener('seeked', handleSeeked)
		}

		return () => {
			if (vidRef.current) {
				vidRef.current.removeEventListener('seeked', handleSeeked)
			}
		}
	}, [roadDataIsLoading])

	useEffect(() => {
		console.log(formEdit)
	}, [formEdit])

	const icons = [
		{
			id: 1,
			icon: <TableProperties />,
			name: 'Lihat Tabel',
			action: null,
		},
		{ id: 2, icon: <Map />, name: 'Lihat Peta', action: null },
		{ id: 3, icon: <Pencil />, name: 'Edit', action: handleClickEdit },
		{ id: 4, icon: <Trash />, name: 'Hapus', action: null },
	]

	return (
		<div className="min-h-screen w-full bg-[#fff] pt-24 text-black">
			{roadDataIsLoading || roadDataIsFetching ? (
				<p className="w-full text-center">Loading...</p>
			) : (
				<>
					<EditPopup
						formEdit={formEdit}
						onClose={() => setFormEdit()}
						handleChangeTitle={(e) =>
							setFormEdit((prev) => ({
								...prev,
								title: e.target.value,
							}))
						}
					/>
					<FramePopup
						frameDataUrl={frameDataUrl}
						onClose={() => setFrameDataUrl()}
						{...activeFrame}
					/>
					<div className="container mx-auto w-[831px]">
						<div className="w-full">
							<video
								muted
								controls
								src={videoFile}
								id="video-player"
								ref={vidRef}
								className="w-full rounded-2xl"
							/>
						</div>
						<div className="mt-12 flex w-full items-center gap-5">
							<div className="w-full px-6 py-3 text-2xl">
								{roadData?.data.title || videoFile}
							</div>
							<div className="grid w-1/2 grid-cols-4">
								{icons.map((item) => {
									return (
										<IconComponent
											icon={item.icon}
											name={item.name}
											onClick={item.action}
											key={item.id}
										/>
									)
								})}
							</div>
						</div>
					</div>
					<div className="container mx-auto py-16">
						<table className="w-full bg-white text-lg font-medium md:text-xl">
							<thead className="">
								<tr>
									{headerTableContent.map((item) => {
										return (
											<td
												className={clsx(
													'border-b py-2 text-center md:py-4',
													item !==
														headerTableContent[headerTableContent.length - 1]
														? 'border-r'
														: ''
												)}
												key={item.id}
											>
												<div className="flex items-center justify-center gap-4">
													{item.icon}
													<p>{item.name}</p>
												</div>
											</td>
										)
									})}
								</tr>
							</thead>

							<tbody>
								{dummyData?.length !== 0 ? (
									dummyData.map((item) => (
										<tr key={item.id}>
											<td className="border-r py-2 text-center md:py-4">
												{item.duration}
											</td>
											<td className="py-2 text-center md:py-4">
												{item.latitude}
											</td>
											<td className="border-r py-2 text-center md:py-4">
												{item.longitude}
											</td>
											<td className="border-r py-2 text-center md:py-4">
												{item.totalKerusakan}
											</td>
											<td className="flex gap-2 border-r px-4 py-2 text-center md:py-4">
												{item.videoData.map((data) => {
													return (
														<div
															className="rounded-lg bg-pink-300 px-2.5 py-1 text-lg"
															key={data.id}
														>
															{data.text}
														</div>
													)
												})}
											</td>
											<td className="px-3 py-2 text-center md:py-4">
												<div className="grid w-full grid-cols-1">
													<IconComponent
														onClick={() => {
															handleSeeFrameClick(item)
														}}
														icon={<Eye />}
														name="Lihat Frame"
													/>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td className="py-2 text-center text-xl italic md:py-4">
											No data found
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</>
			)}
		</div>
	)
}
