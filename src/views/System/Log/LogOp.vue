<script setup lang="tsx">
import { getLogOpPage } from '@/api/system/log'
import { logLevelDic } from '@/recursos/dictionaries/app.dictionary'
import type { LogOpPageRes } from '@/api/system/interfaces/log.interface'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'

/**
 * @description PureTable 实例
 */
const initParam = reactive({})
const pureTable = ref<PureTableInstance>()

/**
 * @description 页面参数
 */
const state = reactive({
	dialogVisible: false,
	content: ''
})

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<LogOpPageRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ prop: 'businessName', label: '业务模块', width: 200 },
	{ prop: 'actionName', label: '端点名称', width: 210 },
	{ prop: 'displayTitle', label: '显示名称', width: 200 },
	{ prop: 'httpMethod', label: '请求方式', width: 90 },
	{ prop: 'requestUrl', label: '请求地址', width: 300 },
	{ prop: 'logLevel', label: '级别', width: 70, tag: true, enum: logLevelDic },
	{ prop: 'threadId', label: '线程Id', width: 70 },
	{ prop: 'elapsed', label: '耗时(ms)', width: 70 },
	{ prop: 'account', label: '账号', width: 100 },
	{ prop: 'realName', label: '真实姓名', width: 100 },
	{ prop: 'remoteIp', label: 'IP地址', width: 130 },
	{ prop: 'location', label: '登录地点', width: 130 },
	{ prop: 'browser', label: '浏览器', width: 130 },
	{ prop: 'os', label: '操作系统', width: 130 },
	{
		prop: 'status',
		label: '状态',
		width: 80,
		render: scope => {
			if (scope.row.status === '200') {
				return <el-tag type='success'>成功</el-tag>
			} else {
				return <el-tag type='danger'>{scope.row.status}</el-tag>
			}
		}
	},
	{
		prop: 'logDateTime',
		label: '日志时间',
		width: 150,
		fixed: 'right',
		search: {
			el: 'date-picker',
			span: 2,
			props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD' }
		}
	}
])

/**
 * @description params 为当前所有的请求参数（包括分页），最后返回请求列表接口
 */
const getTableList = (params: any) => {
	let newParams = JSON.parse(JSON.stringify(params))
	newParams.logDateTime && (newParams.startTime = newParams.logDateTime[0])
	newParams.logDateTime && (newParams.endTime = newParams.logDateTime[1])
	delete newParams.logDateTime
	return getLogOpPage(newParams)
}
</script>

<template>
	<div class="main-box">
		<div class="table-box">
			<PureTable
				ref="pureTable"
				:columns="columns"
				:request-api="getTableList"
				:init-param="initParam"
				:toolButton="false"
				:search-col="{ xs: 1, sm: 1, md: 2, lg: 6, xl: 6 }"
			>
			</PureTable>
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
