'use client'

import { useState } from 'react'
import { RiEditFill } from 'react-icons/ri'

import EditDialog from '../editDialog/EditDialog'
import { getUser } from '@/lib/fetcher'
import styles from './editUserForm.module.css'

type Props = {
	id: string
}

export default function EditUserForm({ id }: Props) {
	const [confirmEdit, setConfirmEdit] = useState<boolean | undefined>(false)
	const [title, setTitle] = useState<string | undefined>('')
	const [name, setName] = useState<string | undefined>('')
	const user = getUser(id)?.user

	const onClickEditIconHandler = (title: string, name: string, id: string) => {
		setConfirmEdit(true)
		setTitle(title)
		setName(name)
	}

	return (
		user && (
			<div>
				<form className={styles.editUserForm}>
					<h2 className={styles.editUSerFormTitle}>
						Користувач - {user.username}
					</h2>
					<div className={styles.editUserFormLabelsContainer}>
						<label htmlFor="is_admin" className={styles.editUserLabel}>
							Роль - {user.is_admin ? 'Адмін' : 'Користувач'}{' '}
							<RiEditFill
								onClick={() =>
									onClickEditIconHandler('роль', 'is_admin', user.id!)
								}
								className={styles.editIcon}
							/>
						</label>
						<label htmlFor="username" className={styles.editUserLabel}>
							Username - {user.username}{' '}
							<RiEditFill
								onClick={() =>
									onClickEditIconHandler('роль', 'username', user.id!)
								}
								className={styles.editIcon}
							/>
						</label>
						<label htmlFor="email" className={styles.editUserLabel}>
							Email - {user.email}{' '}
							<RiEditFill
								onClick={() =>
									onClickEditIconHandler('роль', 'email', user.id!)
								}
								className={styles.editIcon}
							/>
						</label>
						<label htmlFor="name" className={styles.editUserLabel}>
							Ім'я - {user.name}{' '}
							{user.name ? (
								<RiEditFill
									onClick={() =>
										onClickEditIconHandler('роль', 'name', user.id!)
									}
									className={styles.editIcon}
								/>
							) : (
								<p
									className={styles.editUserAddNewInfoLink}
									onClick={() =>
										onClickEditIconHandler('роль', 'name', user.id!)
									}
								>
									Додати
								</p>
							)}
						</label>
						<label htmlFor="pharmacy_number" className={styles.editUserLabel}>
							Номер аптеки - {user.pharmacy_number}{' '}
							<RiEditFill
								onClick={() =>
									onClickEditIconHandler('роль', 'pharmacy_number', user.id!)
								}
								className={styles.editIcon}
							/>
						</label>
					</div>
				</form>
				<EditDialog
					title={title!}
					confirmEdit={confirmEdit!}
					name={name!}
					setConfirmEdit={setConfirmEdit}
					id={id!}
				/>
			</div>
		)
	)
}
