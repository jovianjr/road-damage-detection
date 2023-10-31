import axios from '@/utils/helpers/axios'

export const getAllRoad = async () => {
	const response = await axios.get(`/api/roads`)
	return response.data
}

// export const getPatterns = async (pattern_id) => {
// 	const response = await axios.get(`/api/stock-patterns/${pattern_id ?? ''}`)
// 	return response.data
// }

// export const createAttempt = async (pattern_id) => {
// 	const response = await axios.post(
// 		`/api/stock-patterns/${pattern_id}/attempts`
// 	)
// 	return response.data
// }
