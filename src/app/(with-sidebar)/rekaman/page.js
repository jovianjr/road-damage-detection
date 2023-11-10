'use client'

import Link from 'next/link'
import clsx from 'clsx'
import {
	Calendar,
	AlignLeft,
	AlertOctagon,
	PlaySquare,
	List,
	Fullscreen,
	FileDown,
	Download,
} from 'lucide-react'
import { useQuery } from 'react-query'
import { Tooltip } from 'react-tooltip'

import IconComponent from '@/app/components/IconComponents'
import {
	getAllRoad,
	getAllRoadCsv,
	getSingleRoadCsv,
} from '@/utils/services/road'

const headerTableContent = [
	{ id: 1, icon: <Calendar />, name: 'Tanggal' },
	{ id: 2, icon: <AlignLeft />, name: 'Judul' },
	{ id: 4, icon: <AlertOctagon />, name: 'Total Kerusakan' },
	{ id: 5, icon: <PlaySquare />, name: 'Data Video' },
	{ id: 6, icon: <List />, name: 'Detail' },
]

const convertTime = (inputTimestamp) => {
	const date = new Date(inputTimestamp)
	const monthName = [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember',
	]
	const day = date.getDate()
	const month = monthName[date.getMonth()]
	const year = date.getFullYear()

	const formattedTime = `${day} ${month} ${year}`
	return formattedTime
}

export default function DaftarRekaman() {
	const {
		isLoading: roadListIsLoading,
		isError: roadListIsError,
		data: roadList,
		isFetching: roadListIsFetching,
	} = useQuery({
		refetchOnWindowFocus: false,
		queryKey: ['all-road'],
		queryFn: () =>
			getAllRoad({
				locations: 1,
			}),
	})

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

	const handleDownloadAllCsv = async () => {
		const response = await getAllRoadCsv()
		if (response) {
			const dataCsv = `data:text/csv;charset=utf-8,${response}`
			const encodedURI = encodeURI(dataCsv)
			const csvEl = document.createElement('a')
			document.body.appendChild(csvEl)
			csvEl.style = 'display: none'
			csvEl.href = encodedURI
			csvEl.download = `RDD - Kerusakan Jalan.csv`
			csvEl.click()
		}
	}

	return (
		<>
			<div className="mt-4 flex min-h-screen w-full flex-col items-center justify-start bg-[#fff] text-black md:mt-16">
				<div className="mb-2 flex w-full items-center justify-between gap-4 max-md:px-4 md:mb-8 md:w-3/4 ">
					<h1 className="text-left text-xl font-semibold md:text-2xl">
						Daftar Rekaman
					</h1>

					<IconComponent
						icon={
							<button
								className="flex gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm shadow-md lg:text-base"
								onClick={handleDownloadAllCsv}
							>
								Unduh Semua
								<Download />
							</button>
						}
						name="Unduh CSV Keseluruhan"
						className="flex gap-2"
					/>
				</div>

				{roadListIsLoading || roadListIsFetching ? (
					<>
						<div className="container mx-auto">
							<div className="flex justify-center max-md:hidden">
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
													<div className="flex items-center justify-center gap-4">
														{item.icon}
														<p>{item.name}</p>
													</div>
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

						<div className="mt-8 flex w-full flex-col gap-4 px-4 md:hidden">
							{Array(10)
								.fill()
								.map((_, id) => (
									<div
										key={id}
										className="m-2 h-24 animate-pulse rounded-lg bg-slate-300 p-2"
									></div>
								))}
						</div>
					</>
				) : (
					<>
						<table className="w-3/4 bg-white text-lg font-medium max-md:hidden">
							<thead>
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
								{roadList?.data !== 0 ? (
									roadList?.data?.map((item, index) => (
										<tr key={index}>
											<td className="border-r py-2 text-center md:py-4">
												{convertTime(item.createdAt)}
											</td>
											<td className="border-r py-2 text-center md:py-4">
												{item.title}
											</td>
											<td className="border-r py-2 text-center md:py-4">
												{item.detectionMeta.status === 'processing' ? (
													<p className="text-base text-black/20">
														sedang proses
													</p>
												) : (
													item.detectionMeta.totalDamage ?? 0
												)}
											</td>
											<td className="flex gap-2 border-r px-4 py-2 text-center md:py-4">
												<div
													className="rounded-lg bg-pink-300 px-2.5 py-1 text-xl"
													key={index}
												>
													Video
												</div>
												{item.locations?.length > 0 ? (
													<div
														className="rounded-lg bg-yellow-300 px-2.5 py-1 text-xl"
														key={index}
													>
														Lokasi
													</div>
												) : null}
											</td>
											<td className="px-3 py-2 text-center md:py-4">
												<div className="grid w-full grid-cols-2">
													<Link
														href={`/rekaman/${item._id}`}
														className="cursor-pointer"
													>
														<IconComponent
															icon={<Fullscreen />}
															name="Lihat Replay"
														/>
													</Link>
													<div
														className="cursor-pointer"
														onClick={() =>
															handleDownloadCsv(item._id, item.title)
														}
													>
														<IconComponent
															icon={<FileDown />}
															name="Unduh CSV"
														/>
													</div>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td className="py-2 text-center text-2xl italic md:py-4">
											Tidak ada data ditemukan
										</td>
									</tr>
								)}
							</tbody>
						</table>
						{/* card for small screen  */}
						<div className="mt-8 flex w-full flex-col gap-4 px-4 md:hidden">
							{roadList?.data !== 0 ? (
								roadList?.data?.map((item, index) => (
									<div
										className="flex flex-col gap-1 rounded-md border border-c-blue p-4 shadow-md"
										key={index}
									>
										<p>{convertTime(item.createdAt)}</p>
										<p className="w-full text-lg font-semibold">{item.title}</p>
										<p>
											<span>Jumlah kerusakan: </span>
											{item.detectionMeta.status === 'processing'
												? 'sedang proses'
												: item.detectionMeta.totalDamage ?? 0}
										</p>
										<div className="flex gap-4 self-end">
											<Link
												href={`/rekaman/${item._id}`}
												className="flex cursor-pointer items-center self-end rounded-lg bg-c-yellow px-3 py-1 text-xs shadow-md transition-all hover:bg-c-yellow/70"
											>
												Lihat Detail
												<IconComponent
													icon={<Fullscreen />}
													name="Lihat Detail"
												/>
											</Link>
											<div
												className="flex cursor-pointer items-center self-end rounded-lg bg-slate-100 px-3 py-1 text-xs shadow-md transition-all hover:bg-slate-200"
												onClick={() => handleDownloadCsv(item._id, item.title)}
											>
												Unduh CSV
												<IconComponent icon={<FileDown />} name="Unduh CSV" />
											</div>
										</div>
									</div>
								))
							) : (
								<div className="py-2 text-center text-2xl italic md:py-4">
									Tidak ada data ditemukan
								</div>
							)}
						</div>
					</>
				)}
			</div>
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
		</>
	)
}
