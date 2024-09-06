<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import { appActiveDic } from '@/recursos/dictionaries/app.dictionary'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { EquipmentTypePageRes } from '@/api/base/interfaces/equipmentType.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import EquipmentTypeDrawer from '@/views/Base/EquipmentType/components/EquipmentTypeDrawer.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import { addRecord, delRecord, editRecord, getRecordPage } from '@/api/base/equipmentType'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'

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
const columns = reactive<ColumnProps<EquipmentTypePageRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ prop: 'code', label: '类型编码' },
	{ prop: 'name', label: '类型名称', search: { el: 'input' } },
	{ prop: 'status', label: '状态', width: 140, tag: true, enum: appActiveDic },
	{ prop: 'sort', label: '排序', width: 140 },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 160 }
])

/**
 * @description 删除
 */
const del = async (params: EquipmentTypePageRes) => {
	await useHandleData(delRecord, params.id, `删除`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof EquipmentTypeDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<EquipmentTypePageRes> = { sort: 99, status: 1 }) => {
	const params: DrawerProps<EquipmentTypePageRes> = {
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
					<el-button type="primary" v-author="'base:equipmentType:add'" v-on:click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" v-author="'base:equipmentType:update'" link v-on:click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" v-author="'base:equipmentType:delete'" link v-on:click="del(scope.row)" style="margin-left: 5px">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<EquipmentTypeDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
