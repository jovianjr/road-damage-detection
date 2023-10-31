import clsx from 'clsx'
import Button from '@/app/components/button'
import { useMemo } from 'react'

export default function ButtonOption({
	children = null,
	className = '',
	buttonText = '',
	buttonClassname = '',
	Icon = null,
	download = false,
	onClick = () => {},
}) {
	return (
		<div
			download={download}
			onClick={onClick}
			className={clsx(
				'group flex aspect-square cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-c-blue px-6 py-4 font-semibold transition-all hover:bg-c-blue/10',
				className
			)}
		>
			{children ? (
				children
			) : (
				<>
					{Icon && <Icon className="h-20 w-20 text-c-blue" />}
					<Button
						text={buttonText}
						className={`group-hover:!bg-c-yellow/80 ${buttonClassname}`}
					/>
				</>
			)}
		</div>
	)
}
