<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import { appStatusDic, MonitorSiteTypeTypeDic } from '@/recursos/dictionaries/app.dictionary'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { addRecord, delRecord, editRecord, getRecordPage } from '@/api/base/monitorSiteType'
import type { MonitorSiteTypePageRes } from '@/api/base/interfaces/monitorSiteType.interface'
import MonitorSiteTypeDrawer from '@/views/Base/MonitorSiteType/components/MonitorSiteTypeDrawer.vue'

/**
 * 初始化请求参数
 */
const initParam = reactive({})

/**
 * PureTable 实例
 */
const pureTable = ref<PureTableInstance>()

/**
 * 表格配置项
 */
const columns = reactive<ColumnProps<MonitorSiteTypePageRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ prop: 'name', label: '类型名称', search: { el: 'input' } },
	{ prop: 'monitorSiteType', label: '类型标识', enum: MonitorSiteTypeTypeDic },
	{ prop: 'sort', label: '排序', width: 140 },
	{ prop: 'status', label: '状态', tag: true, enum: appStatusDic, width: 140 },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 140 }
])

/**
 * 删除
 */
const del = async (params: MonitorSiteTypePageRes) => {
	await useHandleData(delRecord, params.id, `删除`)
	pureTable.value?.getTableList()
}

/**
 * 打开 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof MonitorSiteTypeDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<MonitorSiteTypePageRes> = { sort: 99, status: 1 }) => {
	const params: DrawerProps<MonitorSiteTypePageRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addRecord : title === '编辑' ? editRecord : undefined,
		getTableList: pureTable.value?.getTableList
	}
	drawerRef.value?.acceptParams(params)
}
</script>

<template>
	<div class="main-box">
		<div class="table-box">
			<PureTable
				ref="pureTable"
				:columns="columns"
				:request-api="getRecordPage"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 2, lg: 7, xl: 7 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" v-on:click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link v-on:click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" link v-on:click="del(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<MonitorSiteTypeDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
