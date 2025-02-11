import type { AbstractPageDTO } from '@/api/core/AbstractPageDTO'

export interface BdEtlTaskInfoDTO {
	id?: string;
	description?: string;
	type?: string;
	configuration?: string;
	active?: boolean
}

export interface EtlDataSourceConfiguration {
	resourceId: string;
	type?: string;
	name?: string;
	condition?: string;
	sql?: string
	mode?: string
	expands?: any;
	columns?: string
}

export interface SingleEtlConfiguration {
	source: EtlDataSourceConfiguration,
	transform?: any
	target: EtlDataSourceConfiguration
}

export interface MultiEtlConfiguration {
	sources: EtlDataSourceConfiguration[],
	transform?: any
	target: EtlDataSourceConfiguration
}

export interface SourceTable{
	resourceId?: string,
	tableList?: string[]
}

export interface BdEtlTaskInfoPageDTO extends BdEtlTaskInfoDTO, AbstractPageDTO{
}
