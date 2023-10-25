import { cookies } from 'next/headers'

const setPassword = process.env.PASSWORD;



export async function POST(req: Request) {

    const { password } = await req.json()

    const isValidated = password === setPassword

    if (isValidated) {
        cookies().set('password', password)
    }

    return Response.json({ isValidated })

}

export async function GET() {

    const cookieStore = cookies()

    const password = cookieStore.get('password')

    const isValidated = password?.value !== setPassword

    return Response.json({ isValidated })

}