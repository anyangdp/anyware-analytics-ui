<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import { getListEquipmentBrand } from '@/api/base/equipmentBrand'
import { appStatusDic } from '@/recursos/dictionaries/app.dictionary'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { getListEquipmentCategory } from '@/api/base/equipmentCategory'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { addRecord, delRecord, editRecord, getRecordPage } from '@/api/base/equipmentModel'
import type { EquipmentModelPageRes } from '@/api/base/interfaces/equipmentModel.interface'
import EquipmentModelDrawer from '@/views/Base/EquipmentModel/components/EquipmentModelDrawer.vue'
import EquipmentModelFileDrawer from '@/views/Base/EquipmentModel/components/EquipmentModelFileDrawer.vue'

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
const columns = reactive<ColumnProps<EquipmentModelPageRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{
		prop: 'equipmentCategoryId',
		label: '设备类别',
		enum: getListEquipmentCategory,
		fieldNames: { label: 'name', value: 'id' },
		search: { el: 'select-v2' }
	},
	{
		prop: 'equipmentBrandId',
		label: '设备品牌',
		enum: getListEquipmentBrand,
		fieldNames: { label: 'name', value: 'id' },
		search: { el: 'select-v2' }
	},
	{ prop: 'power', label: '设备功率（KW）' },
	{ prop: 'specification', label: '规格型号' },
	{ prop: 'status', label: '状态', width: 140, tag: true, enum: appStatusDic },
	{ prop: 'sort', label: '排序', width: 140 },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 200 }
])

/**
 * @description 删除
 */
const del = async (params: EquipmentModelPageRes) => {
	await useHandleData(delRecord, params.id, `删除`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof EquipmentModelDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<EquipmentModelPageRes> = { sort: 99, status: 1 }) => {
	const params: DrawerProps<EquipmentModelPageRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addRecord : title === '编辑' ? editRecord : undefined,
		getTableList: pureTable.value?.getTableList
	}
	drawerRef.value?.acceptParams(params)
}

/**
 * @description 打开 drawer（文件管理）
 */
const fileDrawerRef = ref<InstanceType<typeof EquipmentModelFileDrawer> | null>(null)
const openFileDrawer = (title: string, row: Partial<EquipmentModelPageRes> = { sort: 99, status: 1 }) => {
	const params: DrawerProps<EquipmentModelPageRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: undefined,
		getTableList: pureTable.value?.getTableList
	}
	fileDrawerRef.value?.acceptParams(params)
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
					<el-button type="primary" v-author="'base:equipmentModel:add'" v-on:click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" v-author="'base:equipmentModel:update'" link v-on:click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" v-author="'base:equipmentModel:delete'" link v-on:click="del(scope.row)" style="margin-left: 5px">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
					<el-button
						type="primary"
						v-author="'base:equipmentCategory:delete'"
						link
						v-on:click="openFileDrawer('设备资料', scope.row)"
						style="margin-left: 5px"
					>
						<template #icon>
							<pure-icon name="pi-carbon:document-add"></pure-icon>
						</template>
						资料
					</el-button>
				</template>
			</PureTable>
			<EquipmentModelDrawer ref="drawerRef" />
			<EquipmentModelFileDrawer ref="fileDrawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
