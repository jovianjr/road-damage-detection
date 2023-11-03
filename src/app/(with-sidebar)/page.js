'use client'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { ChevronDown, Settings, XIcon } from 'lucide-react'

import { useQuery } from 'react-query'
import { getAllRoad } from '@/utils/services/road'

const Map = dynamic(() => import('@/app/(with-sidebar)/_map'), { ssr: false })

const data = [
	{
		id: 'no-1',
		name: 'Jawa Barat',
		status: 1,
		data: [
			{
				id: 'no-1-1',
				name: 'Jawa Barat 1',
				status: 1,
				location: [-7.04, 107.47],
			},
			{
				id: 'no-1-2',
				name: 'Jawa Barat 2',
				status: 1,
				location: [-7.44, 108.47],
			},
			{
				id: 'no-1-3',
				name: 'Jawa Barat 3',
				status: 0,
				location: [-7.34, 107.47],
			},
			{
				id: 'no-1-4',
				name: 'Jawa Barat 4',
				status: 1,
				location: [-7.24, 108.47],
			},
		],
	},
	{
		id: 'no-2',
		status: 0,
		name: 'DI Yogyakarta',
		data: [
			{
				id: 'no-2-1',
				name: 'DI Yogyakarta 1',
				status: 1,
				location: [-7.74, 110.47],
			},
			{
				id: 'no-2-2',
				name: 'DI Yogyakarta 2',
				status: 1,
				location: [-7.84, 110.07],
			},
		],
	},
	{
		id: 'no-3',
		status: 0,
		name: 'Kalimantan Timur',
		data: [
			{
				id: 'no-3-1',
				name: 'Kalimantan Timur 1',
				status: 1,
				location: [-1.54, 112.47],
			},
			{
				id: 'no-3-2',
				name: 'Kalimantan Timur 2',
				status: 0,
				location: [-1, 117],
			},
			{
				id: 'no-3-3',
				name: 'Kalimantan Timur 3',
				status: 0,
				location: [-0.8, 117.25],
			},
			{
				id: 'no-3-4',
				name: 'Kalimantan Timur 4',
				status: 1,
				location: [-1.54, 110.47],
			},
			{
				id: 'no-3-5',
				name: 'Kalimantan Timur 5',
				status: 1,
				location: [-1.74, 115.47],
			},
			{
				id: 'no-3-6',
				name: 'Kalimantan Timur 6',
				status: 0,
				location: [-1.74, 110.47],
			},
		],
	},
]

