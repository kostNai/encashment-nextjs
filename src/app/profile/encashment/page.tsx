import { authConfig } from '@/app/api/auth/[...nextauth]/config'
import styles from './encashment.module.css'
import NewOperatinForm from '@/components/newOperationForm/NewOperatinForm'
import { getServerSession } from 'next-auth'

export default async function EncashmentPage() {
	const session = await getServerSession(authConfig)
	const id = session?.user?.id
	return (
		<div className={styles.newEncashmentContainer}>
			<h2 className={styles.newEncashmentTitle}>Нове винесення</h2>
			<NewOperatinForm userId={id!} />
		</div>
	)
}
