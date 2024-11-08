import { authConfig } from '@/app/api/auth/[...nextauth]/config'
import OperationsTable from '@/components/operationsTable/OperationsTable'
import { Operation } from '@/types'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function HistoryPage() {
	const operations: Operation[] = await (
		await axios.get('http://localhost:3000/api/operations')
	).data.operations
	const session = await getServerSession(authConfig)
	const user = session?.user

	return user?.is_admin ? (
		<OperationsTable operations={operations} />
	) : (
		<>History</>
	)
}
