'use client'

import { useState, useRef, useEffect } from 'react'
import { useQuery } from 'react-query'
import clsx from 'clsx'

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
	FileDown,
} from 'lucide-react'
import { Tooltip } from 'react-tooltip'

import FramePopup from '@/app/(with-sidebar)/rekaman/[id]/_framePopup'
import EditPopup from '@/app/(with-sidebar)/rekaman/[id]/_editPopup'
import DeletePopup from '@/app/(with-sidebar)/rekaman/[id]/_deletePopup'
import MapSection from '@/app/(with-sidebar)/rekaman/[id]//_mapSection'
import IconComponent from '@/app/components/IconComponents'
import { getRoadById, getSingleRoadCsv } from '@/utils/services/road'

import formatVideoTime from '@/utils/helpers/formatVideoTime'
import Link from 'next/link'

const headerTableContent = [
	{ id: 1, icon: <Clock />, name: 'Durasi Video' },
	{ id: 2, icon: <AlignLeft />, name: 'Longitude' },
	{ id: 3, icon: <AlignLeft />, name: 'Latitude' },
	{ id: 4, icon: <AlertOctagon />, name: 'Total Kerusakan' },
	{ id: 5, icon: <PlaySquare />, name: 'Jenis Kerusakan' },
	{ id: 6, icon: <List />, name: 'Detail' },
]

