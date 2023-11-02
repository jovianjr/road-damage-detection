import axios from '@/utils/helpers/axios'

export const getAllRoad = async () => {
	const response = await axios.get(`/api/roads`)
	return response.data
}

export const getRoadById = async ({ id = null }) => {
	const response = await axios.get(`/api/roads/${id}`)
	return response.data
}

export const createRoad = async ({ title = '', url = '' }) => {
	const response = await axios.post(`/api/roads`, {
		title: title,
		videoUrl: url,
	})
	return response.data
}

export const deleteRoad = async ({ id = null }) => {
	const response = await axios.delete(`/api/roads/${id}`)
	return response.data
}

export const updateRoad = async ({
	id = null,
	title = null,
	locations = null,
}) => {
	const response = await axios.put(`/api/roads/${id}`, {
		title,
		locations,
	})
	return response.data
}

export const updateRoadLocationByCSV = async ({
	id = null,
	formData = null,
}) => {
	const response = await axios.put(`/api/roads/${id}/locations/csv`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
	return response.data
}
