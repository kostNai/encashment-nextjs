'use client'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { MdDeleteForever } from 'react-icons/md'
import { IoCloseOutline } from 'react-icons/io5'
import { CiSearch } from 'react-icons/ci'
import { toast } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'

import { Operation } from '@/types'
import styles from './OperatinosTable.module.css'
import ConfirmModal from '../UI/confirmModal/ConfirmModal'
import { revalidateByPath } from '@/actions/actions'
import { HiArrowsUpDown } from 'react-icons/hi2'

type Props = {
    operations: Operation[]
    pharmacy_number?: number
}
const tableItems = [
    { name: 'id', title: 'Id' },
    { name: 'number', title: 'Номер винесення' },
    { name: 'pharmacy_number', title: 'Номер аптеки' },
    { name: 'total_sum', title: 'Сума' },
    { name: 'created_at', title: 'Дата винесення' },
    { name: 'action', title: 'Керування' },
]

export default function OperationsTable({
    operations,
    pharmacy_number,
}: Props) {
    const [confirm, setConfirm] = useState<boolean | undefined>(false)
    const [operationId, setOperationId] = useState<string | undefined>('')
    const [isInputValueLength, setIsInputValueLength] = useState<
        boolean | undefined
    >(false)
    const [sortingKey, setSortingKey] = useState<string | undefined>('')
    const [sortedOperations, setSortedOperations] = useState<
        Operation[] | undefined
    >([])
    const [filteredOperations, setFilteredOperations] = useState<
        Operation[] | undefined
    >([])
    const [searchValue, setSearchValue] = useState<string | undefined>('')
    const [isReverseSorting, setIsReverseSorting] = useState<
        boolean | undefined
    >(false)
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (confirm) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [confirm])

    useEffect(() => {
        if (sortedOperations!.length < 1) setSortedOperations([...operations])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, operations])

    useEffect(() => {
        setFilteredOperations([...operations!])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [operations])

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
    const onSortingHandler = (key: string) => {
        setSortingKey(key)
        if (isReverseSorting) {
            const sorted = sortedOperations?.sort((a: any, b: any) => {
                return a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0
            })
            setFilteredOperations([...sorted!])
            setIsReverseSorting(!isReverseSorting)
        } else {
            const sorted = sortedOperations?.sort((a: any, b: any) => {
                return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
            })
            setFilteredOperations([...sorted!])
            setIsReverseSorting(!isReverseSorting)
        }
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)

        if (e.target.value.length > 0) setIsInputValueLength(true)
        else setIsInputValueLength(false)

        const filtered = sortedOperations!.filter((operation: Operation) => {
            return JSON.stringify(Object.values(operation)).includes(
                e.target.value
            )
        })
        setFilteredOperations([...filtered])
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
            <div className={styles.operationsTableSearchContainer}>
                <input
                    type="text"
                    className={styles.operationsTableSearchInput}
                    placeholder="Пошук..."
                    onChange={onChangeHandler}
                    value={searchValue}
                />
                {isInputValueLength ? (
                    <IoCloseOutline
                        className={styles.operationsTableSearchIcon}
                        size={24}
                        // onClick={onResetSearchValueHandler}
                    />
                ) : (
                    <CiSearch
                        className={styles.operationsTableSearchIcon}
                        size={24}
                    />
                )}
            </div>

            <table className={styles.operationsTable}>
                <thead className={styles.operationsTableHead}>
                    <tr>
                        {tableItems.map((item) => (
                            <th
                                scope="col"
                                className={styles.operationsTableTh}
                                key={item.name}
                                onClick={() => onSortingHandler(item.name)}
                            >
                                <div
                                    className={
                                        styles.operationsTableThHeadContainer
                                    }
                                >
                                    {item.title}
                                    {sortingKey === item.name ? (
                                        <HiArrowsUpDown
                                            size={14}
                                            className={styles.sortingIcon}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styles.operationsTableBody}>
                    {filteredOperations?.map((operation) => (
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
