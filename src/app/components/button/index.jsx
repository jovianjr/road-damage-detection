import clsx from 'clsx'

export default function Button({
	className = '',
	text = '',
	onClick = () => {},
}) {
	return (
		<button
			onClick={onClick}
			className={clsx(
				'rounded-full bg-c-yellow px-6 py-1 font-semibold hover:bg-c-yellow/80',
				className
			)}
		>
			{text}
		</button>
	)
}
