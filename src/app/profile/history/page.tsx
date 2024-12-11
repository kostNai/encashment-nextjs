import { authConfig } from '@/app/api/auth/[...nextauth]/config'
import OperationsTable from '@/components/operationsTable/OperationsTable'
import { Operation } from '@/types'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function HistoryPage() {
    const session = await getServerSession(authConfig)
    const user = session?.user
    console.log(user)

    const allOperations: Operation[] = await (
        await axios.get('http://localhost:3000/api/operations')
    ).data.operations

    const operationsByUser: Operation[] = await (
        await axios.get(
            `http://localhost:3000/api/operationsByUser/?id=${user?.id}`
        )
    ).data.operations

    return user?.is_admin ? (
        <OperationsTable operations={allOperations} />
    ) : (
        <OperationsTable
            operations={operationsByUser}
            pharmacy_number={user?.pharmacy_number}
        />
    )
}
