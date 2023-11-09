'use client'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	ZoomControl,
} from 'react-leaflet'

export default function MapSection({
	locationData = [],
	initialLat = -2.600029,
	initialLong = 118.015776,
}) {
	return (
		<>
			<h1 className="mb-8 text-xl font-semibold">Peta Kerusakan</h1>
			<MapContainer
				className="relative z-10 h-[590px] w-full rounded-xl"
				center={[initialLat, initialLong]}
				zoom={18}
				zoomControl={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<ZoomControl position="bottomright" />
				{locationData.map((location) => (
					<Marker
						key={`marker-${location.id}`}
						position={[location.latitude, location.longitude]}
					></Marker>
				))}
			</MapContainer>
		</>
	)
}
