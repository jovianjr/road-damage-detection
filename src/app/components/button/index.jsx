import clsx from 'clsx'
import { Loader2Icon } from 'lucide-react'

export default function Button({
	className = '',
	text = '',
	onClick = () => {},
	loading = false,
	disabled = false,
}) {
	return (
		<button
			onClick={onClick}
			className={clsx(
				'flex items-center gap-2 rounded-full bg-c-yellow px-6 py-1 font-semibold hover:bg-c-yellow/80',
				loading ? '!bg-c-yellow/60 text-slate-500' : ' ',
				className
			)}
			disabled={disabled || loading}
		>
			{loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : null}
			{text}
		</button>
	)
}
