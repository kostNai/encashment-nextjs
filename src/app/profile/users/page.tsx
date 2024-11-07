import axios from 'axios'
import { FiUserPlus } from 'react-icons/fi'
import styles from './Users.module.css'
import { User } from '@/types'
import UsersTable from '@/components/usersTable/UsersTable'
import Link from 'next/link'

export default async function AdminUsersPage() {
	const users: User[] = await (
		await axios.get('http://localhost:3000/api/users')
	).data.users
	return (
		<div className={styles.usersContainer}>
			<Link href="/profile/users/addUser" className={styles.addNewUserLink}>
				<FiUserPlus /> Додати нового користувача
			</Link>
			<UsersTable users={users} />
		</div>
	)
}
