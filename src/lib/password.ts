import { cookies } from 'next/headers'



const storedPassword = "Pacman";


export async function postPassword(value: string) {
    const submitted = value

    if (value !== storedPassword) {
        return false
    }
    cookies().set('password', submitted)

    return true
}