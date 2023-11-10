'use client'

import React from 'react'
import 'react-tooltip/dist/react-tooltip.css'

export default function IconComponent({
	id = 'icon-tooltip',
	icon,
	name,
	onClick = null,
}) {
	return (
		<div className="flex items-center justify-center max-md:p-2">
			<div
				data-tooltip-content={name}
				data-tooltip-id={id}
				className="cursor-pointer"
				onClick={onClick}
			>
				{icon}
			</div>
		</div>
	)
}
