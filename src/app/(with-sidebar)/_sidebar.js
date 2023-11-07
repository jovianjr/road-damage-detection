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
				'flex h-screen w-full flex-col overflow-hidden bg-c-blue shadow-sm transition-all max-md:h-[9vh]',
				expanded
					? 'max-md:bg-c-blue md:w-[18vw]'
					: 'max-md:-translate-x-[80vw] max-md:bg-transparent md:w-[5vw]'
			)}
		>
			<div className="flex items-center justify-end py-4 pr-5 max-md:justify-between max-md:pl-5">
				<ul className="flex w-[70vw] md:hidden">
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
				<button
					onClick={() => setExpanded((prev) => !prev)}
					className="rounded-lg bg-c-yellow p-1.5 hover:bg-c-yellow/80"
				>
					{expanded ? <ChevronFirst /> : <ChevronLast />}
				</button>
			</div>
			<ul className="w-[25vw] max-md:hidden">
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
				'group flex h-full w-full items-center gap-2 max-md:w-1/2 max-md:justify-center max-md:rounded-full max-md:p-2 md:pl-6',
				'cursor-pointer font-medium transition-all',
				active ? 'bg-c-yellow text-c-blue' : 'text-c-yellow'
			)}
		>
			<Icon className="h-6 w-6" />
			<span
				className={clsx(
					'transition-all max-md:hidden',
					show ? 'opacity-100' : 'opacity-0'
				)}
			>
				{text}
			</span>
		</Link>
	)
}
