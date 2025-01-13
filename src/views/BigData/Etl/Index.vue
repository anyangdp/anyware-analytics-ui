<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import PureTable from '@/components/PureTable/PureTable.vue'
import { appActiveDic } from '@/recursos/dictionaries/app.dictionary'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { addEtlTaskInfo, delEtlTaskInfo, editEtlTaskInfo, getEtlTaskInfoPage } from '@/api/bigData/etl/etl'
import { ETL_TASK_TYPE } from '@/recursos/constantes/bigdata.constant'
import type { BdEtlTaskInfoDTO } from '@/api/bigData/etl/etl.interface'
import EtlTaskInfoDrawer from '@/views/BigData/Etl/component/EtlTaskInfoDrawer.vue'
import VueJsonPretty from 'vue-json-pretty'

// PureTable 实例
const initParam = reactive({})
const pureTable = ref<PureTableInstance>()
const json = ref()
// 表格配置项
const columns = reactive<ColumnProps<BdEtlTaskInfoDTO>[]>([
	{ type: 'index', label: '序号', width: 80 },
	{ prop: 'type', label: 'etl类型', width: 150, enum: ETL_TASK_TYPE, search: { el: 'select-v2'} },
	{ prop: 'description', label: '任务说明', search: { el: 'input' } },
	{ prop: 'active', label: '状态', width: 120, tag: true, enum: appActiveDic, search: { el: 'select-v2' }  },
	// { prop: 'configuration', label: '配置', width: 130 },
	{ prop: 'operation', label: '操作', width: 200, fixed: 'right'}
])

// 删除数据源
const deleteEtlTask = async (params: BdEtlTaskInfoDTO) => {
	await useHandleData(delEtlTaskInfo, params.id, `删除【${params.description}】`)
	pureTable.value?.getTableList()
}

// 打开 drawer（新增、修改、查看）
const drawerRef = ref<InstanceType<typeof EtlTaskInfoDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<BdEtlTaskInfoDTO> = { active: true }) => {
	const params: DrawerProps<BdEtlTaskInfoDTO> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addEtlTaskInfo : title === '编辑' ? editEtlTaskInfo : undefined,
		getTableList: pureTable.value?.getTableList
	}
	drawerRef.value?.acceptParams(params)
}
let centerDialogVisible = ref(false);
const view = (row) => {
	centerDialogVisible.value = true
	json.value = JSON.parse(row!.configuration)
}

</script>

<template>
	<div class="main-box">
		<div class="table-box">
			<PureTable
				ref="pureTable"
				:columns="columns"
				:request-api="getEtlTaskInfoPage"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 2, lg: 6, xl: 6 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" @click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link @click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="primary" link @click="view(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:code"></pure-icon>
						</template>
						脚本
					</el-button>
					<el-button type="danger" link @click="deleteEtlTask(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<EtlTaskInfoDrawer ref="drawerRef" />
		</div>
		<el-dialog
			title="etl配置"
			v-model="centerDialogVisible"
			width="30%"
			destroy-on-close
			center
		>
			<span><vue-json-pretty :data="json" :editable="false" /></span>
			<template #footer>
    <span class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false"
			>确 定</el-button
			>
    </span>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
