import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdOutlineCancel } from 'react-icons/md'
import styles from './confirmModal.module.css'

type Props = {
	userId: string
	onConfirmHandler: (userId: string) => void
	onResetHandler: () => void
}

export default function ConfirmModal({
	onConfirmHandler,
	onResetHandler,
	userId
}: Props) {
	return (
		<div className={styles.modalContainer}>
			<div className={styles.modalContent}>
				<h3 className={styles.modalTitle}>Підтвердження</h3>
				<div className={styles.modalBtnsContainer}>
					<div
						className={`${styles.btnWithToolTipSuccessContainer} ${styles.btnWithToolTipContainer}`}
					>
						<IoIosCheckmarkCircle
							className={`${styles.modalBtn} ${styles.btnSuccess}`}
							onClick={() => onConfirmHandler(userId)}
							size={48}
						/>
						<p className={`${styles.toolTip} ${styles.toolTipSuccess}`}>
							Підтвердити
						</p>
					</div>
					<div
						className={`${styles.btnWithToolTipCancelContainer} ${styles.btnWithToolTipContainer}`}
					>
						<MdOutlineCancel
							className={`${styles.modalBtn} ${styles.btnCancel}`}
							onClick={onResetHandler}
							size={48}
						/>
						<p className={`${styles.toolTip} ${styles.toolTipCancel}`}>
							Відміна
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
