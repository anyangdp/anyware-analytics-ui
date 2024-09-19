import type { AbstractPageDTO } from '@/api/core/AbstractPageDTO'

export interface BdEtlTaskInfoDTO {
	id?: string;
	description?: string;
	type?: string;
	configuration?: string;
	active?: boolean
}

export interface BdEtlTaskInfoPageDTO extends BdEtlTaskInfoDTO, AbstractPageDTO{
}
