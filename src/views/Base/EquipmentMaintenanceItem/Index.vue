<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import { appStatusDic } from '@/recursos/dictionaries/app.dictionary'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { addRecord, delRecord, editRecord, getRecordPage } from '@/api/base/equipmentMaintenanceItem'
import type { EquipmentMaintenanceItemDetailListRes, EquipmentMaintenanceItemPageRes } from '@/api/base/interfaces/equipmentMaintenanceItem.interface'
import EquipmentMaintenanceItemDrawer from '@/views/Base/EquipmentMaintenanceItem/components/EquipmentMaintenanceItemDrawer.vue'

/**
 * @description 初始化请求参数
 */
const initParam = reactive({})

/**
 * @description PureTable 实例
 */
const pureTable = ref<PureTableInstance>()

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<EquipmentMaintenanceItemPageRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ type: 'expand', label: '型号属性', width: 100 },
	{ prop: 'name', label: '维保项名称', search: { el: 'input' } },
	{ prop: 'unit', label: '维保项单位' },
	{ prop: 'status', label: '状态', tag: true, enum: appStatusDic },
	{ prop: 'sort', label: '排序' },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 160 }
])

/**
 * @description 检测方式表格配置项
 */
const detailColumns = reactive<ColumnProps<EquipmentMaintenanceItemDetailListRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ prop: 'detailName', label: '属性名称' },
	{ prop: 'remark', label: '属性描述' }
])

/**
 * @description 删除
 */
const del = async (params: EquipmentMaintenanceItemPageRes) => {
	await useHandleData(delRecord, params.id, `删除`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof EquipmentMaintenanceItemDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<EquipmentMaintenanceItemPageRes> = { sort: 99, status: 1 }) => {
	const params: DrawerProps<EquipmentMaintenanceItemPageRes> = {
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
					<el-button type="primary" v-author="'base:equipmentMaintenanceItem:add'" v-on:click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- Expand -->
				<template #expand="scope">
					<div class="p-20">
						<PureTable :toolButton="false" :pagination="false" :columns="detailColumns" :data="scope.row.detailList"></PureTable>
					</div>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" v-author="'base:equipmentMaintenanceItem:update'" link v-on:click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" v-author="'base:equipmentMaintenanceItem:delete'" link v-on:click="del(scope.row)" style="margin-left: 5px">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<EquipmentMaintenanceItemDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
