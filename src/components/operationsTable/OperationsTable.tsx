'use client'
import { Operation } from '@/types'
import styles from './OperatinosTable.module.css'
import { MdDeleteForever } from 'react-icons/md'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ConfirmModal from '../UI/confirmModal/ConfirmModal'
import { toast } from 'react-toastify'
import { revalidateByPath } from '@/actions/actions'
import 'react-toastify/ReactToastify.min.css'

type Props = {
    operations: Operation[]
    pharmacy_number?: number
}

export default function OperationsTable({
    operations,
    pharmacy_number,
}: Props) {
    const [confirm, setConfirm] = useState<boolean | undefined>(false)
    const [operationId, setOperationId] = useState<string | undefined>('')
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (confirm) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [confirm])

    const onConfirmHandler = (id: string) => {
        setConfirm(true)
        setOperationId(id)
    }

    const onDeleteHandler = async (id: string) => {
        const res = await axios.delete(
            `http://localhost:3000/api/operations/?id=${id}`
        )
        if (res.status === 200) {
            setConfirm(false)
            toast.success('Видалено успішно')
            setTimeout(() => {
                revalidateByPath('/profile/history')
            }, 500)
        }
        console.log(res.status)
    }
    const onResetHandler = () => {
        setConfirm(false)
    }

    return (
        <div>
            <dialog ref={dialogRef} className={styles.deleteDialog}>
                <form method="dialog">
                    {confirm && (
                        <ConfirmModal
                            operationId={operationId}
                            onConfirmHandler={() =>
                                onDeleteHandler(operationId!)
                            }
                            onResetHandler={onResetHandler}
                        />
                    )}
                </form>
            </dialog>

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
                            <th
                                scope="row"
                                className={styles.operationsTableTh}
                            >
                                {operation.id}
                            </th>
                            <td className={styles.operationsTableTd}>
                                {operation.number}
                            </td>
                            <td className={styles.operationsTableTd}>
                                {operation.user
                                    ? operation.user?.pharmacy_number
                                    : pharmacy_number}
                            </td>
                            <td className={styles.operationsTableTd}>
                                {operation.total_sum}
                            </td>
                            <td className={styles.operationsTableTd}>
                                {new Date(
                                    operation.created_at
                                ).toLocaleDateString()}
                            </td>
                            <td
                                className={`${styles.operationsTableTd} ${styles.operationsTableTdBtn}`}
                            >
                                <div
                                    className={styles.deleteOperationContainer}
                                >
                                    <MdDeleteForever
                                        size={24}
                                        className={styles.deleteIcon}
                                        onClick={() =>
                                            onConfirmHandler(operation.id!)
                                        }
                                    />
                                    <span className={styles.toolTip}>
                                        Видалити
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
