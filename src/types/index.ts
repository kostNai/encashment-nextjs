export type User = {
	id?: string
	name?: string
	username?: string
	email?: string
	isAdmin?: boolean
	pharmacy_number?: number
}

export type Operation = {
	id?: string
	number?: string
	user_id?: string
	total_sum?: number
	created_at: string
	user?: User
}
