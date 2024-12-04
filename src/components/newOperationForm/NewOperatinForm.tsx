'use client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import styles from './newOperationForm.module.css'
import { newOperation } from '@/actions/actions'
import ModalLoading from '../modalLoading/ModalLoading'
import { toast } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'

type Props = {
	userId: string
}

const initialState = {
	message: '',
	success: false
}

const denominations: string[] = ['20', '50', '100', '200', '500', '1000']

export default function NewOperatinForm({ userId }: Props) {
	const [totalSum, setTotalSum] = useState<number | undefined>(0)

	const addNewOperation = newOperation.bind(null, userId!, totalSum!)

	const [state, formAction] = useFormState(addNewOperation, initialState)
	const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

	const refs = useRef<HTMLInputElement[]>([])
	const session = useSession()

	useEffect(() => {
		if (state.success && totalSum! > 0) {
			setIsLoading(false)
			setTotalSum(0)
			setTimeout(() => {
				toast.success(state.message, { position: 'top-right' })
			}, 100)
		}
		if (!session.data?.user) return redirect('/login')
	}, [state, session.data?.user])

	const onSubmitHandler = async (e: FormEvent) => {
		if (!refs.current.some((e) => e.value.length > 0)) {
			e.preventDefault()
			toast.error('Внесіть дані', { position: 'top-right' })
		} else setIsLoading(true)
	}
	const onResetFormHandler = (e: FormEvent) => {
		setTotalSum(0)
	}

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTotalSum(
			refs.current
				.map((el: HTMLInputElement) => +el.value * +el.name)
				.reduce((acc, currVal) => acc + currVal)
		)
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
				{denominations.map((denomination: string, indx) => (
					<div
						className={styles.newEncashmentLabelContainer}
						key={denomination}
					>
						<label htmlFor={denomination} className={styles.newEncashmentLabel}>
							{denomination}грн
						</label>
						<input
							type="number"
							className={styles.newEncashmentInput}
							name={denomination}
							ref={(el: HTMLInputElement) => {
								refs.current[indx] = el
							}}
							onChange={onChangeHandler}
						/>
					</div>
				))}
			</div>
			<div className={styles.newEncashmentTotalConteiner}>
				<h4>Загальна сума:</h4>
				<p>{totalSum} грн</p>
			</div>
			<div className={styles.newEncashmentFormBtns}>
				<button type="submit" className={`${styles.btn} ${styles.btnSuccess}`}>
					Ок
				</button>
				<button
					type="reset"
					className={`${styles.btn} ${styles.btnCancel}`}
					onClick={onResetFormHandler}
				>
					Очистити
				</button>
			</div>
		</form>
	)
}
