'use client'

import { MdDeleteForever } from 'react-icons/md'
import { User } from '@/types'
import styles from './usersTable.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'
import { revalidateByPath } from '@/actions/actions'
import { useEffect, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoCloseOutline } from 'react-icons/io5'

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
	{ name: 'actions', title: 'Керування' }
]

export default function UsersTable({ users }: Props) {
	const [sortedUsers, setSortedUsers] = useState<User[] | undefined>([])
	const [isReverseSorting, setIsReverseSorting] = useState<boolean | undefined>(
		false
	)
	const [filteredUsers, setFilteredUsers] = useState<User[] | undefined>([])
	const [isInputValueLength, setIsInputValueLength] = useState<
		boolean | undefined
	>(false)
	const [searchValue, setSearchValue] = useState<string | undefined>('')
	const searchRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (sortedUsers!.length < 1) setSortedUsers([...users])
	}, [searchValue])
	useEffect(() => {
		setFilteredUsers([...users!])
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
			setFilteredUsers([...sorted!])
			setIsReverseSorting(!isReverseSorting)
		} else {
			const sorted = sortedUsers?.sort((a: any, b: any) => {
				return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
			})
			setFilteredUsers([...sorted!])
			setIsReverseSorting(!isReverseSorting)
		}
	}
	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
		e.target.value.length > 0
			? setIsInputValueLength(true)
			: setIsInputValueLength(false)

		const filtered = sortedUsers!.filter((user: User) => {
			return JSON.stringify(Object.values(user)).includes(e.target.value)
		})
		setFilteredUsers([...filtered])
	}
	const onResetSearchValueHandler = () => {
		setIsInputValueLength(false)
		setSearchValue('')
	}

	return (
		<div className={styles.usersTableContainer}>
			<ToastContainer />
			<div className={styles.usersTableSearchContainer}>
				<input
					type="text"
					className={styles.usersTableSearchInput}
					placeholder="Пошук..."
					onChange={onChangeHandler}
					value={searchValue}
					ref={searchRef}
				/>
				{isInputValueLength ? (
					<IoCloseOutline
						className={styles.usersTableSearchIcon}
						size={24}
						onClick={onResetSearchValueHandler}
					/>
				) : (
					<CiSearch className={styles.usersTableSearchIcon} size={24} />
				)}
			</div>
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
					</tr>
				</thead>
				<tbody className={styles.usersTableBody}>
					{filteredUsers &&
						filteredUsers?.map((user) => (
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
