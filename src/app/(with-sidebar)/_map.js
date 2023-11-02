'use client'
import 'leaflet/dist/leaflet.css'
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	ZoomControl,
} from 'react-leaflet'

export default function Home({ locationData = [] }) {
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
			{locationData.map((location) => {
				if (!location.status) return
				return location.data.map((kerusakan) => {
					if (!kerusakan.status) return
					return kerusakan.data.map((data) => {
						return (
							<Marker
								key={`marker-${data.id}`}
								position={[data.latitude, data.longitude]}
							>
								<Popup>
									A pretty CSS3 popup. <br /> Easily customizable.
								</Popup>
							</Marker>
						)
					})
				})
			})}
		</MapContainer>
	)
}
