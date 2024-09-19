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
	{ label: '多源任务', value: 'MULTI_TASK' },
]