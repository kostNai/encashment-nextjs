'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './editDialog.module.css'

type Props = {
	title: string
	confirmEdit: boolean
	name: string
	setConfirmEdit: (confirmEdit: boolean) => void
}
export default function EditDialog({
	title,
	confirmEdit,
	name,
	setConfirmEdit
}: Props) {
	const editDialogRef = useRef<HTMLDialogElement>(null)
	// const [confirmEdit,setConfirmEdit] = useState<boolean|undefined>(false)

	useEffect(() => {
		if (confirmEdit) {
			editDialogRef.current?.showModal()
		} else {
			editDialogRef.current?.close()
		}
	}, [confirmEdit])

	return (
		<dialog ref={editDialogRef} className={styles.editDialog}>
			<form method="dialog" className={styles.editDiaogForm}>
				<label htmlFor={name} className={styles.editDialogTitle}>
					Змінити {title}
				</label>
				<input type="text" name={name} className={styles.editDialogInput} />
				<div className={styles.editDialogBtnContainer}>
					<button className={`${styles.editDialogBtn} ${styles.btnSuccess}`}>
						Підтвердити
					</button>
					<button
						onClick={() => setConfirmEdit(false)}
						className={`${styles.editDialogBtn} ${styles.btnCancel}`}
					>
						Відміна
					</button>
				</div>
			</form>
		</dialog>
	)
}
