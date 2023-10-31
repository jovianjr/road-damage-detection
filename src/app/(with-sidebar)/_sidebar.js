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
import { usePathname } from 'next/navigation'

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
		href: '/rekaman',
	},
	{
		id: 'menu-3',
		icon: Video,
		text: 'Tambah Video',
		href: '/tambah-video',
	},
]

export default function Sidebar() {
	const pathname = usePathname()
	const [expanded, setExpanded] = useState(false)

	return (
		<nav
			className={clsx(
				'flex h-screen flex-col overflow-hidden bg-c-blue shadow-sm transition-all',
				expanded ? 'w-[18vw]' : 'w-[5vw]'
			)}
		>
			<div className="flex items-center justify-end py-4 pr-5">
				<button
					onClick={() => setExpanded((prev) => !prev)}
					className="rounded-lg bg-c-yellow p-1.5 hover:bg-c-yellow/80"
				>
					{expanded ? <ChevronFirst /> : <ChevronLast />}
				</button>
			</div>
			<ul className="w-[25vw]">
				{menuList.map((menu) => (
					<Menu
						active={
							(menu.href != '/' && pathname.includes(menu.href)) ||
							(menu.href == '/' && pathname === menu.href)
						}
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

const Menu = ({ active, Icon = null, text = '', show = true, href = '' }) => {
	return (
		<Link
			href={href}
			className={clsx(
				'group flex h-full w-full items-center gap-2 pl-6',
				'cursor-pointer font-medium transition-all',
				active ? 'bg-c-yellow text-c-blue' : 'text-c-yellow'
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
