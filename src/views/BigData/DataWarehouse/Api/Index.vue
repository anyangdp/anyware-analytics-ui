<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import PureTable from '@/components/PureTable/PureTable.vue'
import { appActiveDic } from '@/recursos/dictionaries/app.dictionary'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import EtlTaskInfoDrawer from '@/views/BigData/Etl/component/EtlTaskInfoDrawer.vue'
import type { BdApiMetadataDTO } from '@/api/bigData/api/apimetadata.interface'
import { addApiMetadata, delApiMetadata, editApiMetadata, getApiMetadataPage } from '@/api/bigData/api/apimetadata'
import ApiMetadataDrawer from '@/views/BigData/DataWarehouse/Api/component/ApiMetadataDrawer.vue'

// PureTable 实例
const initParam = reactive({})
const pureTable = ref<PureTableInstance>()

// 表格配置项
const columns = reactive<ColumnProps<BdApiMetadataDTO>[]>([
	{ type: 'index', label: '序号', width: 80 },
	{ prop: 'name', label: '名称' },
	{ prop: 'path', label: '路径url', search: { el: 'input' } },
	{ prop: 'httpMethod', label: '请求方法' },
	{ prop: 'handlerClass', label: '处理类' },
	{ prop: 'description', label: '任务说明', search: { el: 'input' } },
	{ prop: 'active', label: '状态', width: 120, tag: true, enum: appActiveDic, search: { el: 'select-v2' } },
	{ prop: 'operation', label: '操作', width: 200, fixed: 'right' }
])

// 删除数据源
const deleteEtlTask = async (params: BdApiMetadataDTO) => {
	await useHandleData(delApiMetadata, params.id, `删除【${params.description}】`)
	pureTable.value?.getTableList()
}

// 打开 drawer（新增、修改、查看）
const drawerRef = ref<InstanceType<typeof EtlTaskInfoDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<BdApiMetadataDTO> = { active: false, httpMethod: 'POST' }) => {
	const params: DrawerProps<BdApiMetadataDTO> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addApiMetadata : title === '编辑' ? editApiMetadata : undefined,
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
				:request-api="getApiMetadataPage"
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
					<el-button type="danger" link @click="deleteEtlTask(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<ApiMetadataDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
