'use server'
import axios from 'axios'
const apiLink = process.env.API_URL

export const newOperation = async (
	id: string,
	prevState: { message: string; success: boolean },
	formData: FormData
) => {
	const data = Object.fromEntries(formData)
	const operationKeys = Object.keys(data).map((key) => {
		return { denomination: key }
	})
	const operationValues = Object.values(data).map((val) => {
		return { bills_count: val }
	})

	const operation = operationKeys.map((key, indx) => {
		return { ...key, ...operationValues[indx] }
	})
	const res = await axios.post(`${apiLink}/operations`, {
		operation,
		user_id: 1
	})
	if (res.status !== 200) {
		return { message: res.statusText, success: false }
	}
	return { message: 'Проведено успішно', success: true }
}

export const addUser = async (
	prevState: { message: string; success: boolean },
	formData: FormData
) => {
	const data = Object.fromEntries(formData)

	const res = await axios
		.post(`${apiLink}/users`, {
			...data
		})
		.catch((error) => {
			return error.response
		})
	if (res.status !== 200) {
		return { message: res.data.message, success: false }
	}
	return { message: 'Додано успішно', success: true }
}
