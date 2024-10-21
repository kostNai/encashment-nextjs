import styles from './encashment.module.css'

export default function EncashmentPage() {
	return (
		<div className={styles.newEncashmentContainer}>
			<h2 className={styles.newEncashmentTitle}>Нове винесення</h2>
			<form action="" className={styles.newEncashmentForm}>
				<div className={styles.newEncashmentInputsTitlesContainer}>
					<h3>Номінал</h3>
					<h3>Кількість купюр</h3>
				</div>
				<div className={styles.newEncashmentInputsContainer}>
					<div className={styles.newEncashmentLabelContainer}>
						<label htmlFor="" className={styles.newEncashmentLabel}>
							20грн
						</label>
						<input type="number" className={styles.newEncashmentInput} />
					</div>
					<div className={styles.newEncashmentLabelContainer}>
						<label htmlFor="" className={styles.newEncashmentLabel}>
							50грн
						</label>

						<input type="number" className={styles.newEncashmentInput} />
					</div>
					<div className={styles.newEncashmentLabelContainer}>
						<label htmlFor="" className={styles.newEncashmentLabel}>
							100грн
						</label>

						<input type="number" className={styles.newEncashmentInput} />
					</div>
					<div className={styles.newEncashmentLabelContainer}>
						<label htmlFor="" className={styles.newEncashmentLabel}>
							200грн
						</label>

						<input type="number" className={styles.newEncashmentInput} />
					</div>
					<div className={styles.newEncashmentLabelContainer}>
						<label htmlFor="" className={styles.newEncashmentLabel}>
							500грн
						</label>

						<input type="number" className={styles.newEncashmentInput} />
					</div>
					<div className={styles.newEncashmentLabelContainer}>
						<label htmlFor="" className={styles.newEncashmentLabel}>
							1000грн
						</label>

						<input type="number" className={styles.newEncashmentInput} />
					</div>
				</div>
				<div className={styles.newEncashmentFormBtns}>
					<button
						type="submit"
						className={`${styles.btn} ${styles.btnSuccess}`}
					>
						Ок
					</button>
					<button type="reset" className={`${styles.btn} ${styles.btnCancel}`}>
						Очистити
					</button>
				</div>
			</form>
		</div>
	)
}
