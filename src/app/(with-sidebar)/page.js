'use client'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { ChevronDown, Settings, XIcon } from 'lucide-react'

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
			},
			{
				id: 'no-1-2',
				name: 'Jawa Barat 2',
				status: 0,
			},
			{
				id: 'no-1-3',
				name: 'Jawa Barat 3',
				status: 0,
			},
			{
				id: 'no-1-4',
				name: 'Jawa Barat 4',
				status: 1,
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
				name: 'Jawa Barat 1',
				status: 1,
			},
			{
				id: 'no-2-2',
				name: 'Jawa Barat 2',
				status: 1,
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
			},
			{
				id: 'no-3-2',
				name: 'Kalimantan Timur 2',
				status: 0,
			},
			{
				id: 'no-3-3',
				name: 'Kalimantan Timur 3',
				status: 0,
			},
			{
				id: 'no-3-4',
				name: 'Kalimantan Timur 4',
				status: 0,
			},
			{
				id: 'no-3-5',
				name: 'Kalimantan Timur 5',
				status: 0,
			},
			{
				id: 'no-3-6',
				name: 'Kalimantan Timur 6',
				status: 0,
			},
		],
	},
]

export default function Home() {
	const [showPanel, setShowPanel] = useState(false)
	const [currentData, setCurrentData] = useState(data)

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
					showPanel ? 'w-[20svw] px-6 py-12 opacity-100' : 'w-0 p-0 opacity-0'
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
				<h1 className="text-xl font-semibold">Pengaturan Label</h1>
				<div className="flex flex-col gap-4">
					{currentData.map((val, idx) => (
						<LocationCard
							location={val}
							setCurrentData={setCurrentData}
							key={val.id}
							index={idx}
						/>
					))}
				</div>
			</div>
			<div className="h-full flex-grow bg-white">
				<Map />
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
					'flex w-full cursor-pointer gap-2 border border-c-blue px-2 py-2 transition-all hover:bg-slate-100',
					expand ? 'rounded-t-lg' : 'rounded-lg '
				)}
				onClick={() => setExpand((prev) => !prev)}
			>
				<label className="relative flex w-1/4 cursor-pointer items-center gap-2">
					<input
						type="checkbox"
						className="peer sr-only"
						checked={location.status}
						onChange={setLocationStatus}
					/>
					<div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
				</label>
				<span className="line-clamp-1 flex-grow">{location.name}</span>
				<span className="">
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
