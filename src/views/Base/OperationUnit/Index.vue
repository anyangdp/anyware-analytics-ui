<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import { appActiveDic } from '@/recursos/dictionaries/app.dictionary'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import TransferTableDialog from '@/components/PureTransferTable/PureTransferTable.vue'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import OperationUnitDrawer from '@/views/Base/OperationUnit/components/OperationUnitDrawer.vue'
import type { OperationUnitPageRes, RelationListRes, UnRelationListRes } from '@/api/base/interfaces/operationUnit.interface'
import { addRecord, delRecord, editRecord, getRecordPage, relationList, relationSite, unRelationList, unRelationSite } from '@/api/base/operationUnit'

/**
 * @description 初始化请求参数
 */
const initParam = reactive({})

/**
 * @description 初始化请求参数
 */
const initTransferParam = reactive({ id: 0 })

/**
 * @description PureTable 实例
 */
const pureTable = ref<PureTableInstance>()

/**
 * @description 表格穿梭框句柄
 */
const transferTableDialogRef = ref<InstanceType<typeof TransferTableDialog>>()

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<OperationUnitPageRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ prop: 'shortName', label: '运维单位简称' },
	{ prop: 'name', label: '运维单位名称', search: { el: 'input' } },
	{ prop: 'relationSiteNumber', label: '关联站点数' },
	{ prop: 'sort', label: '排序', width: 140 },
	{ prop: 'status', label: '状态', width: 140, tag: true, enum: appActiveDic },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 200 }
])

/**
 * @description 表格配置项
 */
const transferColumns = reactive<ColumnProps<RelationListRes>[]>([
	{ type: 'selection', label: '#', width: 50 },
	{ prop: 'siteName', label: '站点名称', search: { el: 'input' } },
	{ prop: 'siteTownShipName', label: '所属乡镇' }
])

/**
 * @description 删除
 */
const del = async (params: OperationUnitPageRes) => {
	await useHandleData(delRecord, params.id, `删除`)
	pureTable.value?.getTableList()
}

/**
 * @description 关联站点
 */
const relation = async (params: OperationUnitPageRes) => {
	initTransferParam.id = params.id
	transferTableDialogRef.value?.openDialog()
}

/**
 * @description 关联站点
 */
const relationData = async (data: UnRelationListRes[], param: any) => {
	let values = data.map((item: UnRelationListRes) => {
		return item.id
	})
	if (values.length > 0) {
		await relationSite({ operationUnitId: param.id, siteIds: values })
	}
}

/**
 * @description 取消关联
 */
const unRelationData = async (data: RelationListRes[]) => {
	let values = data.map((item: RelationListRes) => {
		return item.id
	})
	if (values.length > 0) {
		await unRelationSite({ ids: values })
	}
}

/**
 * @description 刷新当前表格
 */
const reloadTable = () => {
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof OperationUnitDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<OperationUnitPageRes> = { sort: 99, status: 1 }) => {
	const params: DrawerProps<OperationUnitPageRes> = {
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
					<el-button type="primary" v-author="'base:operationUnit:add'" v-on:click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" v-author="'base:operationUnit:update'" link v-on:click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" v-author="'base:operationUnit:delete'" link v-on:click="del(scope.row)" style="margin-left: 5px">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
					<el-button type="primary" v-author="'base:operationUnit:relation'" link v-on:click="relation(scope.row)" style="margin-left: 5px">
						<template #icon>
							<pure-icon name="pi-carbon:chart-relationship"></pure-icon>
						</template>
						关联
					</el-button>
				</template>
			</PureTable>
			<OperationUnitDrawer ref="drawerRef" />
		</div>
		<TransferTableDialog
			ref="transferTableDialogRef"
			:request-left-api="unRelationList"
			:request-right-api="relationList"
			:columns="transferColumns"
			:pagination="false"
			:init-param="initTransferParam"
			@relation="relationData"
			@un-relation="unRelationData"
			@reload="reloadTable"
		></TransferTableDialog>
	</div>
</template>

<style scoped lang="scss"></style>
