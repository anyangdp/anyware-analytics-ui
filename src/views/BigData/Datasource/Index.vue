<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import PureTable from '@/components/PureTable/PureTable.vue'
import { appActiveDic } from '@/recursos/dictionaries/app.dictionary'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { BdDatasourceDTO } from '@/api/bigData/datasource/datasource.interface'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { addDatasource, delDatasource, editDatasource, getDatasourcePage } from '@/api/bigData/datasource/datasource'
import DatasourceDrawer from '@/views/BigData/Datasource/component/DatasourceDrawer.vue'
import { DATA_SOURCE_TYPE } from '@/recursos/constantes/bigdata.constant'

// PureTable 实例
const initParam = reactive({})
const pureTable = ref<PureTableInstance>()

// 表格配置项
const columns = reactive<ColumnProps<BdDatasourceDTO>[]>([
	{ type: 'index', label: '序号', width: 80 },
	{ prop: 'type', label: '数据源类型', enum: DATA_SOURCE_TYPE, search: { el: 'select-v2'} },
	{ prop: 'description', label: '数据源说明', search: { el: 'input' } },
	{ prop: 'host', label: 'ip', width: 130 },
	{ prop: 'port', label: '端口', width: 130 },
	{ prop: 'driver', label: '驱动', width: 130 },
	{ prop: 'username', label: '用户名', width: 130 },
	{ prop: 'password', label: '密码', width: 130 },
	{ prop: 'active', label: '状态', width: 120, tag: true, enum: appActiveDic, search: { el: 'select-v2' }  },
	{ prop: 'url', label: '连接url', width: 130 },
	{ prop: 'configuration', label: '高级配置', width: 130 },
	{ prop: 'operation', label: '操作', width: 200, fixed: 'right'}
])

// 删除数据源
const deleteDatasource = async (params: BdDatasourceDTO) => {
	await useHandleData(delDatasource, params.id, `删除【${params.description}】`)
	pureTable.value?.getTableList()
}

// 打开 drawer（新增、修改、查看）
const drawerRef = ref<InstanceType<typeof DatasourceDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<BdDatasourceDTO> = { active: true }) => {
	const params: DrawerProps<BdDatasourceDTO> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addDatasource : title === '编辑' ? editDatasource : undefined,
		getTableList: pureTable.value?.getTableList
	}
	drawerRef.value?.acceptParams(params)
}
const connect = (id: string) => {
	console.log("连通性测试")
}
</script>

<template>
	<div class="main-box">
		<div class="table-box">
			<PureTable
				ref="pureTable"
				:columns="columns"
				:request-api="getDatasourcePage"
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
					<el-button type="primary" link @click="connect(scope.row.id)">
						<template #icon>
							<pure-icon name="pi-carbon:connect"></pure-icon>
						</template>
						连通性测试
					</el-button>
					<el-button type="danger" link @click="deleteDatasource(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<DatasourceDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
