import { RiLoader4Line } from 'react-icons/ri'
import styles from './page.module.css'

export default function loading() {
	return (
		<div className={styles.loadingContainer}>
			<RiLoader4Line size={100} className={styles.loadingIcon} />
		</div>
	)
}
