export interface AbstractDTO {
	id?: string
	createdBy?: string | null
	createAt?: string | null
	updatedBy?: string | null
	updatedAt?: string | null
	deletedBy?: string | null
	deletedAt?: string | null
	deletedMsg?: string | null
	active?: boolean | null
	deleted?: boolean | null
}
