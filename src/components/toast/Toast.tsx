import { ToastType } from '@/types'
import styles from './Toast.module.css'
import { FaRegCheckCircle } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { PiWarningCircleFill } from 'react-icons/pi'

type Props = {
	message: string
	type: ToastType
}

export default function Toast({ message, type }: Props) {
	return (
		<div
			className={`${styles.toastContainer} ${
				type === 'success' ? styles.bgSuccess : styles.bgError
			}`}
		>
			<div className={styles.toastTypeIconContainer}>
				{type === 'success' ? (
					<FaRegCheckCircle className={styles.toastTypeIcon} size={32} />
				) : (
					<PiWarningCircleFill className={styles.toastTypeIcon} size={32} />
				)}
			</div>
			<div className={styles.toastMessageContainer}>{message}</div>
			<div className={styles.toastCloseContainer}>
				<IoClose className={styles.toastCloseIcon} size={16} />
			</div>
		</div>
	)
}
