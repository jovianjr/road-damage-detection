'use client'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	ZoomControl,
} from 'react-leaflet'

const markerColor = [
	'blue',
	'gold',
	'green',
	'red',
	'black',
	'orange',
	'violet',
	'yellow',
	'grey',
	'blue',
	'gold',
	'green',
	'red',
	'black',
	'orange',
	'violet',
	'yellow',
	'grey',
]

const markerColorDiv = markerColor.map(
	(color) =>
		new L.Icon({
			iconUrl: `/marker-icon-2x-${color}.png`,
			iconRetinaUrl: `/marker-icon-2x-${color}.png`,
			iconSize: [20, 35],
			iconAnchor: [10, 35],
		})
)

export default function Home({ locationData = [] }) {
	const initialPosition = [-2, 112]
	const [customMarker, setCustomMarker] = useState([])

	useEffect(() => {
		let currentCustomMarker = [...customMarker]
		locationData.forEach((location) => {
			return location.data.forEach((kerusakan) => {
				let foundColorized = currentCustomMarker.find(
					(o) => o.name === kerusakan.name
				)
				if (!foundColorized) {
					currentCustomMarker.push({
						name: kerusakan.name,
						icon: markerColorDiv[currentCustomMarker.length],
					})
				}
			})
		})
		setCustomMarker(currentCustomMarker)
	}, [locationData])

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
						let myMarker = customMarker.find((o) => o.name === kerusakan.name)
						return (
							<Marker
								key={`marker-${data.id}`}
								position={[data.latitude, data.longitude]}
								icon={myMarker.icon}
							>
								<Popup>
									{kerusakan.name} <br />[{data?.latitude?.toFixed(8)},{' '}
									{data?.longitude?.toFixed(8)}]
								</Popup>
							</Marker>
						)
					})
				})
			})}
		</MapContainer>
	)
}
