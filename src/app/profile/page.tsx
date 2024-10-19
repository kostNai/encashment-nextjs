import { getServerSession } from 'next-auth'
import { authConfig } from '../api/auth/[...nextauth]/config'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
	const session = await getServerSession(authConfig)

	return session ? <section>Page</section> : redirect('/login')
}
