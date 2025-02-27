<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import 'vue-json-pretty/lib/styles.css'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import type { BdDatasourceDTO } from '@/api/bigData/datasource/datasource.interface'
import { DATA_SOURCE_TYPE, ETL_LOAD_MODE } from '@/recursos/constantes/bigdata.constant'
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

const selectDatasourceTableTargetRef = ref()
const targetTableList = ref<string[]>([])
const tableColumnList = ref<any[]>([])

const defaultLabel = ref<string>('请选择数据源')

const targetExpands = ref<any[]>([])

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

const selectTargetDatasource = async (e: BdDatasourceDTO) => {
	if (e.id) {
		drawerProps.value.row.target!.type = e.type
		await queryTargetTables(e.id)
	}
}
const queryTargetTables = async (id: string) => {
	const temp = await getTableList(id)
	targetTableList.value.length = 0
	if (temp && Array.isArray(temp)) {
		targetTableList.value.push(...temp)
	}
}

const getTableList = async (id: string) => {
	const temp = await queryTable(id)
	console.log('temp', temp)
	return temp
}

const selectTable = async (e: string) => {
	console.log('selectTable', e)
	const temp = await getTableColumn(drawerProps.value.row.target?.resourceId || '', e)
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

const removeTargetExpands = (index: number) => {
	targetExpands.value.splice(index, 1)
}

const addTargetExpands = () => {
	targetExpands.value.push({ key: '', value: '' })
}

const queryTargetExpands = () => {
	const seen = new Set()
	return targetExpands.value.filter((item: any) => {
		if (seen.has(item.key) || !item.key) {
			return false // 如果已经存在，过滤掉
		}
		seen.add(item.key)
		return true // 保留第一次出现的项
	})
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
	console.log("params:", params)
	drawerProps.value = params
	console.log(drawerProps.value)
	drawerVisible.value = true
	if (drawerProps.value.row.target.resourceId) {
		await queryTargetTables(drawerProps.value.row.target.resourceId)
	}
	console.log(drawerProps.value)
	if (drawerProps.value.row.target.name) {
		// 设置数据源字段默认选中
		await selectTable(drawerProps.value.row.target.name)
	}
	if (drawerProps.value.row.target.expands) {
		for (const [key, value] of Object.entries(drawerProps.value.row.target.expands)) {
			targetExpands.value.push({ key, value })
		}
	}
	await nextTick(() => {
		selectDatasourceTableTargetRef.value.initTable()
	})
}


const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) {
			return
		}
		try {
			drawerProps.value.row.target.expands = {}
			for (let expand of queryTargetExpands()) {
				drawerProps.value.row.target.expands[expand.key] = expand.value
			}
			emits('submit', drawerProps.value.row)
			drawerVisible.value = false
		} catch (error) {
			console.log(error)
		}
	})
}
const closeDrawer = () => {
	drawerProps.value.row.target = {
		resourceId: '',
		type: 'UNKNOWN',
		name: '',
		mode: ETL_LOAD_MODE[0].value,
		expands: {},
		description: '数据源输出'
	}
	targetExpands.value = []
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
			:model="drawerProps.row.target"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="步骤名称" prop="description">
						<el-input v-model="drawerProps.row.target!.description" placeholder="请填写步骤名称" clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="数据源选择" prop="source">
						<PureSelectTable
							ref="selectDatasourceTableTargetRef"
							:columns="columns"
							:request-auto="false"
							:request-api="getDatasourcePage"
							:multiple="false"
							:width="800"
							:label="defaultLabel"
							v-model="drawerProps.row.target!.resourceId"
							@radio-change="selectTargetDatasource"
							:keywords="{ label: 'description', value: 'id' }"
						></PureSelectTable>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="类型" prop="type">
						<el-input v-model="drawerProps.row.target!.type" placeholder="类型" clearable disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="表名" prop="name">
						<el-select v-model="drawerProps.row.target!.name" @change="selectTable" filterable
											 placeholder="请选择数据库表">
							<el-option v-for="item in targetTableList" :key="item" :label="item" :value="item"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="模式" prop="targetMode" v-if="drawerProps.row.target.resourceId">
						<el-select v-model="drawerProps.row.target.mode" filterable
											 placeholder="请选择写入模式">
							<el-option v-for="item in ETL_LOAD_MODE" :key="item.value" :label="item.label"
												 :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="drawerProps.row.target.resourceId">
					<el-form-item label="前置处理" prop="targetCondition">
						<el-input type="textarea" :rows="2" placeholder="写入前置处理，清空表或者前置其他操作仅支持sql"
											v-model="drawerProps.row.target.condition" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="drawerProps.row.target.resourceId">
					<el-form-item prop="target.expands">
						<div slot="label" style="display: inline-flex; align-items: center">
							拓展:<el-tooltip
							class="item"
							effect="dark"
							content="除默认模式外都需要增加主键属性用于匹配过滤"
							placement="top-start"
						><pure-icon name="pi-carbon:help"/></el-tooltip>
						</div>
						<div style="width: 100%;">
							<template v-for="(item, index) in targetExpands" :key="index">
								<div style=" display: flex; justify-content: left">
									<div style="width: 30%; margin-right: 10px;">
										属性:
										<el-input v-model="item.key" placeholder="属性" clearable></el-input>
									</div>
									<div style="width: 30%; margin-right: 10px;">
										属性值:
										<el-input v-model="item.value" placeholder="属性值" clearable></el-input>
									</div>
									<div style="width: 10%; display: grid">
										<el-button type="danger" link @click="removeTargetExpands(index)">
											<template #icon>
												<pure-icon name="pi-carbon:trash-can"></pure-icon>
											</template>
											移除
										</el-button>
									</div>
								</div>
							</template>
							<el-button type="primary" link @click="addTargetExpands()">
								<template #icon>
									<pure-icon name="pi-carbon:add"></pure-icon>
								</template>
								添加字段映射
							</el-button>
						</div>
					</el-form-item>
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
