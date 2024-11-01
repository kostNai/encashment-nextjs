import { MdDeleteForever } from 'react-icons/md'
import { User } from '@/types'
import styles from './UsersTable.module.css'

type Props = {
	users: User[]
}

export default function UsersTable({ users }: Props) {
	return (
		<table className={styles.usersTable}>
			<thead className={styles.usersTableHead}>
				<tr>
					<th scope="col" className={styles.usersTableTh}>
						Id
					</th>
					<th scope="col" className={styles.usersTableTh}>
						Usernmae
					</th>
					<th scope="col" className={styles.usersTableTh}>
						Email
					</th>
					<th scope="col" className={styles.usersTableTh}>
						Ім'я
					</th>
					<th scope="col" className={styles.usersTableTh}>
						Номер аптеки
					</th>
					<th scope="col" className={styles.usersTableTh}>
						Роль
					</th>
					<th scope="col" className={styles.usersTableTh}>
						Керування
					</th>
				</tr>
			</thead>
			<tbody className={styles.usersTableBody}>
				{users.map((user) => (
					<tr>
						<th scope="row" className={styles.usersTableTh}>
							{user.id}
						</th>
						<td className={styles.usersTableTd}>{user.username}</td>
						<td className={styles.usersTableTd}>{user.email}</td>
						<td className={styles.usersTableTd}>{user.name}</td>
						<td className={styles.usersTableTd}>{user.pharmacy_number}</td>
						<td className={styles.usersTableTd}>
							{user.isAdmin ? 'Адмін' : 'Користувач'}
						</td>
						<td className={`${styles.usersTableTd} ${styles.usersTableTdBtn}`}>
							<MdDeleteForever size={24} className={styles.deleteIcon} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
