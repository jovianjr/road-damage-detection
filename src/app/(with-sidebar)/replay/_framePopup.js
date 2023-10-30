import clsx from 'clsx'
import { X } from 'lucide-react'

const FramePopup = ({ frameDataUrl, onClose, lat, long, secs, holes }) => {
	const convertSecsToTimestamp = (secs) => {
		const mins = Math.floor(secs / 60)
		const remainingSecs = secs % 60

		const mm = String(mins).padStart(2, '0')
		const ss = String(remainingSecs).padStart(2, '0')

		return `${mm}:${ss}`
	}

	return (
		<div
			className={clsx(
				'fixed left-0 top-0 z-10 h-screen w-full bg-slate-500/70 text-white',
				frameDataUrl ? '' : 'hidden'
			)}
		>
			<div className="container mx-auto flex h-full w-1/2 items-center justify-center">
				<div className="relative rounded-xl bg-white p-8">
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
							<p className="text-xl font-semibold">
								{convertSecsToTimestamp(secs)}
							</p>
							<p>
								{lat}, {long}
							</p>
						</div>
						<div>{holes} Kerusakan</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FramePopup
