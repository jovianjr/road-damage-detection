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
				'bg-c-yellow rounded-full px-6 py-1',
				className
			)}
		>
			{text}
		</button>
	)
}
