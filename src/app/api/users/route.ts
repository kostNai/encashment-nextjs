import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	const res = await axios.get(`${process.env.API_URL}/users`)

	const users = await res.data.users

	return NextResponse.json({ users })
}

export async function DELETE(req: NextRequest) {
	const data = await req.json()
	const userId = data.id

	try {
		const res = await axios.delete(`${process.env.API_URL}/users/${userId}`)

		return NextResponse.json({ message: 'Успішно видалено' })
	} catch (error: any) {
		return NextResponse.json(
			{ message: error.response.data.message },
			{ status: 404 }
		)
	}
}
