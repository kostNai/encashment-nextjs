import { Operation } from '@/types'
import styles from './OperatinosTable.module.css'
import { MdDeleteForever } from 'react-icons/md'

type Props = {
	operations: Operation[]
}

export default function OperationsTable({ operations }: Props) {
	return (
		<table className={styles.operationsTable}>
			<thead className={styles.operationsTableHead}>
				<tr>
					<th scope="col" className={styles.operationsTableTh}>
						Id
					</th>
					<th scope="col" className={styles.operationsTableTh}>
						Номер винесення
					</th>
					<th scope="col" className={styles.operationsTableTh}>
						Номер аптеки
					</th>
					<th scope="col" className={styles.operationsTableTh}>
						Сума(грн)
					</th>
					<th scope="col" className={styles.operationsTableTh}>
						Дата винесення
					</th>
					<th scope="col" className={styles.usersTableTh}>
						Керування
					</th>
				</tr>
			</thead>
			<tbody className={styles.operationsTableBody}>
				{operations.map((operation) => (
					<tr key={operation.id}>
						<th scope="row" className={styles.operationsTableTh}>
							{operation.id}
						</th>
						<td className={styles.operationsTableTd}>{operation.number}</td>
						<td className={styles.operationsTableTd}>
							{operation.user?.pharmacy_number}
						</td>
						<td className={styles.operationsTableTd}>{operation.total_sum}</td>
						<td className={styles.operationsTableTd}>
							{new Date(operation.created_at).toLocaleDateString()}
						</td>
						<td
							className={`${styles.operationsTableTd} ${styles.operationsTableTdBtn}`}
						>
							<div className={styles.deleteOperationContainer}>
								<MdDeleteForever size={24} className={styles.deleteIcon} />
								<span className={styles.toolTip}>Видалити</span>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
