import clsx from 'clsx'
import { Poppins } from 'next/font/google'
import Sidebar from '@/app/_sidebar'
import '@/app/globals.css'

const poppins = Poppins({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	variable: '--font-poppins',
})

export const metadata = {
	title: 'Road Damage Detection',
	description: 'Road Damage Detection',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={clsx('flex font-poppins font-medium', poppins.variable)}>
				<Sidebar />
				<div className="flex-grow">{children}</div>
			</body>
		</html>
	)
}