export default function Replay({ params }) {
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
	const [isDeleting, setIsDeleting] = useState(false)
	const [holeType, setHoleType] = useState('all')
	const [filteredData, setFilteredData] = useState()
	const [mapData, setMapData] = useState()

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
			lat: frameItem?.location?.latitude,
			long: frameItem?.location?.longitude,
			secs: frameItem.time,
			holes: frameItem.predictions.length,
			jenisKerusakan: frameItem.predictions,
		}))

		if (vidRef.current) {
			vidRef.current.currentTime = frameItem.time.toFixed(2) ?? 0
			vidRef.current.isclick = true
			vidRef.current.activePrediction = frameItem.predictions
		}
	}

	useEffect(() => {
		const dataPeta = []
		roadData?.data.detections?.forEach((detection) => {
			if (!detection.location) return
			dataPeta.push({
				id: detection._id,
				latitude: detection.location.latitude,
				longitude: detection.location.longitude,
				data: detection.predictions,
			})
		})

		if (dataPeta.length > 0) setMapData(dataPeta)
	}, [roadData])

	const handleClickEdit = () => {
		setFormEdit((prev) => ({
			...prev,
			id: roadId,
			title: roadData?.data.title,
			location: roadData?.data.locations,
		}))
	}

	const handleClickDelete = () => {
		setIsDeleting(true)
	}

	const handleClickSection = (section) => {
		document.getElementById(section).scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
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
					context.lineWidth = 5
					context.strokeRect(rectX, rectY, rectWidth, rectHeight)
				})

				if (canvas) {
					const frameData = canvas.toDataURL()
					setFrameDataUrl(frameData)
				}
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
		const filteredDetections = roadData?.data.detections?.filter((item) => {
			return holeType === 'all'
				? true
				: item.predictions.some((prediction) => prediction.class === holeType)
		})
		setFilteredData(filteredDetections)
	}, [roadDataIsLoading, holeType])

	const handleDownloadCsv = async (roadId, roadName) => {
		const response = await getSingleRoadCsv({ id: roadId })
		if (response) {
			const dataCsv = `data:text/csv;charset=utf-8,${response}`
			const encodedURI = encodeURI(dataCsv)
			const csvEl = document.createElement('a')
			document.body.appendChild(csvEl)
			csvEl.style = 'display: none'
			csvEl.href = encodedURI
			csvEl.download = `RDD-${roadName}.csv`
			csvEl.click()
		}
	}

	const icons = [
		{
			id: 1,
			icon: <TableProperties />,
			name: 'Lihat Tabel',
			action: () => handleClickSection('table-kerusakan'),
		},
		{
			id: 2,
			icon: <Map />,
			name: 'Lihat Peta',
			action: () => handleClickSection('peta-kerusakan'),
		},
		{ id: 3, icon: <Pencil />, name: 'Edit', action: handleClickEdit },
		{ id: 4, icon: <Trash />, name: 'Hapus', action: handleClickDelete },
		{
			id: 5,
			icon: <FileDown />,
			name: 'Unduh CSV',
			action: () => handleDownloadCsv(roadData.data._id, roadData.data.title),
		},
	]

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#fff] pt-8 text-black md:pt-24">
			{roadDataIsLoading || roadDataIsFetching ? (
				<>
					<div className="container mx-auto max-md:px-2 md:w-[831px]">
						<div className="h-[500px] w-full animate-pulse rounded-lg bg-slate-300 md:rounded-2xl"></div>
						<div className="mt-12 flex w-full items-center gap-5">
							<div className="h-[24px] w-full animate-pulse rounded-lg bg-slate-300 px-6 py-3 text-2xl"></div>
							<div className="grid w-1/2 grid-cols-5">
								{icons.map((item) => {
									return (
										<div
											className="aspect-square h-[24px] animate-pulse rounded-lg bg-slate-300"
											key={item.id}
										></div>
									)
								})}
							</div>
						</div>
					</div>
					<div className="container mx-auto pt-10">
						<div className="w-full overflow-x-auto max-md:px-4">
							<table className="w-full bg-white text-lg font-medium max-md:text-sm">
								<thead>
									<tr>
										{headerTableContent.map((item) => (
											<td
												className={clsx(
													'border-b py-2 text-center max-md:px-2 md:py-4',
													item !==
														headerTableContent[headerTableContent.length - 1]
														? 'border-r'
														: ''
												)}
												key={item.id}
											>
												{item.name !== 'Jenis Kerusakan' ? (
													<div className="flex items-center justify-center gap-4">
														{item.icon}
														<p>{item.name}</p>
													</div>
												) : (
													<div className="flex items-center justify-center gap-4">
														{item.icon}
														<select
															value={holeType}
															onChange={(event) => {
																setHoleType(event.target.value)
															}}
														>
															<option value="all">{item.name} (Semua)</option>
															<option value="pothole">Pothole</option>
															<option value="alligator cracking">
																Alligator Cracking
															</option>
															<option value="longitudinal cracking">
																Longitudinal Cracking
															</option>
															<option value="lateral cracking">
																Lateral Cracking
															</option>
														</select>
													</div>
												)}
											</td>
										))}
									</tr>
								</thead>

								<tbody>
									{Array(10)
										.fill()
										.map((_, id) => (
											<tr key={id}>
												{headerTableContent.map((item) => (
													<td key={item.id}>
														<div className="m-2 h-[48px] animate-pulse rounded-lg bg-slate-300 p-2"></div>
													</td>
												))}
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</>
			) : roadData?.data ? (
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
					<DeletePopup
						isDeleting={isDeleting}
						idData={roadData.data._id}
						titleData={roadData.data.title}
						onClose={() => setIsDeleting(false)}
					/>
					<FramePopup
						frameDataUrl={frameDataUrl}
						onClose={() => setFrameDataUrl()}
						{...activeFrame}
					/>
					<div className="container mx-auto max-md:px-2 md:w-[831px]">
						<div className="w-full">
							<video
								muted
								controls
								src={roadData.data.videoUrl}
								id="video-player"
								ref={vidRef}
								className="w-full rounded-lg md:rounded-2xl"
								crossOrigin="anonymous"
							/>
						</div>
						<div className="mt-2 flex w-full items-start gap-5 md:mt-12">
							<div className="w-full px-2 text-lg md:px-6 md:text-xl">
								{roadData?.data.title}
								{roadData?.data.detectionMeta.status === 'processing' ? (
									<p className="pt-2 text-sm text-red-500">
										Sedang proses deteksi
									</p>
								) : null}
							</div>
							<div className="grid w-2/3 grid-cols-5 max-md:gap-4 max-md:pr-2">
								{icons.map((item) => {
									if (item.name === 'Unduh CSV') {
										{
											if (roadData.data.locations?.length > 0) {
												return (
													<IconComponent
														icon={item.icon}
														name={item.name}
														onClick={item.action}
														key={item.id}
													/>
												)
											}
										}
									} else {
										return (
											<IconComponent
												icon={item.icon}
												name={item.name}
												onClick={item.action}
												key={item.id}
											/>
										)
									}
								})}
							</div>
						</div>
					</div>

					<div className="container mx-auto py-8 md:py-16">
						<div
							className="w-full overflow-x-auto max-md:px-4 md:max-h-screen"
							id="table-kerusakan"
						>
							<table className="w-full bg-white text-lg font-medium max-md:text-sm">
								<thead className="md:sticky md:top-0 md:bg-white">
									<tr>
										{headerTableContent.map((item) =>
											item.name !== 'Jenis Kerusakan' ? (
												<td
													className={clsx(
														'border-b py-2 text-center max-md:px-2 md:py-4',
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
											) : (
												<td
													className="border-b border-r py-2 text-center md:py-4"
													key={item.id}
												>
													<div className="flex items-center justify-center gap-4">
														{item.icon}
														<select
															value={holeType}
															onChange={(event) => {
																setHoleType(event.target.value)
															}}
														>
															<option value="all">{item.name} (Semua)</option>
															<option value="pothole">Pothole</option>
															<option value="alligator cracking">
																Alligator Cracking
															</option>
															<option value="longitudinal cracking">
																Longitudinal Cracking
															</option>
															<option value="lateral cracking">
																Lateral Cracking
															</option>
														</select>
													</div>
												</td>
											)
										)}
									</tr>
								</thead>

								<tbody>
									{filteredData?.length !== 0 ? (
										filteredData?.map((item) => {
											const jenisKerusakan = []

											item.predictions.forEach((predict) => {
												const foundKerusakan = jenisKerusakan.find(
													(o) => o.name === predict.class
												)

												if (foundKerusakan) {
													foundKerusakan.count += 1
												} else {
													jenisKerusakan.push({
														id: predict.classId,
														name: predict.class,
														count: 1,
													})
												}
											})

											return (
												<tr key={item._id}>
													<td className="border-r py-2 text-center md:py-4">
														{formatVideoTime(item.time)}
													</td>
													<td className="border-r py-2 text-center md:py-4">
														{item.location?.latitude.toFixed(8)}
													</td>
													<td className="border-r py-2 text-center md:py-4">
														{item.location?.longitude.toFixed(8)}
													</td>
													<td className="border-r py-2 text-center md:py-4">
														{item.predictions.length}
													</td>
													<td className="flex gap-2 border-r px-4 py-2 text-center md:py-4">
														{jenisKerusakan.map((data) => {
															return (
																<div
																	className={clsx(
																		'rounded-lg px-2.5 py-1 text-lg max-md:text-sm',
																		data.name === 'pothole'
																			? 'bg-pink-300'
																			: data.name === 'longitudinal cracking'
																			? 'bg-green-300'
																			: data.name === 'lateral cracking'
																			? 'bg-blue-300'
																			: 'bg-yellow-300'
																	)}
																	key={data.id}
																>
																	{data.name}
																	{data.count !== 1 ? ` (${data.count})` : ''}
																</div>
															)
														})}
													</td>
													<td className="px-3 py-2 text-center md:py-4">
														<div className="grid w-full grid-cols-1">
															<IconComponent
																id="icon-tooltip-table"
																onClick={() => {
																	handleSeeFrameClick(item)
																}}
																icon={<Eye size={18} />}
																name="Lihat Frame"
															/>
														</div>
													</td>
												</tr>
											)
										})
									) : (
										<tr>
											<td
												colSpan={7}
												className="py-4 text-center text-xl font-normal italic md:py-4"
											>
												Tidak ada data ditemukan
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>

					{mapData ? (
						<div
							className="container mx-auto rounded-xl py-8 md:py-16"
							id="peta-kerusakan"
						>
							<MapSection locationData={mapData} />
						</div>
					) : null}
				</>
			) : (
				<div className="flex h-full w-full flex-col items-center justify-center gap-4 text-base md:text-lg">
					Tidak ada data ditemukan
					<Link href="/rekaman">
						<button className="rounded-lg bg-c-yellow px-4 py-2 transition-all hover:bg-c-yellow/70">
							Kembali
						</button>
					</Link>
				</div>
			)}
			<Tooltip
				id="icon-tooltip"
				place="bottom"
				style={{
					backgroundColor: '#E0E0E0',
					color: '#222222',
					borderRadius: '8px',
					fontSize: '16px',
					padding: '4px 12px',
				}}
				noArrow
				className="max-md:hidden"
			/>
			<Tooltip
				id="icon-tooltip-table"
				place="bottom"
				style={{
					backgroundColor: '#E0E0E0',
					color: '#222222',
					borderRadius: '8px',
					fontSize: '16px',
					padding: '4px 12px',
				}}
				noArrow
				className="max-md:hidden"
			/>
		</div>
	)
}
