import NewUserForm from '@/components/newUserForm/NewUserForm'
import React from 'react'
import styles from './addUser.module.css'

export default function AddUserPage() {
	return (
		<div className={styles.newUserContainer}>
			<NewUserForm />
		</div>
	)
}
