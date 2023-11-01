import clsx from 'clsx'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import UploadFile from '@/app/components/uploadFile'

const Popup = ({ data, onClose, children }) => {
	const boxRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (boxRef.current && !boxRef.current.contains(event.target)) {
				data = null
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [boxRef])

	return (
		<div
			className={clsx(
				'fixed left-0 top-0 z-10 h-screen w-full bg-slate-500/70 text-white',
				data ? '' : 'hidden'
			)}
		>
			<div className="container mx-auto flex h-full w-1/2 items-center justify-center">
				<div
					className="relative flex w-[500px] flex-col rounded-xl bg-white p-8 text-black"
					ref={boxRef}
				>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Popup
