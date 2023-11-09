import Sidebar from '@/app/(with-sidebar)/_sidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-tooltip/dist/react-tooltip.css'

export default function withSidebarLayout({ children }) {
	return (
		<>
			<ToastContainer />
			<Sidebar />
			<div className="max-h-screen flex-grow overflow-auto">{children}</div>
		</>
	)
}
