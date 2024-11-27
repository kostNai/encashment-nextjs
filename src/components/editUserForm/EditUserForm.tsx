'use client'

import { RiEditFill } from 'react-icons/ri'
import { User } from '@/types'
import styles from './editUserForm.module.css'
import { useState } from 'react'
import EditDialog from '../editDialog/EditDialog'

type Props = {
	user: User
}

export default function EditUserForm({ user }: Props) {
	const [confirmEdit, setConfirmEdit] = useState<boolean | undefined>(false)
	const [title, setTitle] = useState<string | undefined>('')
	const [name, setName] = useState<string | undefined>('')

	const onClickEditIconHandler = (title: string, name: string) => {
		setConfirmEdit(true)
		setTitle(title)
		setName(name)
	}

	return (
		<div>
			<form action="" className={styles.editUserForm}>
				<h2 className={styles.editUSerFormTitle}>
					Користувач - {user.username}
				</h2>
				<label htmlFor="is_admin" className={styles.editUserLabel}>
					Роль - {user.is_admin ? 'Адмін' : 'Користувач'}{' '}
					<RiEditFill
						onClick={() => onClickEditIconHandler('Роль', 'is_admin')}
					/>
				</label>
				<label htmlFor="username" className={styles.editUserLabel}>
					Username - {user.username} <RiEditFill />
				</label>
				<label htmlFor="email" className={styles.editUserLabel}>
					Email - {user.email} <RiEditFill />
				</label>
				<label htmlFor="name" className={styles.editUserLabel}>
					Ім'я - {user.name} <RiEditFill />
				</label>
				<label htmlFor="name" className={styles.editUserLabel}>
					Номер аптеки - {user.pharmacy_number} <RiEditFill />
				</label>
			</form>
			<EditDialog
				title={title!}
				confirmEdit={confirmEdit!}
				name={name!}
				setConfirmEdit={setConfirmEdit}
			/>
		</div>
	)
}
