import axios from 'axios'
import styles from './styles.module.css'
import EditUserForm from '@/components/editUserForm/EditUserForm'

export default async function Page({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id
	const res = await axios.get('http://localhost:3000/api/user/?id=1')
	const user = res.data.user
	console.log(user)
	// console.log(res.data.message)
	return (
		<div>
			<EditUserForm user={user} />
		</div>
	)
}
