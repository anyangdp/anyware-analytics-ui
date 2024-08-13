<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import { getDictDataList as di } from '@/utils/dict.util'
import PureTable from '@/components/PureTable/PureTable.vue'
import OrgDrawer from '@/views/System/Org/components/OrgDrawer.vue'
import { SYS_ORG_AUTHOR } from '@/recursos/constantes/author.constant'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { addOrg, delOrg, editOrg, getOrgTreeList } from '@/api/system/org'
import type { OrgTreeListRes } from '@/api/system/interfaces/org.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import { appStatusDic, appTrueFalseDic } from '@/recursos/dictionaries/app.dictionary'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'

/**
 * @description 初始化请求参数
 */
const initParam = reactive({ id: 0 })

/**
 * @description pureTable 实例
 */
const pureTable = ref<PureTableInstance>()

/**
 * @description 定义 drawer 实例
 */
const drawerRef = ref<InstanceType<typeof OrgDrawer> | null>(null)

/**
 * @description 表格列配置项
 */
const columns = reactive<ColumnProps<OrgTreeListRes>[]>([
	{ type: 'index', label: '#', width: 80 },
	{ prop: 'name', label: '机构名称', search: { el: 'input' }, align: 'left' },
	{ prop: 'code', label: '机构编号', search: { el: 'input' }, width: 110 },
	{ prop: 'level', label: '级别', width: 80 },
	{ prop: 'isManage', label: '管理部门', width: 80, tag: true, enum: appTrueFalseDic },
	{ prop: 'isExecute', label: '执行部门', width: 80, tag: true, enum: appTrueFalseDic },
	{
		prop: 'type',
		label: '机构类型',
		width: 80,
		search: { el: 'select-v2' },
		enum: di('org_type'),
		fieldNames: { label: 'value', value: 'code' }
	},
	{ prop: 'orderNo', label: '排序', width: 130 },
	{ prop: 'status', label: '状态', width: 110, tag: true, enum: appStatusDic },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 130 }
])

/**
 * @description 删除
 * @param params {OrgTreeListRes} 行数据
 */
const del = async (params: OrgTreeListRes) => {
	await useHandleData(delOrg, params.id, `删除【${params.name}】`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer
 * @param title {string} 名称
 * @param row {OrgTreeListRes} 行数据
 */
const openDrawer = (
	title: string,
	row: Partial<OrgTreeListRes> = {
		orderNo: 99,
		status: 1,
		isManage: 0,
		isExecute: 0
	}
) => {
	const params: DrawerProps<OrgTreeListRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addOrg : title === '编辑' ? editOrg : undefined,
		getTableList: pureTable.value?.getTableList,
		data: pureTable.value?.tableData
	}
	drawerRef.value?.acceptParams(params)
}
</script>

<template>
	<div class="main-box">
		<div class="table-box">
			<PureTable
				ref="pureTable"
				row-key="id"
				:indent="20"
				:pagination="false"
				:columns="columns"
				:request-api="getOrgTreeList"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 4, lg: 7, xl: 7 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button v-author="SYS_ORG_AUTHOR.ADD" type="primary" @click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link v-author="SYS_ORG_AUTHOR.UPDATE" @click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" link v-author="SYS_ORG_AUTHOR.DELETE" @click="del(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<OrgDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
