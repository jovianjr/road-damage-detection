import clsx from 'clsx'

const FramePopup = ({ frameDataUrl, onClose }) => {
	return (
		<div
			className={clsx(
				'fixed left-0 top-0 z-10 h-screen w-full bg-slate-500/70 text-white',
				frameDataUrl ? '' : 'hidden'
			)}
		>
			<div className="container mx-auto pt-24">
				<img
					src={frameDataUrl}
					alt="Captured Frame"
					className="mx-auto rounded-xl"
				/>
				<button onClick={onClose} className="text-right">
					Close
				</button>
			</div>
		</div>
	)
}

export default FramePopup
