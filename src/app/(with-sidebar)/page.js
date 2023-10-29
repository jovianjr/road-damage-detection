'use client'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/app/(with-sidebar)/_map'), { ssr: false })

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<Map />
		</main>
	)
}
