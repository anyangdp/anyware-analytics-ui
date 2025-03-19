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


export interface QueryConfig {
	headers: { 'Content-Type': string[] };
	sql: string | null;
	selectFields: Field[];
	returnType: 'LIST' | 'OBJECT';
	tableName: string;
	conditions: FilterCondition[];
	groupBy: GroupBy[];
	orderBy: OrderBy[];
	pageEnable: boolean;
	resourceId: string;
}

export interface Field {
	column: string;
	columnAlias?: string;
}

export interface FilterCondition {
	field: string;
	expr: string;
	value: string | number | null;
	type: 'int' | 'string';
	required: boolean;
	defaultValue: string | number | null;
	logicalOperator: 'AND' | 'OR';
	subConditions: FilterCondition[];
}

export interface GroupBy {
	column: string;
}
export interface OrderBy {
	column: string;
	asc: boolean;
}