import type { AbstractDTO } from '@/api/core/AbstractDTO'
import type { AbstractPageDTO } from '@/api/core/AbstractPageDTO'

export interface UserDTO extends AbstractDTO {
	username?: string
	password?: string
	nickname?: string
	avatar?: string
	createdAt?: string
	active?: boolean
}

export interface UserPageReq extends AbstractPageDTO {
	username?: string
	nickname?: string
	active?: boolean
}

export interface ResetPasswordDTO {
	id: string
	newPassword: string
}

export interface ChangePasswordDTO {
	oldPassword: string
	newPassword: string
}
