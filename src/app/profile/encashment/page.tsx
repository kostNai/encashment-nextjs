import { newOperation } from '@/actions/actions'
import styles from './encashment.module.css'
import NewOperatinForm from '@/components/newOperationForm/NewOperatinForm'
import { getServerSession } from 'next-auth'

export default async function EncashmentPage() {
	const session = await getServerSession()
	const id = session?.user?.id
	return (
		<div className={styles.newEncashmentContainer}>
			<h2 className={styles.newEncashmentTitle}>Нове винесення</h2>
			<NewOperatinForm userId={id!} />
		</div>
	)
}
