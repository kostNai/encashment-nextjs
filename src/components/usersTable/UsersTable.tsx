'use client'

import { MdDeleteForever } from 'react-icons/md'
import { User } from '@/types'
import styles from './usersTable.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'
import { revalidateByPath } from '@/actions/actions'

type Props = {
	users: User[]
}

export default function UsersTable({ users }: Props) {
	const onDeleteUserHandler = async (userId: string) => {
		try {
			const res = await axios.delete('http://localhost:3000/api/users', {
				data: {
					id: userId
				}
			})
			if (res.status) {
				toast.success(res.data.message, { position: 'top-right' })
				revalidateByPath('/profile/users')
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	return (
		<div className={styles.usersTableContainer}>
			<ToastContainer />
			<table className={styles.usersTable}>
				<thead className={styles.usersTableHead}>
					<tr>
						<th scope="col" className={styles.usersTableTh}>
							Id
						</th>
						<th scope="col" className={styles.usersTableTh}>
							Username
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
						<tr key={user.id}>
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
							<td
								className={`${styles.usersTableTd} ${styles.usersTableTdBtn}`}
							>
								<div className={styles.deleteUserContainer}>
									<MdDeleteForever
										size={24}
										className={styles.deleteIcon}
										onClick={() => onDeleteUserHandler(user?.id!)}
									/>
									<span className={styles.toolTip}>Видалити</span>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
