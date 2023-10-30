'use client'

import {
	ChevronFirst,
	ChevronLast,
	Video,
	Map,
	FolderClosed,
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const menuList = [
	{
		id: 'menu-1',
		icon: Map,
		text: 'Peta',
		href: '/',
	},
	{
		id: 'menu-2',
		icon: FolderClosed,
		text: 'Daftar Rekaman',
		href: '/daftar-rekaman',
	},
	{
		id: 'menu-3',
		icon: Video,
		text: 'Video',
		href: '/video',
	},
]

export default function Sidebar() {
	const [expanded, setExpanded] = useState(false)

	return (
		<nav
			className={clsx(
				'flex h-screen flex-col overflow-hidden bg-c-blue shadow-sm transition-all',
				expanded ? 'w-[18vw]' : 'w-[5vw]'
			)}
		>
			<div className="flex items-center justify-end p-4 pb-2">
				<button
					onClick={() => setExpanded((prev) => !prev)}
					className="rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100"
				>
					{expanded ? <ChevronFirst /> : <ChevronLast />}
				</button>
			</div>
			<ul className="w-[25vw]">
				{menuList.map((menu) => (
					<Menu
						Icon={menu.icon}
						text={menu.text}
						show={expanded}
						href={menu.href}
						key={menu.id}
					/>
				))}
			</ul>
		</nav>
	)
}

const Menu = ({ Icon = null, text = '', show = true, href = '' }) => {
	return (
		<Link
			href={href}
			className={clsx(
				'group flex h-full w-full items-center gap-2 rounded-md pl-6',
				'cursor-pointer font-medium text-c-yellow transition-all'
			)}
		>
			<Icon className="h-6 w-6" />
			<span
				className={clsx('transition-all', show ? 'opacity-100' : 'opacity-0')}
			>
				{text}
			</span>
		</Link>
	)
}
