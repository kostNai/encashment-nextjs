import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    console.log('test')
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    try {
        const res = await axios.get(
            `${process.env.API_URL}/get-operations-by-user/${id}`
        )
        return NextResponse.json({
            operations: res.data.operations,
            status: 200,
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.response.data.message,
            status: 404,
        })
    }
}
