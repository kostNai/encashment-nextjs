import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
	const res = await axios.get(`${process.env.API_URL}/users`)

	const users = await res.data.users

	return NextResponse.json({ users })
}
