'use client'

import { MdDeleteForever } from 'react-icons/md'
import { User } from '@/types'
import styles from './usersTable.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'
import { revalidateByPath } from '@/actions/actions'
import { useEffect, useState } from 'react'

type Props = {
	users: User[]
}
const tableItems = [
	{ name: 'id', title: 'Id' },
	{ name: 'username', title: 'Username' },
	{ name: 'email', title: 'Email' },
	{ name: 'name', title: "Ім'я" },
	{ name: 'pharmacy_number', title: 'Номер аптеки' },
	{ name: 'is_admin', title: 'Роль' },
	{ name: 'actions', title: 'Дії' }
]

export default function UsersTable({ users }: Props) {
	const [sortedUsers, setSortedUsers] = useState<User[] | undefined>([])
	const [isReverseSorting, setIsReverseSorting] = useState<boolean | undefined>(
		false
	)

	useEffect(() => {
		setSortedUsers([...users])
	}, [])

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

	const onSortingHandler = (key: string) => {
		if (isReverseSorting) {
			const sorted = sortedUsers?.sort((a: any, b: any) => {
				return a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0
			})
			setSortedUsers([...sorted!])
			setIsReverseSorting(!isReverseSorting)
		} else {
			const sorted = sortedUsers?.sort((a: any, b: any) => {
				return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
			})
			setSortedUsers([...sorted!])
			setIsReverseSorting(!isReverseSorting)
		}
	}

	return (
		<div className={styles.usersTableContainer}>
			<ToastContainer />
			<button onClick={() => onSortingHandler('is_admin')}>Sort</button>
			<table className={styles.usersTable}>
				<thead className={styles.usersTableHead}>
					<tr>
						{tableItems.map((item) => (
							<th
								scope="col"
								className={styles.usersTableTh}
								key={item.name}
								onClick={() => onSortingHandler(item.name)}
							>
								{item.title}
							</th>
						))}
						{/* <th scope="col" className={styles.usersTableTh}>
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
						</th> */}
					</tr>
				</thead>
				<tbody className={styles.usersTableBody}>
					{sortedUsers?.map((user) => (
						<tr key={user.id}>
							<th scope="row" className={styles.usersTableTh}>
								{user.id}
							</th>
							<td className={styles.usersTableTd}>{user.username}</td>
							<td className={styles.usersTableTd}>{user.email}</td>
							<td className={styles.usersTableTd}>{user.name}</td>
							<td className={styles.usersTableTd}>{user.pharmacy_number}</td>
							<td className={styles.usersTableTd}>
								{user.is_admin ? 'Адмін' : 'Користувач'}
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
