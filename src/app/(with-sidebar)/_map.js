'use client'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'

export default function Home() {
	const initialPosition = [-2, 112]
	return (
		<MapContainer
			className="relative z-10 h-screen w-full"
			center={initialPosition}
			zoom={6}
			zoomControl={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<ZoomControl position="topright" />
		</MapContainer>
	)
}
