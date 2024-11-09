import NewUserForm from '@/components/newUserForm/NewUserForm'
import React from 'react'
import styles from './addUser.module.css'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/app/api/auth/[...nextauth]/config'
import { redirect } from 'next/navigation'

export default async function AddUserPage() {
	const session = await getServerSession(authConfig)
	const user = session?.user
	if (!user?.is_admin) redirect('/profile')
	return (
		<div className={styles.newUserContainer}>
			<NewUserForm />
		</div>
	)
}
