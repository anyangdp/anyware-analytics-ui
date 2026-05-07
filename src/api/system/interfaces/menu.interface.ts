import type { AbstractDTO } from '@/api/core/AbstractDTO'

export interface SPermissionDTO extends AbstractDTO<string> {
	name?: string
	showAlways?: number
	level?: number
	type?: number
	title?: string
	path?: string
	icon?: string
	httpMethod?: string
	parentId?: string
	description?: string
	sort?: number
}

export interface SMenuPermissionRspDTO extends AbstractDTO<string> {
	id?: string
	name?: string
	showAlways?: number
	type?: number
	level?: number
	title?: string
	path?: string
	component?: string
	parentId?: string
	icon?: string
	sort?: number
	status?: number
	active?: number
	children?: SMenuPermissionRspDTO[]
}

export type MenuListReq = SPermissionDTO

export type MenuListRes = SMenuPermissionRspDTO

export type MenuEditReq = SPermissionDTO