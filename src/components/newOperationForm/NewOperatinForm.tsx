'use client'
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import styles from './newOperationForm.module.css'
import { newOperation } from '@/actions/actions'
import { useFormState } from 'react-dom'
import ModalLoading from '../modalLoading/ModalLoading'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

type Props = {
	userId: string
}

const initialState = {
	message: '',
	success: false
}

export default function NewOperatinForm({ userId }: Props) {
	const addNewOperation = newOperation.bind(null, userId!)

	const [state, formAction] = useFormState(addNewOperation, initialState)
	const [isLoading, setIsLoading] = useState<boolean | undefined>(false)
	const session = useSession()

	useEffect(() => {
		if (state.success) setIsLoading(false)
		if (!session.data?.user) return redirect('/login')
	}, [state.success, session.data?.user])
	const onSubmitHandler = async () => {
		setIsLoading(true)
	}

	return isLoading ? (
		<ModalLoading />
	) : (
		<form
			action={formAction}
			className={styles.newEncashmentForm}
			onSubmit={onSubmitHandler}
		>
			<div className={styles.newEncashmentInputsTitlesContainer}>
				<h3>Номінал</h3>
				<h3>Кількість купюр</h3>
			</div>
			<div className={styles.newEncashmentInputsContainer}>
				<div className={styles.newEncashmentLabelContainer}>
					<label htmlFor="20" className={styles.newEncashmentLabel}>
						20грн
					</label>
					<input
						type="number"
						className={styles.newEncashmentInput}
						name="20"
					/>
				</div>
				<div className={styles.newEncashmentLabelContainer}>
					<label htmlFor="50" className={styles.newEncashmentLabel}>
						50грн
					</label>

					<input
						type="number"
						className={styles.newEncashmentInput}
						name="50"
					/>
				</div>
				<div className={styles.newEncashmentLabelContainer}>
					<label htmlFor="100" className={styles.newEncashmentLabel}>
						100грн
					</label>

					<input
						type="number"
						className={styles.newEncashmentInput}
						name="100"
					/>
				</div>
				<div className={styles.newEncashmentLabelContainer}>
					<label htmlFor="200" className={styles.newEncashmentLabel}>
						200грн
					</label>

					<input
						type="number"
						className={styles.newEncashmentInput}
						name="200"
					/>
				</div>
				<div className={styles.newEncashmentLabelContainer}>
					<label htmlFor="500" className={styles.newEncashmentLabel}>
						500грн
					</label>

					<input
						type="number"
						className={styles.newEncashmentInput}
						name="500"
					/>
				</div>
				<div className={styles.newEncashmentLabelContainer}>
					<label htmlFor="1000" className={styles.newEncashmentLabel}>
						1000грн
					</label>

					<input
						type="number"
						className={styles.newEncashmentInput}
						name="1000"
					/>
				</div>
			</div>
			<div className={styles.newEncashmentFormBtns}>
				<button type="submit" className={`${styles.btn} ${styles.btnSuccess}`}>
					Ок
				</button>
				<button type="reset" className={`${styles.btn} ${styles.btnCancel}`}>
					Очистити
				</button>
			</div>
		</form>
	)
}
