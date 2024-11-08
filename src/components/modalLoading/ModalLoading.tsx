import { RiLoader4Line } from 'react-icons/ri'
import styles from './modalLoading.module.css'

export default function ModalLoading() {
	return (
		<div className={styles.laodingContainer}>
			<RiLoader4Line className={styles.laodingIcon} size={100} />
		</div>
	)
}
