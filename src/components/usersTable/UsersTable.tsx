'use client'

import axios from 'axios'
import { CiSearch } from 'react-icons/ci'
import 'react-toastify/ReactToastify.min.css'
import { MdDeleteForever } from 'react-icons/md'
import { IoCloseOutline } from 'react-icons/io5'
import { HiArrowsUpDown } from 'react-icons/hi2'
import { FaUserEdit } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { User } from '@/types'
import styles from './usersTable.module.css'
import { revalidateByPath } from '@/actions/actions'
import ConfirmModal from '../UI/confirmModal/ConfirmModal'
import { usePathname, useRouter } from 'next/navigation'

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
	const [soringKey, setSortingKey] = useState<string | undefined>('')
	const [filteredUsers, setFilteredUsers] = useState<User[] | undefined>([])
	const [isInputValueLength, setIsInputValueLength] = useState<
		boolean | undefined
	>(false)
	const [searchValue, setSearchValue] = useState<string | undefined>('')
	const [confirmDelete, setConfirmDElete] = useState<boolean | undefined>(false)
	const [deleteUserId, setDeleteUserId] = useState<string | undefined>('')
	const dialogRef = useRef<HTMLDialogElement>(null)
	const router = useRouter()
	const pathName = usePathname()

	useEffect(() => {
		if (sortedUsers!.length < 1) setSortedUsers([...users])
	}, [searchValue])

	useEffect(() => {
		setFilteredUsers([...users!])
	}, [])

	useEffect(() => {
		if (confirmDelete) {
			dialogRef.current?.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [confirmDelete])

	const onDeleteUserHandler = async (userId: string) => {
		console.log('delete')

		if (deleteUserId) {
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
	}

	const onSortingHandler = (key: string) => {
		setSortingKey(key)
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
		setFilteredUsers([...users])
		setIsInputValueLength(false)
		setSearchValue('')
	}
	const onResetHandler = () => {
		setConfirmDElete(false)
	}
	const onConfirmDeleteHandler = (userId: string) => {
		setDeleteUserId(userId)
		setConfirmDElete(true)
	}
	return (
		<div className={styles.usersTableContainer}>
			<div className={styles.usersTableSearchContainer}>
				<input
					type="text"
					className={styles.usersTableSearchInput}
					placeholder="Пошук..."
					onChange={onChangeHandler}
					value={searchValue}
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
								<div className={styles.usersTableThHeaedContainer}>
									{item.title}
									{soringKey === item.name ? (
										<HiArrowsUpDown size={14} className={styles.sortingIcon} />
									) : (
										<></>
									)}
								</div>
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
									<div className={styles.userTableActionsContainer}>
										<div className={styles.deleteUserContainer}>
											<MdDeleteForever
												size={24}
												className={styles.deleteIcon}
												onClick={() => onConfirmDeleteHandler(user.id!)}
											/>
											<p className={styles.deleteUserToolTip}>Видалити</p>
										</div>
										<div className={styles.editUserContainer}>
											<FaUserEdit
												size={24}
												className={styles.editUserIcon}
												onClick={() => router.push(`${pathName}/${user.id}`)}
											/>
											<p className={styles.editUserToolTip}>Редагувати</p>
										</div>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<dialog ref={dialogRef} className={styles.userDeleteDialog}>
				<form method="dialog">
					{confirmDelete && (
						<ConfirmModal
							userId={deleteUserId!}
							onConfirmHandler={() => onDeleteUserHandler(deleteUserId!)}
							onResetHandler={onResetHandler}
						/>
					)}
				</form>
			</dialog>
		</div>
	)
}
