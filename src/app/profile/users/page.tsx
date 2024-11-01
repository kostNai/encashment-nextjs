import axios from 'axios'
import { FiUserPlus } from 'react-icons/fi'
import styles from './users.module.css'
import { User } from '@/types'
import UsersTable from '@/components/usersTable/UsersTable'

export default async function AdminUsersPage() {
	const users: User[] = await (
		await axios.get('http://localhost:3000/api/users')
	).data.users
	return (
		<div className={styles.usersContainer}>
			<div className={styles.addNewUserLink}>
				<FiUserPlus /> Додати нового користувача
			</div>
			<UsersTable users={users} />
		</div>
	)
}
