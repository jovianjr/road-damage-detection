import Link from 'next/link'
import clsx from 'clsx'
import {
	Calendar,
	AlignLeft,
	AlertOctagon,
	PlaySquare,
	List,
	Fullscreen,
} from 'lucide-react'

import IconComponent from '@/app/components/IconComponents'

const headerTableContent = [
	{ id: 1, icon: <Calendar />, name: 'Tanggal' },
	{ id: 2, icon: <AlignLeft />, name: 'Judul' },
	{ id: 4, icon: <AlertOctagon />, name: 'Total Kerusakan' },
	{ id: 5, icon: <PlaySquare />, name: 'Data Video' },
	{ id: 6, icon: <List />, name: 'Detail' },
]

export default function DaftarRekaman() {
	const dummyData = [
		{
			id: 1,
			date: '08/10/2023',
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
		},
		{
			id: 2,
			date: '02/10/2023',
			title: 'Maguwoharjo',
			totalKerusakan: 7,
			videoData: [
				{
					id: 1,
					text: 'Video',
				},
			],
		},
		{
			id: 3,
			date: '12/09/2023',
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
			date: '23/07/2023',
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
			date: '31/02/2022',
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
			date: '17/02/2022',
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
			date: '05/01/2022',
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

	return (
		<div className="mt-16 flex min-h-screen w-full items-start justify-center bg-[#fff] text-black">
			<table className="w-3/4 bg-white text-lg font-medium md:text-xl">
				<thead className="">
					<tr>
						{headerTableContent.map((item) => {
							return (
								<td
									className={clsx(
										'border-b py-2 text-center md:py-4',
										item !== headerTableContent[headerTableContent.length - 1]
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
						dummyData.map((item, index) => (
							<tr key={index}>
								<td className="border-r py-2 text-center md:py-4">
									{item.date}
								</td>
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
												className="rounded-lg bg-pink-300 px-2.5 py-1 text-xl"
												key={index}
											>
												{data.text}
											</div>
										)
									})}
								</td>
								<td className="px-3 py-2 text-center md:py-4">
									<div className="grid w-full grid-cols-1">
										<Link
											href={{
												pathname: '/replay',
												query: { name: 'test' },
											}}
										>
											<IconComponent
												icon={<Fullscreen />}
												name="Lihat Replay"
											/>
										</Link>
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
	)
}
