import axios from 'axios'
import useSWR, { mutate } from 'swr'

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)
export const mutateData = (url: string) => {
	mutate(url)
}
export const getUser = (id: string) => {
	const { data, error, isLoading } = useSWR(
		`http://127.0.0.1:8000/api/users/${id}`,
		fetcher,
		{ revalidateIfStale: true, revalidateOnMount: true }
	)
	return data
}
export const fetchUSers = () => {
	const { data, error, isLoading } = useSWR(
		'http://127.0.0.1:8000/api/users',
		fetcher,
		{ revalidateIfStale: true, revalidateOnMount: true }
	)
	return data
}