export default function Home() {
	const [showPanel, setShowPanel] = useState(false)
	const [currentData, setCurrentData] = useState(data)

	const { isLoading: mapDataIsLoading, isFetching: mapDataIsFetching } =
		useQuery({
			refetchOnWindowFocus: false,
			queryKey: ['all-map-data'],
			queryFn: () =>
				getAllRoad({
					locations: 1,
					detection: 1,
				}),
			onSuccess: (res) => {
				const arrayLocation = []
				res.data.forEach((data) => {
					const dataKerusakan = []
					data.detections.forEach((detection) => {
						if (!detection.location) return

						detection.predictions.forEach((predict) => {
							let foundKerusakan = dataKerusakan.find(
								(o) => o.name === predict.class
							)
							if (!foundKerusakan) {
								dataKerusakan.push({
									id: detection._id,
									name: predict.class,
									data: [],
									status: 0,
								})
							} else {
								let foundlocation = foundKerusakan.data.find(
									(o) =>
										o.latitude === detection.location.latitude &&
										o.longitude === detection.location.longitude
								)
								if (!foundlocation) foundKerusakan.data.push(detection.location)
							}
						})
					})

					if (dataKerusakan.length > 0) {
						arrayLocation.push({
							id: data._id,
							name: data.title,
							status: 0,
							data: dataKerusakan,
						})
					}
				})
				setCurrentData(arrayLocation)
			},
		})

	return (
		<main className="relative flex h-screen min-h-screen items-center justify-between">
			<Settings
				className={clsx(
					'absolute left-4 top-4 z-20 h-10 w-10 cursor-pointer rounded-full bg-white p-2 transition-all hover:bg-slate-100',
					showPanel ? 'opacity-0' : 'opacity-100'
				)}
				onClick={() => setShowPanel((prev) => !prev)}
			/>
			<div
				className={clsx(
					'relative flex h-full flex-col gap-6 bg-white transition-all',
					showPanel ? 'w-[22svw] px-6 py-12 opacity-100' : 'w-0 p-0 opacity-0'
				)}
			>
				<div
					className={clsx(
						'absolute right-2 top-2 z-20 h-fit w-fit cursor-pointer rounded-full bg-white p-2 transition-all hover:bg-slate-100'
					)}
					onClick={() => setShowPanel((prev) => !prev)}
				>
					<XIcon />
				</div>
				<h1 className="pl pr-4 text-xl font-semibold">Pengaturan Label</h1>
				<div className="max-h-full overflow-y-auto pr-4">
					<div className="flex flex-col gap-4">
						{mapDataIsLoading || mapDataIsFetching ? (
							<div className="flex flex-col gap-4">
								{Array(10)
									.fill()
									.map((_, index) => (
										<div
											className="h-[48px] w-full animate-pulse rounded-lg bg-slate-300"
											key={index}
										></div>
									))}
							</div>
						) : (
							<>
								{currentData.map((val, idx) => (
									<LocationCard
										location={val}
										setCurrentData={setCurrentData}
										key={val.id}
										index={idx}
									/>
								))}
							</>
						)}
					</div>
				</div>
			</div>
			<div className="h-full flex-grow bg-white">
				{mapDataIsLoading || mapDataIsFetching ? (
					<div className="h-screen w-full animate-pulse bg-slate-300 text-center">
						<p className="pt-24 font-semibold">Memuat peta, harap tunggu...</p>
					</div>
				) : (
					<>
						<Map locationData={currentData} />
					</>
				)}
			</div>
		</main>
	)
}

const LocationCard = ({
	location = {},
	setCurrentData = () => {},
	index = 0,
}) => {
	const [expand, setExpand] = useState(false)

	const setLocationStatus = () => {
		setCurrentData((prev) => {
			let prevData = [...prev]
			prevData[index] = {
				...prevData[index],
				status: !location.status ? 1 : 0,
			}
			return prevData
		})
	}

	const setLocationDetailStatus = (idx) => {
		setCurrentData((prev) => {
			let prevData = [...prev]
			prevData[index] = {
				...prev[index],
				data: prev[index].data.map((item, currentIdx) => {
					if (currentIdx === idx) {
						return {
							...item,
							status: !item.status ? 1 : 0,
						}
					}
					return item
				}),
			}
			return prevData
		})
	}

	return (
		<div className="flex flex-col overflow-hidden">
			<div
				className={clsx(
					'flex w-full cursor-pointer items-center gap-2 border border-c-blue px-2 py-2 transition-all hover:bg-slate-100',
					expand ? 'rounded-t-lg' : 'rounded-lg '
				)}
				onClick={() => setExpand((prev) => !prev)}
			>
				<div className="flex h-full w-1/5 items-center">
					<label className="relative flex cursor-pointer items-center gap-2">
						<input
							type="checkbox"
							className="peer sr-only"
							checked={location.status}
							onChange={setLocationStatus}
						/>
						<div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
					</label>
				</div>
				<span className="line-clamp-2 w-3/5 flex-grow text-xs md:text-sm lg:text-base">
					{location.name}
				</span>
				<span className="w-1/5">
					<ChevronDown
						className={clsx('transition-all', expand ? 'rotate-180' : '')}
					/>
				</span>
			</div>
			<div
				style={{ height: expand ? location.data.length * 2 + 'rem' : 0 }}
				className={clsx(
					'flex flex-col overflow-hidden rounded-b transition-all ',
					expand ? 'border-x border-b border-c-blue py-1' : ''
				)}
			>
				{location.data.map((val, idx) => {
					return (
						<label
							key={val.id}
							className="flex h-8 cursor-pointer items-center gap-2 px-2 hover:bg-slate-100"
						>
							<span className="flex-grow"> {val.name}</span>
							<input
								type="checkbox"
								checked={val.status ? 1 : 0}
								onChange={() => setLocationDetailStatus(idx)}
							/>
						</label>
					)
				})}
			</div>
		</div>
	)
}
