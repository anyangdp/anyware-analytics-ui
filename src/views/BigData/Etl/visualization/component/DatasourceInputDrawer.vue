<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import 'vue-json-pretty/lib/styles.css'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import type { BdDatasourceDTO } from '@/api/bigData/datasource/datasource.interface'
import { DATA_SOURCE_TYPE } from '@/recursos/constantes/bigdata.constant'
import { getDatasourcePage, queryTable, queryTableColumns } from '@/api/bigData/datasource/datasource'

/**
 * @description 抛出事件
 */
const emits = defineEmits(['submit'])
// 初始化对象
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<any>>({
	isView: false,
	title: '',
	row: {}
})

const selectDatasourceTableSourceRef = ref()
const selectDatasourceTableColumnRef = ref()
const sourceTableList = ref<string[]>([])
const tableColumnList = ref<any[]>([])

const defaultLabel = ref<string>('请选择数据源')

// 表格配置项
const columns = reactive<ColumnProps<BdDatasourceDTO>[]>([
	{ type: 'index', label: '序号', width: 80 },
	{ prop: 'type', label: '数据源类型', enum: DATA_SOURCE_TYPE, search: { el: 'select-v2' } },
	{ prop: 'description', label: '数据源说明', search: { el: 'input' } },
	{ prop: 'host', label: 'ip', width: 130 },
	{ prop: 'port', label: '端口', width: 130 },
	{ prop: 'driver', label: '驱动', width: 130 }
])

const tableColumns = reactive<ColumnProps<any>[]>([
	{ type: 'selection', label: '#', width: 40 },
	{ prop: 'column_name', label: '字段名', width: 130 },
	{ prop: 'is_nullable', label: '是否允许空', width: 100 },
	{ prop: 'data_type', label: '数据类型', width: 130 },
	{ prop: 'is_primary_key', label: '是否是主键' },
	{ prop: 'column_comment', label: '备注' }
])

const selectSourceDatasource = async (e: BdDatasourceDTO) => {
	if (e.id) {
		drawerProps.value.row.source!.type = e.type
		await querySourceTables(e.id)
	}
}
const querySourceTables = async (id: string) => {
	const temp = await getTableList(id)
	sourceTableList.value.length = 0
	if (temp && Array.isArray(temp)) {
		sourceTableList.value.push(...temp)
	}
}

const getTableList = async (id: string) => {
	const temp = await queryTable(id)
	console.log('temp', temp)
	return temp
}

const selectTable = async (e: string) => {
	console.log('selectTable', e)
	const temp = await getTableColumn(drawerProps.value.row.source?.resourceId || '', e)
	tableColumnList.value.length = 0
	if (temp && Array.isArray(temp)) {
		tableColumnList.value.push(...temp)
	} else {
		ElMessage.error('无表格列')
	}
}

const getTableColumn = async (id: string, tableName: string) => {
	return await queryTableColumns(id, tableName)
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()

// 验证
const rules = reactive({
	type: [{ required: true, message: '请选择任务类型', trigger: 'blur' }],
	description: [{ required: true, message: '请输入名称描述', trigger: 'blur' }]
})

// 接收父组件传过来的参数
const acceptParams = async (params: DrawerProps<any>) => {
	console.log('params:', params)
	drawerProps.value = params
	drawerVisible.value = true
	if (drawerProps.value.row.source.resourceId) {
		await querySourceTables(drawerProps.value.row.source.resourceId)
	}
	console.log(drawerProps.value)
	if (drawerProps.value.row.source.name) {
		// 设置数据源字段默认选中
		await selectTable(drawerProps.value.row.source.name)
	}
	if (tableColumnList.value) {
		const tempColumnsSet = new Set(drawerProps.value.row.source.columns?.split(','))
		// 遍历tableColumnList并检查column_name是否存在于tempColumnsSet中
		for (let valueElement of tableColumnList.value) {
			if (tempColumnsSet.has(valueElement['column_name'])) {
				selectDatasourceTableColumnRef.value.element.toggleRowSelection(valueElement)
			}
		}
	}
}


const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) {
			return
		}
		try {
			drawerProps.value.row.source.columns = selectDatasourceTableColumnRef.value.selectedListIds.join(',')
			emits('submit', drawerProps.value.row)
			drawerVisible.value = false
		} catch (error) {
			console.log(error)
		}
	})
}
const closeDrawer = () => {
	drawerProps.value.row.source = {
		resourceId: '',
		type: '',
		sql: '',
		name: '',
		columns: '',
		description: '数据源查询'
	}
}

defineExpose({
	acceptParams
})
</script>

<template>
	<el-drawer v-model="drawerVisible" @close="closeDrawer" :destroy-on-close="true" size="750px"
						 :title="`${drawerProps.title}`">
		<el-form
			:label-position="FORM_LABEL_POSITION"
			ref="ruleFormRef"
			:size="FORM_SIZE"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.row.source"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="步骤名称" prop="description">
						<el-input v-model="drawerProps.row.source!.description" placeholder="请填写步骤名称" clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="数据源选择" prop="source">
						<PureSelectTable
							ref="selectDatasourceTableSourceRef"
							:columns="columns"
							:request-auto="true"
							:request-api="getDatasourcePage"
							:multiple="false"
							:width="800"
							:label="defaultLabel"
							v-model="drawerProps.row.source!.resourceId"
							@radio-change="selectSourceDatasource"
							:keywords="{ label: 'description', value: 'id' }"
						></PureSelectTable>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="类型" prop="type">
						<el-input v-model="drawerProps.row.source!.type" placeholder="类型" clearable disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-tabs type="border-card">
						<el-tab-pane label="快速配置">
							<el-row :gutter="35">
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
									<el-form-item label="表名" prop="name">
										<el-select v-model="drawerProps.row.source!.name" @change="selectTable" filterable
															 placeholder="请选择数据库表">
											<el-option v-for="item in sourceTableList" :key="item" :label="item" :value="item"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="查询字段" prop="columns">
										<PureTable ref="selectDatasourceTableColumnRef" :columns="tableColumns" :data="tableColumnList"
															 :pagination="false" :toolButton="false" :row-key="'column_name'" />
									</el-form-item>
								</el-col>
							</el-row>
						</el-tab-pane>
						<el-tab-pane label="自定义配置">
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
								<el-form-item label="自定义sql" prop="sql">
									<el-input type="textarea" :rows="2" placeholder="配置自定义sql后，快速配置将会失效" clearable
														v-model="drawerProps.row.source!.sql" />
								</el-form-item>
							</el-col>
						</el-tab-pane>
					</el-tabs>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<style scoped lang="scss"></style>
