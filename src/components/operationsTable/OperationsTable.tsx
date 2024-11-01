import styles from './OperatinosTable.module.css'

export default function OperationsTable() {
	return (
		<table className={styles.operationsTable}>
			<thead className={styles.operationsTableHead}>
				<tr>
					<th scope="col" className={styles.operationsTableTh}>
						Person
					</th>
					<th scope="col" className={styles.operationsTableTh}>
						Most interest in
					</th>
					<th scope="col" className={styles.operationsTableTh}>
						Age
					</th>
				</tr>
			</thead>
			<tbody className={styles.operationsTableBody}>
				<tr>
					<th scope="row" className={styles.operationsTableTh}>
						Chris
					</th>
					<td className={styles.operationsTableTd}>HTML tables</td>
					<td>22</td>
				</tr>
				<tr>
					<th scope="row" className={styles.operationsTableTh}>
						Dennis
					</th>
					<td className={styles.operationsTableTd}>Web accessibility</td>
					<td className={styles.operationsTableTd}>45</td>
				</tr>
				<tr>
					<th scope="row" className={styles.operationsTableTh}>
						Sarah
					</th>
					<td className={styles.operationsTableTd}>JavaScript frameworks</td>
					<td className={styles.operationsTableTd}>29</td>
				</tr>
				<tr>
					<th scope="row" className={styles.operationsTableTh}>
						Karen
					</th>
					<td className={styles.operationsTableTd}>Web performance</td>
					<td className={styles.operationsTableTd}>36</td>
				</tr>
			</tbody>
		</table>
	)
}
