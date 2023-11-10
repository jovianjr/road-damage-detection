'use client'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	ZoomControl,
} from 'react-leaflet'

const myIcon = new L.Icon({
	iconUrl: `/marker-icon-2x-blue.png`,
	iconRetinaUrl: `/marker-icon-2x-blue.png`,
	iconSize: [20, 35],
	iconAnchor: [10, 35],
})

export default function MapSection({ locationData = [] }) {
	const initialPosition = [
		locationData[0]?.latitude || -2.600029,
		locationData[0]?.longitude || 118.015776,
	]

	return (
		<>
			<h1 className="mb-8 text-xl font-semibold">Peta Kerusakan</h1>
			<MapContainer
				className="relative z-10 h-[590px] w-full rounded-xl"
				center={initialPosition}
				zoom={13}
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
						icon={myIcon}
					>
						<Popup>
							[{location.latitude?.toFixed(8)}, {location.longitude?.toFixed(8)}
							]
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</>
	)
}
