import clsx from 'clsx'
import { X } from 'lucide-react'

import Button from '@/app/components/button'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'

import { deleteRoad } from '@/utils/services/road'

const DeletePopup = ({ isDeleting, idData, titleData, onClose }) => {
	const router = useRouter()
	const deleteData = useMutation(
		{
			mutationKey: ['update-data'],
			mutationFn: () =>
				deleteRoad({
					id: idData,
				}),
			onSuccess: () => {
				router.push(`/rekaman`)
			},
		},
		{}
	)

	return (
		<div
			className={clsx(
				'fixed left-0 top-0 z-10 h-screen w-full bg-slate-500/70 text-white',
				isDeleting ? '' : 'hidden'
			)}
		>
			<div className="container mx-auto flex h-full w-1/2 items-center justify-center max-md:text-sm">
				<div className="relative flex w-[500px] flex-col rounded-xl bg-white p-8 text-black">
					<button
						onClick={onClose}
						className="absolute -right-2 -top-2 z-20 aspect-square w-8 rounded bg-red-500 text-white transition-all duration-300 hover:scale-110"
					>
						<X className="mx-auto w-8" />
					</button>
					<h1 className="mb-4 text-2xl font-semibold max-md:text-lg">
						Konfirmasi Hapus
					</h1>
					<p>Anda yakin ingin menghapus rekaman {titleData}?</p>
					<div className="flex justify-center gap-4">
						<Button
							onClick={onClose}
							text="Batal"
							className="mt-4 w-fit !border-c-yellow !bg-white py-2 hover:underline"
						/>
						<Button
							loading={deleteData.isLoading}
							onClick={() => {
								deleteData.mutateAsync()
							}}
							text="Ya"
							className="mt-4 w-fit py-2"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DeletePopup
