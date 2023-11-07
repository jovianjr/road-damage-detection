'use client'

import React, { useState, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export default function IconComponent({ icon, name, onClick = null }) {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		isMounted && (
			<>
				<div className="flex items-center justify-center max-md:p-2">
					<div
						data-tooltip-content={name}
						data-tooltip-id="icon-tooltip"
						className="cursor-pointer"
						onClick={onClick}
					>
						{icon}
					</div>
				</div>

				<Tooltip
					id="icon-tooltip"
					place="bottom"
					style={{
						backgroundColor: '#E0E0E0',
						color: '#222222',
						borderRadius: '8px',
						fontSize: '16px',
						padding: '4px 12px',
					}}
					noArrow
					className="max-md:hidden"
				/>
			</>
		)
	)
}
