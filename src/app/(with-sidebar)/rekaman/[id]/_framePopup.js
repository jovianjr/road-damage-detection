import clsx from 'clsx'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const FramePopup = ({
	frameDataUrl,
	onClose,
	lat,
	long,
	secs,
	holes,
	jenisKerusakan,
}) => {
	const boxRef = useRef(null)
	const [jenisKerusakanMap, setJenisKerusakanMap] = useState(new Map())
	const [time, setTime] = useState()

	useEffect(() => {
		const mins = Math.floor(secs / 60)
		const remainingSecs = secs % 60

		const mm = String(mins).padStart(2, '0')
		const ss = String(remainingSecs).padStart(2, '0')

		setTime(`${mm}:${ss}`)
	}, [secs])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (boxRef.current && !boxRef.current.contains(event.target)) {
				onClose()
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	useEffect(() => {
		const newJenisKerusakanMap = new Map()
		jenisKerusakan?.forEach((element) => {
			const { class: text } = element
			if (newJenisKerusakanMap.has(text)) {
				newJenisKerusakanMap.set(text, newJenisKerusakanMap.get(text) + 1)
			} else {
				newJenisKerusakanMap.set(text, 1)
			}
		})
		setJenisKerusakanMap(newJenisKerusakanMap)
	}, [jenisKerusakan])

	return (
		<div
			className={clsx(
				'fixed left-0 top-0 z-10 h-screen w-full bg-slate-500/70 text-white',
				frameDataUrl ? '' : 'hidden'
			)}
		>
			<div className="container mx-auto flex h-full w-1/2 items-center justify-center">
				<div className="relative rounded-xl bg-white p-8" ref={boxRef}>
					<img
						src={frameDataUrl}
						alt="Captured Frame"
						className="mx-auto rounded-xl shadow-lg"
					/>
					<button
						onClick={onClose}
						className="absolute -right-2 -top-2 z-20 aspect-square w-8 rounded bg-red-500 text-white transition-all duration-300 hover:scale-110"
					>
						<X className="mx-auto w-8" />
					</button>
					<div className="mt-12 flex items-start justify-between text-lg text-black">
						<div className="flex flex-col items-start">
							<div>{holes} Kerusakan</div>
							<p>
								{[...jenisKerusakanMap].map((element, index) => (
									<span key={index} className="font-normal">
										{element[0]}
										{element[1] > 1 && ` (${element[1]})`}
										{index !== jenisKerusakanMap.size - 1 ? ', ' : ''}
									</span>
								))}
							</p>
						</div>
						<div className="flex flex-col items-end">
							<p>
								{lat}, {long}
							</p>
							<p className="text-xl font-semibold">{time}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FramePopup
