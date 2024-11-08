import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
	const res = await axios.get(`${process.env.API_URL}/operations`)

	const operations = await res.data.operations

	return NextResponse.json({ operations })
}
