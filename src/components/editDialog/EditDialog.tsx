'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './editDialog.module.css'
import { useFormState } from 'react-dom'
import { editUser } from '@/actions/actions'
import { toast } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'
import { mutateData } from '@/lib/fetcher'

type Props = {
	title: string
	confirmEdit: boolean
	name: string
	id: string
	setConfirmEdit: (confirmEdit: boolean) => void
}

const initialState = { message: '', success: false }
export default function EditDialog({
	title,
	confirmEdit,
	name,
	id,
	setConfirmEdit
}: Props) {
	const editDialogRef = useRef<HTMLDialogElement>(null)
	const editUserWithId = editUser.bind(null, id)
	const [state, formAction] = useFormState(editUserWithId, initialState)
	const [inputValue, setInputValue] = useState<string | undefined>('')

	useEffect(() => {
		if (confirmEdit) {
			editDialogRef.current?.showModal()
		} else {
			editDialogRef.current?.close()
		}
	}, [confirmEdit])

	useEffect(() => {
		if (state.success) {
			toast.success(state.message)
			setConfirmEdit(false)
			mutateData(`http://127.0.0.1:8000/api/users/${id}`)
			setInputValue('')
		}
	}, [state])

	return (
		<dialog ref={editDialogRef} className={styles.editDialog}>
			<form className={styles.editDiaogForm} action={formAction}>
				<label htmlFor={name} className={styles.editDialogTitle}>
					Змінити {title}
				</label>
				<input
					type="text"
					name={name}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className={styles.editDialogInput}
				/>
				<div className={styles.editDialogBtnContainer}>
					<button
						className={`${styles.editDialogBtn} ${styles.btnSuccess}`}
						type="submit"
					>
						Підтвердити
					</button>
					<button
						onClick={() => setConfirmEdit(false)}
						className={`${styles.editDialogBtn} ${styles.btnCancel}`}
						type="reset"
					>
						Відміна
					</button>
				</div>
			</form>
		</dialog>
	)
}
