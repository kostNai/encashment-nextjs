'use client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import styles from './newOperationForm.module.css'
import { newOperation } from '@/actions/actions'
import ModalLoading from '../modalLoading/ModalLoading'

type Props = {
	userId: string
}

const initialState = {
	message: '',
	success: false
}

const denominations: string[] = ['20', '50', '100', '200', '500', '1000']

export default function NewOperatinForm({ userId }: Props) {
	const addNewOperation = newOperation.bind(null, userId!)

	const [state, formAction] = useFormState(addNewOperation, initialState)
	const [isLoading, setIsLoading] = useState<boolean | undefined>(false)
	const [disable, setDisable] = useState<boolean | undefined>(true)
	const [rerenderVar, setRerenderVar] = useState<number>(0)
	const [totalSum, setTotalSum] = useState<number | undefined>(0)

	const refs = useRef<HTMLInputElement[]>([])
	const session = useSession()

	useEffect(() => {
		if (state.success) setIsLoading(false)
		if (!session.data?.user) return redirect('/login')
		refs.current.some((e) => e.value.length > 0)
			? setDisable(false)
			: setDisable(true)
	}, [state.success, session.data?.user, rerenderVar])

	const onSubmitHandler = async () => {
		setIsLoading(true)
	}
	const onResetFormHandler = (e: FormEvent) => {
		setDisable(true)
		setTotalSum(0)
	}

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTotalSum(
			refs.current
				.map((el: HTMLInputElement) => +el.value * +el.name)
				.reduce((acc, currVal) => acc + currVal)
		)
		setRerenderVar(rerenderVar + 1)
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
				<button
					type="submit"
					className={
						disable
							? `${styles.btn} ${styles.btnSuccess} ${styles.btnDisabled}`
							: `${styles.btn} ${styles.btnSuccess}`
					}
					disabled={disable}
				>
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
