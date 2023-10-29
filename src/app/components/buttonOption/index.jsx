import clsx from 'clsx'
import Button from '@/app/components/button'

export default function ButtonOption({
	as = 'button',
	href = null,
	className = '',
	buttonText = '',
	buttonClassname = '',
	Icon = null,
	download = false,
	onClick = () => {},
}) {
	return (
		<a
			as={as}
			href={href}
			download={download}
			onClick={onClick}
			className={clsx(
				'border-c-blue flex aspect-square flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed px-6 py-4 font-semibold transition-all hover:border-solid',
				className
			)}
		>
			<Icon className="text-c-blue h-20 w-20" />
			<Button
				text={buttonText}
				className={buttonClassname}
			/>
		</a>
	)
}
