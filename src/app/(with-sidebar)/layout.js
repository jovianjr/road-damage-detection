import Sidebar from '@/app/_sidebar'

export default function withSidebarLayout({ children }) {
	return (
		<>
			<Sidebar />
			<div className="max-h-screen flex-grow overflow-auto">{children}</div>
		</>
	)
}
