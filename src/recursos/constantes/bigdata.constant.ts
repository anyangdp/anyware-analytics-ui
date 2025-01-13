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
/**
 * @description 数据源类型
 */
export const ETL_TASK_TYPE = [
	{ label: '单源任务', value: 'SINGLE_TASK' },
	// { label: '多源任务', value: 'MULTI_TASK' },
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