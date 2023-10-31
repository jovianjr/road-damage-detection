import axios from '@/utils/helpers/axios'

export const uploadFileToMinio = async ({ formData = null }) => {
	return await axios.post(`/api/upload-file`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
}
