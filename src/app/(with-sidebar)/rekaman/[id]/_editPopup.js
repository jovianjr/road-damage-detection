import clsx from 'clsx'
import { X } from 'lucide-react'
import { useState } from 'react'

import Button from '@/app/components/button'
import { useMutation, useQueryClient } from 'react-query'
import UploadFile from '@/app/components/uploadFile'

import { updateRoad, updateRoadLocationByCSV } from '@/utils/services/road'
import { toast } from 'react-toastify'

const EditPopup = ({ formEdit, onClose, handleChangeTitle }) => {
	const [fileCSV, setFileCSV] = useState(null)
	const queryClient = useQueryClient()
	const updateData = useMutation(
		{
			mutationKey: ['update-data'],
			mutationFn: () =>
				updateRoad({
					id: formEdit.id,
					title: formEdit.title,
					locations: formEdit.locations,
				}),
			onSuccess: (res) => {
				if (fileCSV !== null) {
					console.log(fileCSV)
					updateLocWithCsv.mutateAsync(res.data)
				} else {
					queryClient.invalidateQueries(['road-by-id', formEdit.id])
					toast.success('Sukses memperbarui nama rekaman')
					onClose()
				}
			},
		},
		{}
	)

	const updateLocWithCsv = useMutation({
		mutationKey: ['update-location-csv'],
		mutationFn: (data) => {
			console.log('Updateing loc with csv')
			const formData = new FormData()
			formData.append('csv', fileCSV)
			return updateRoadLocationByCSV({
				id: data._id,
				formData: formData,
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['road-by-id', formEdit.id])
			toast.success('Sukses memperbarui data lokasi')
			onClose()
		},
		onError: (error) => {
			toast.error('Gagal memperbarui lokasi: ' + error.message)
			queryClient.invalidateQueries(['road-by-id', formEdit.id])
			onClose()
		},
	})

	return (
		<div
			className={clsx(
				'fixed left-0 top-0 z-10 h-screen w-full bg-slate-500/70 text-white',
				formEdit ? '' : 'hidden'
			)}
		>
			<div className="container mx-auto flex h-full w-1/2 items-center justify-center">
				<div className="relative flex w-[500px] flex-col rounded-xl bg-white p-8 text-black">
					<button
						onClick={onClose}
						className="absolute -right-2 -top-2 z-20 aspect-square w-8 rounded bg-red-500 text-white transition-all duration-300 hover:scale-110"
					>
						<X className="mx-auto w-8" />
					</button>
					<h1 className="mb-4 text-2xl font-semibold">Edit Rekaman</h1>

					<label htmlFor="name">Judul Video</label>
					<input
						name="name"
						value={formEdit?.title}
						onChange={handleChangeTitle}
						type="text"
						className="mb-4 mt-2 rounded-lg border border-black p-2"
					/>

					<UploadFile
						title="Update file lokasi baru"
						name="location"
						className="!h-[250px]"
						onChange={setFileCSV}
						disabled={updateData.isLoading}
						type="csv"
					></UploadFile>

					<div className="flex justify-center gap-4">
						<Button
							onClick={onClose}
							text="Batal"
							className="mt-4 w-fit !border-c-yellow !bg-white py-2 hover:underline"
						/>
						<Button
							loading={updateData.isLoading}
							onClick={() => {
								updateData.mutateAsync()
							}}
							text="Simpan"
							className="mt-4 w-fit py-2"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditPopup
