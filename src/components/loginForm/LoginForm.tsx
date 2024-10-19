'use client'

import { FormEvent, ReactEventHandler, useState } from 'react'
import styles from './LoginForm.module.css'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
	const [user, setUser] = useState({ username: '', password: '' })

	const session = useSession()
	const router = useRouter()

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const onSubmitHandler = async (e: FormEvent) => {
		e.preventDefault()
		try {
			const res = await signIn('credentials', {
				username: user.username,
				password: user.password
			})
			if (res?.ok) {
				router.push('/profile')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form className={styles.loginForm} onSubmit={onSubmitHandler}>
			{/* <h2 className={styles.loginFormTitle}>Вхід</h2> */}
			<div className={styles.loginFormInputs}>
				<input
					type="text"
					placeholder="Логін"
					className={styles.loginFormInput}
					name="username"
					value={user.username}
					onChange={onChangeHandler}
				/>

				<input
					type="password"
					placeholder="Пароль"
					className={styles.loginFormInput}
					name="password"
					value={user.password}
					onChange={onChangeHandler}
				/>
			</div>
			<div className={styles.loginFormBtnContainer}>
				<button className={styles.loginFormBtn}>Увійти</button>
			</div>
		</form>
	)
}
