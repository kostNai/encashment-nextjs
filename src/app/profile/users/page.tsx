import axios from 'axios'
import { FiUserPlus } from 'react-icons/fi'
import styles from './Users.module.css'
import { User } from '@/types'
import UsersTable from '@/components/usersTable/UsersTable'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/app/api/auth/[...nextauth]/config'
import { redirect } from 'next/navigation'

export default async function AdminUsersPage() {
	const session = await getServerSession(authConfig)
	const user = session?.user
	if (!user?.is_admin) redirect('/profile')
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
