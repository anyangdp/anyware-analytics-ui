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
	datasourceInput: {
		label: '数据源查询',
		value: 'datasourceInput'
	},
	fieldMapping: {
		label: '数据处理',
    value: 'fieldMapping'
	},
	filter: {
		label: '数据处理',
    value: 'filter'
	},
	datasourceOutput: {
		label: '数据源输出',
    value: 'datasourceOutput'
	}
}