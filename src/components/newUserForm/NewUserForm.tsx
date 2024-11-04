'use client'
import { useEffect, useState } from 'react'
import styles from './NewUserForm.module.css'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { addUser } from '@/actions/actions'
import { useFormState } from 'react-dom'

const initialState = {
	message: '',
	success: false
}

export default function NewUserForm() {
	const [isText, setIsText] = useState<boolean | undefined>(false)
	const [state, formAction] = useFormState(addUser, initialState)
	const [errorsList, setErrorsList] = useState<string[] | undefined>([])

	useEffect(() => {
		if (!state.success) setErrorsList(state.message)
	}, [state])

	const onResetHandler = () => {
		setErrorsList([])
	}

	return (
		<form action={formAction} className={styles.addUserForm}>
			<h2 className={styles.addUserFormTitle}>Новий користувач</h2>
			<div className={styles.addUserFormLabelesContainer}>
				<label htmlFor="username" className={styles.addUserFormLabel}>
					Логін
					<input
						type="text"
						name="username"
						className={styles.addUserFormInput}
					/>
				</label>
				<label htmlFor="email" className={styles.addUserFormLabel}>
					Email
					<input type="text" name="email" className={styles.addUserFormInput} />
				</label>
				<label htmlFor="password" className={styles.addUserFormLabel}>
					Пароль
					<div className={styles.passwordInputContainer}>
						<input
							type={isText ? 'text' : 'password'}
							name="password"
							className={`${styles.addUserFormInput} ${styles.passwordInput}`}
						/>
						<div className={styles.iconContainer}>
							{isText ? (
								<IoEyeOffOutline
									className={styles.icon}
									style={{ color: 'black' }}
									onClick={() => setIsText(!isText)}
								/>
							) : (
								<IoEyeOutline
									className={styles.icon}
									style={{ color: 'black' }}
									onClick={() => setIsText(!isText)}
								/>
							)}
						</div>
					</div>
				</label>
				<label htmlFor="name" className={styles.addUserFormLabel}>
					Ім'я
					<input type="text" name="name" className={styles.addUserFormInput} />
				</label>
				<label htmlFor="pharmacy_number" className={styles.addUserFormLabel}>
					Номер аптеки
					<input
						type="text"
						name="pharmacy_number"
						className={styles.addUserFormInput}
					/>
				</label>
			</div>
			{!state.success && <p className={styles.errors}>{state.message}</p>}
			<div className={styles.addUserFormBtns}>
				<button
					type="submit"
					className={`${styles.addUserFormBtn} ${styles.btnSuccess}`}
				>
					Додати
				</button>
				<button
					type="reset"
					className={`${styles.addUserFormBtn} ${styles.btnCancel}`}
					onClick={onResetHandler}
				>
					Очистити
				</button>
			</div>
		</form>
	)
}
