import clsx from 'clsx'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import Button from '@/app/components/button'
import { useMutation, useQueryClient } from 'react-query'
import UploadFile from '@/app/components/uploadFile'
import Popup from '@/app/components/popup'

import { updateRoad, updateRoadLocationByCSV } from '@/utils/services/road'

const EditPopup = ({ formEdit, onClose, handleChangeTitle }) => {
	const [fileCSV, setFileCSV] = useState()
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
				// queryClient.invalidateQueries(['road-by-id', formEdit.id])
				// onClose()
				if (fileCSV) updateLocWithCsv.mutateAsync(res.data)
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

					<Button
						loading={updateData.isLoading}
						onClick={() => {
							updateData.mutateAsync()
						}}
						text="Simpan"
						className="mx-auto mt-4 w-fit py-2"
					/>
				</div>
			</div>
		</div>
	)
}

export default EditPopup
