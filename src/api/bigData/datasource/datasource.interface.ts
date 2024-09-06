import type { AbstractPageDTO } from '@/api/core/AbstractPageDTO'

export interface BdDatasourceDTO {
	id?: string;
	type?: string;
	driver?: string;
	url?: string;
	host?: string;
	port?: string;
	username?: string;
	password?: string;
	description?: string;
	configuration?: string;
	active?: boolean
}

export interface BdDatasourcePageDTO extends BdDatasourceDTO, AbstractPageDTO{
}
