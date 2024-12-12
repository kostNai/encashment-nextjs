import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    const res = await axios.get(`${process.env.API_URL}/operations`)

    const operations = await res.data.operations

    return NextResponse.json({ operations })
}
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    try {
        const res = await axios.delete(
            `${process.env.API_URL}/operations/${id}`
        )

        return NextResponse.json({ message: 'Успішно видалено', status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.response.data.message },
            { status: 404 }
        )
    }
}
