/**
 * @description 数据源类型
 */
export const DATA_SOURCE_TYPE = [
	{ label: 'MYSQL', value: 'MYSQL' },
	{ label: 'ORACLE', value: 'ORACLE' },
	{ label: 'SQLSERVER', value: 'SQLSERVER' },
	{ label: 'POSTGRESQL', value: 'POSTGRESQL' },
	{ label: 'CLICKHOUSE', value: 'CLICKHOUSE' },
	{ label: 'HIVE', value: 'HIVE' },
	{ label: 'HBASE', value: 'HBASE' },
	{ label: 'HDFS', value: 'HDFS' },
	{ label: 'CASSANDRA', value: 'CASSANDRA' },
	{ label: 'REDIS', value: 'REDIS' },
	{ label: 'MONGODB', value: 'MONGODB' },
	{ label: 'UNKNOWN', value: 'UNKNOWN' }
]

export const DATA_SOURCE_TYPE_OBJ = {
	MYSQL: 'MYSQL',
	POSTGRESQL: 'POSTGRESQL',
	CLICKHOUSE: 'CLICKHOUSE',
}
/**
 * @description 数据源类型
 */
export const ETL_TASK_TYPE = [
	{ label: '可视化任务', value: 'VISUALIZATION_TASK' },
	{ label: '单源批处理任务', value: 'SINGLE_BATCH_TASK' },
	{ label: '多源批处理任务', value: 'MULTI_BATCH_TASK' },
]
/**
 * @description 写入模式
 */
//     // 模式：override 重写，append 追加，errorIfExist 存在重复提示错误，ignoreIfExist 存在重复忽略
export const ETL_LOAD_MODE = [
	{ label: '默认', value: 'defaultMode' },
	{ label: '重写', value: 'override' },
	{ label: '追加', value: 'append' },
	{ label: '存在重复提示错误', value: 'errorIfExist' },
	{ label: '存在重复忽略', value: 'ignoreIfExist' },
]
export const ETL_COMPONENT = {
	DATASOURCE_INPUT: {
		label: '数据源查询',
		value: 'DATASOURCE_INPUT'
	},
	FIELD_MAPPING: {
		label: '数据映射',
    value: 'FIELD_MAPPING'
	},
	FILTER: {
		label: '数据过滤',
    value: 'FILTER'
	},
	CLEAN: {
		label: '数据清洗',
    value: 'CLEAN'
	},
	DATASOURCE_OUTPUT: {
		label: '数据源输出',
    value: 'DATASOURCE_OUTPUT'
	}
}
export const ruleType = {
	SIMPLE: "SIMPLE",
	COMPOSITE: "COMPOSITE"
}
export const logicEnum = {
	AND: "AND",
	OR: "OR"
}
export const logicOptions = [
	{ label: '且', value: 'AND' },
	{ label: '或', value: 'OR' },
];

export const operatorOptions = [
	{ label: '等于', value: 'EQUALS', requiresValue: true },
	{ label: '不等于', value: 'NOT_EQUALS', requiresValue: true },
	{ label: '大于', value: 'GREATER_THAN', requiresValue: true },
	{ label: '小于', value: 'LESS_THAN', requiresValue: true },
	{ label: '大于等于', value: 'GREATER_THAN_OR_EQUAL', requiresValue: true },
	{ label: '小于等于', value: 'LESS_THAN_OR_EQUAL', requiresValue: true },
	{ label: '正则匹配', value: 'REGEX', requiresValue: true },
	{ label: '为空', value: 'IS_EMPTY', requiresValue: false },
	{ label: '非空', value: 'IS_NOT_EMPTY', requiresValue: false },
	{ label: '包含', value: 'CONTAINS', requiresValue: true },
];

export const cleanOperationOptions = [
	{ label: '去除空格', value: 'TRIM', requiresValue: false },
	{ label: '转换为大写', value: 'TO_UPPER_CASE', requiresValue: false },
	{ label: '转换为小写', value: 'TO_LOWER_CASE', requiresValue: false },
	{ label: '填充默认值', value: 'DEFAULT_VALUE', requiresValue: true },
	{ label: '格式化日期', value: 'FORMAT_DATE', requiresValue: true },
	{ label: '移除特殊字符', value: 'REMOVE_SPECIAL_CHARS', requiresValue: false },
	{ label: '正则替换', value: 'REGEX_REPLACE', requiresValue: true },
];