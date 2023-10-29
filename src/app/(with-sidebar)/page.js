'use client'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'

const initialPosition = [-2, 112]

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<MapContainer
				className="h-screen w-full"
				center={initialPosition}
				zoom={6}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</main>
	)
}
