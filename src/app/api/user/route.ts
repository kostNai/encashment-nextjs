import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const id = searchParams.get('id')
	try {
		const res = await axios.get(`${process.env.API_URL}/users/${id}`)
		return NextResponse.json({ user: res.data.user, status: 200 })
	} catch (error: any) {
		return NextResponse.json({
			message: error.response.data.message,
			status: 404
		})
	}
}
