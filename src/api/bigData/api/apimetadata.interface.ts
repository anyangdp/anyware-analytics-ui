import type { AbstractPageDTO } from '@/api/core/AbstractPageDTO'

export interface BdApiMetadataDTO {
	id?: string;
	name?: string;
	path?: string;
	httpMethod?: string;
	handlerClass?: string;
	metadata?: string;
	description?: string;
	active?: boolean;
}

export interface BdApiMetadataDTOPageDTO extends BdApiMetadataDTO, AbstractPageDTO{
}
