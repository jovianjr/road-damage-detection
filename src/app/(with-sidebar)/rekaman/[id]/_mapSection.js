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
import { useEffect, useState } from 'react'

const myIcon = new L.Icon({
	iconUrl: `/marker-icon-2x-blue.png`,
	iconRetinaUrl: `/marker-icon-2x-blue.png`,
	iconSize: [20, 35],
	iconAnchor: [10, 35],
})

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
export default function MapSection({ locationData = [] }) {
	const initialPosition = [
		locationData[0]?.latitude || -2.600029,
		locationData[0]?.longitude || 118.015776,
	]
	const [customMarker, setCustomMarker] = useState([])

	useEffect(() => {
		let currentCustomMarker = [...customMarker]
		locationData.forEach((location) => {
			return location.data.forEach((kerusakan) => {
				let foundColorized = currentCustomMarker.find(
					(o) => o.name === kerusakan.class
				)
				if (!foundColorized) {
					currentCustomMarker.push({
						name: kerusakan.class,
						color: markerColor[currentCustomMarker.length],
						icon: markerColorDiv[currentCustomMarker.length],
					})
				}
			})
		})
		setCustomMarker(currentCustomMarker)
	}, [locationData])

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
				{locationData.map((location) => {
					if (location.data?.length === 0) return
					const kerusakan = location.data[0]
					let myMarker = customMarker.find((o) => o.name === kerusakan.class)
					return (
						<Marker
							key={`marker-${location.id}`}
							position={[location.latitude, location.longitude]}
							icon={myMarker?.icon ?? myIcon}
						>
							<Popup>
								[{location.latitude?.toFixed(8)},{' '}
								{location.longitude?.toFixed(8)}]
							</Popup>
						</Marker>
					)
				})}
			</MapContainer>
			<div className="w-full py-4">
				<span className="font-semibold">Keterangan warna</span>
				<ul className="list-inside list-disc pl-2 text-sm">
					{customMarker.map((marker) => (
						<li>
							{marker.color}: {marker.name}
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
