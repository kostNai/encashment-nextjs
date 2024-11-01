'use client'

import { FormEvent, ReactEventHandler, useState } from 'react'
import styles from './LoginForm.module.css'
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

export default function LoginForm() {
	const [user, setUser] = useState({ username: '', password: '' })

	const [errorsList, setErrorsList] = useState<string[] | undefined>([])
	const router = useRouter()

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}
	const onSubmitHandler = async (e: FormEvent) => {
		e.preventDefault()

		const res = await signIn('credentials', {
			redirect: false,
			username: user.username,
			password: user.password
		})

		res?.ok ? router.push('/profile') : setErrorsList([res?.error!])
	}

	return (
		<form className={styles.loginForm} onSubmit={onSubmitHandler}>
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
			{errorsList &&
				errorsList.map((error, indx) => (
					<p key={indx} className={styles.loginFormErrors}>
						{error}
					</p>
				))}
			<div className={styles.loginFormBtnContainer}>
				<button className={styles.loginFormBtn}>Увійти</button>
			</div>
		</form>
	)
}
