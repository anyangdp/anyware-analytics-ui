<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import type { BdDatasourceDTO } from '@/api/bigData/datasource/datasource.interface'
import { DATA_SOURCE_TYPE, ETL_LOAD_MODE, ETL_TASK_TYPE } from '@/recursos/constantes/bigdata.constant'
import 'vue-json-pretty/lib/styles.css'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { getDatasourcePage, queryTable, queryTableColumns } from '@/api/bigData/datasource/datasource'
import type { EtlDataSourceConfiguration, MultiEtlConfiguration } from '@/api/bigData/etl/etl.interface'
import type { ComponentPublicInstance } from 'vue'

// 初始化对象
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<BdDatasourceDTO>>({
	isView: false,
	title: '',
	row: {}
})

const defaultLabel = ref<string>('请选择数据源')

let configuration = reactive<MultiEtlConfiguration>({
	sources: [],
	transform: {},
	target: {}
})

const { sources } = toRefs(configuration)
const { transform } = toRefs(configuration)
const { target } = toRefs(configuration)

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()

const selectDatasourceTableSourceRefs = ref<(Element | ComponentPublicInstance | null)[]>([])
const selectDatasourceTableTargetRef = ref()
const selectDatasourceTableColumnRefs = ref<(Element | ComponentPublicInstance | null)[]>([])


const sourceTableList = ref<Record<string, string[]>>({})
const targetTableList = ref<string[]>([])
const tableColumnList = ref<Record<number, string[]>>({})

const mappingFields = ref<any[]>([])

const targetExpands = ref<any[]>([])

const selectSourceDatasource = async (index: number, e: BdDatasourceDTO) => {
	sources.value[index].type = e.type;
	if (e.id) {
		await querySourceTables(e.id)
	}
}
const querySourceTables = async (id: string) => {
	if (!sourceTableList.value[id]) {
		const tables = await getTableList(id);
		sourceTableList.value[id] = Array.isArray(tables) ? tables : [];
	}
}

const selectTargetDatasource = async (e: BdDatasourceDTO) => {
	if (e.id) {
		target.value.type = e.type
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

const selectTable = async (index: number, e: string) => {
	console.log('selectTable', e)
	console.log(configuration)
	const temp = await getTableColumn(sources.value[index].resourceId || '', e)
	if (temp && Array.isArray(temp)) {
		tableColumnList.value[index] = temp;
	} else {
		ElMessage.error('无表格列')
	}
}
const selectTargetTable = async (e: string) => {
	console.log('selectTable', e)
}

const getTableColumn = async (id: string, tableName: string) => {
	return await queryTableColumns(id, tableName)
}

const removeMappingField = (index: number) => {
	mappingFields.value.splice(index, 1)
}

const addMappingField = () => {
	// 向 mappingFields 中添加一个新的空对象
	mappingFields.value.push({ name: '', mappingName: '' })
}

const queryMappingFields = () => {
	const seen = new Set()
	return mappingFields.value.filter((item: any) => {
		if (!item.name) {
			return false
		}
		if (seen.has(item.name)) {
			return false // 如果已经存在，过滤掉
		}
		seen.add(item.name)
		return true // 保留第一次出现的项
	})
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


const json = ref()

const checkSourceDatasource = (rule: any, value: any, callback: any) => {
	if (!sources.value.resourceId) {
		callback(new Error('请选择数据源'))
	} else {
		callback()
	}
}
const checkSourceName = (rule: any, value: any, callback: any) => {
	if (!sources.value.name) {
		callback(new Error('请选择表'))
	} else {
		callback()
	}
}
const checkSourceColumn = (rule: any, value: any, callback: any) => {
	if (!sources.value.name) {
		callback(new Error('请选择字段'))
	} else {
		callback()
	}
}
const checkTargetDatasource = (rule: any, value: any, callback: any) => {
	if (!target.value.resourceId) {
		callback(new Error('请选择数据源'))
	} else {
		callback()
	}
}
const checkTargetName = (rule: any, value: any, callback: any) => {
	if (!target.value.name) {
		callback(new Error('请选择表'))
	} else {
		callback()
	}
}
const checkTargetMode = (rule: any, value: any, callback: any) => {
	if (!target.value.mode) {
		callback(new Error('请选择写入模式'))
	} else {
		callback()
	}
}

// 验证
const rules = reactive({
	type: [{ required: true, message: '请选择任务类型', trigger: 'blur' }],
	// source: [{ required: true, validator: checkSourceDatasource, trigger: 'blur' }],
	// sourceName: [{ required: true, validator: checkSourceName, trigger: 'blur' }],
	// sourceColumn: [{ required: true, validator: checkSourceColumn, trigger: 'blur' }],
	// target: [{ required: true, validator: checkTargetDatasource, trigger: 'blur' }],
	// targetName: [{ required: true, validator: checkTargetName, trigger: 'blur' }],
	// targetMode: [{ required: true, validator: checkTargetMode, trigger: 'blur' }],
	description: [{ required: true, message: '请输入名称描述', trigger: 'blur' }]
})

const addSource = () => {
	const temp: EtlDataSourceConfiguration = {
		resourceId: "",
		name: "",
		sql: "",
		mode: "",
		expands: "",
		columns: ""
	}
	sources.value.push(temp)
}
const removeSource = (index: number) => {
	sources.value.splice(index, 1)
}

// 接收父组件传过来的参数
const acceptParams = async (params: DrawerProps<BdDatasourceDTO>) => {

	drawerProps.value = params
	console.log('drawerProps.value.row:', drawerProps.value.row)
	drawerVisible.value = true
	if (drawerProps.value.row!.configuration) {
		json.value = JSON.parse(drawerProps.value.row!.configuration)
		configuration = json.value
		sources.value = configuration.sources
		transform.value = configuration.transform
		target.value = configuration.target
		if (sources.value) {
			for (let i = 0; i < sources.value.length; i++) {
				await querySourceTables(sources.value[i].resourceId)
				// 设置数据源字段默认选中
				await selectTable(i, sources.value[i].name ?? '')
				// 设置数据源表默认选中
				const tempColumnsSet = new Set(sources.value[i].columns?.split(','))
				// 遍历tableColumnList并检查column_name是否存在于tempColumnsSet中
				for (let valueElement of tableColumnList.value[i]) {
					if (tempColumnsSet.has(valueElement['column_name'])) {
						selectDatasourceTableColumnRefs.value[i].element.toggleRowSelection(valueElement)
					}
				}
			}
		}
		if (target.value.resourceId) {
			await queryTargetTables(target.value.resourceId)
		}
		if (transform?.value) {
			for (const [name, mappingName] of Object.entries(transform.value)) {
				mappingFields.value.push({ name, mappingName })
			}
		}
		if (target.value.expands) {
			for (const [key, value] of Object.entries(target.value.expands)) {
				targetExpands.value.push({ key, value })
			}
		}
	}
	nextTick(() => {
		if (sources.value) {
			for (let i = 0; i < sources.value.length; i++) {
				selectDatasourceTableSourceRefs.value[i].initTable()
			}
		}
		selectDatasourceTableTargetRef.value.initTable()
	})
	console.log('json value:', json.value)
}


const handleSubmit = () => {
	transform.value = {}
	for (let field of queryMappingFields()) {
		transform.value[field.name] = field.mappingName
		configuration.transform = transform?.value
	}
	target.value.expands = {}
	for (let expand of queryTargetExpands()) {
		target.value.expands[expand.key] = expand.value
	}
	for (let i = 0; i < sources.value.length; i++) {
		sources.value[i].columns =  selectDatasourceTableColumnRefs.value[i].selectedListIds.join(',')
	}
	console.log('configuration:', configuration)
	ruleFormRef.value!.validate(async valid => {
		if (!valid) {
			return
		}
		try {
			drawerProps.value.row.configuration = JSON.stringify(configuration)
			await drawerProps.value.api!(drawerProps.value.row)
			ElMessage.success({ message: `${drawerProps.value.title}etl任务成功！` })
			drawerProps.value.getTableList!()
			drawerVisible.value = false
		} catch (error) {
			console.log(error)
		}
	})
}
const closeDrawer = () => {
	json.value = ''
	defaultLabel.value = '请选择数据源'
	mappingFields.value = []
	targetExpands.value = []
	configuration = {
		sources: [],
		transform: {},
		target: {}
	}
	sources.value = []
	transform!.value = {}
	target.value = {}
}

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
	{ prop: 'is_primary_key', label: '是否是主键'},
	{ prop: 'column_comment', label: '备注' }
])

defineExpose({
	acceptParams
})
</script>

<template>
	<el-drawer v-model="drawerVisible" @close="closeDrawer" :destroy-on-close="true" size="850px"
						 :title="`${drawerProps.title}任务`">
		<el-form
			:label-position="FORM_LABEL_POSITION"
			ref="ruleFormRef"
			:size="FORM_SIZE"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.row"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="名称" prop="description">
						<el-input v-model="drawerProps.row!.description" placeholder="请填写任务名称" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="任务类型" prop="type">
						<el-select v-model="drawerProps.row!.type" disabled placeholder="请选择任务类型">
							<el-option v-for="item in ETL_TASK_TYPE" :key="item.value" :label="item.label"
												 :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-divider>1. 数据提取</el-divider>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<template v-for="(item, index) in sources" :key="index">
						<div style="border: 1px solid #dddddd; margin-bottom: 10px;">
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
								<el-form-item label="数据源选择" prop="source">
									<PureSelectTable
										:ref="el => selectDatasourceTableSourceRefs[index] = el"
										:columns="columns"
										:request-auto="true"
										:request-api="getDatasourcePage"
										:multiple="false"
										:width="800"
										:label="defaultLabel"
										v-model="item.resourceId"
										@radio-change="selectSourceDatasource(index, $event)"
										:keywords="{ label: 'description', value: 'id' }"
									></PureSelectTable>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="item.resourceId">
								<el-form-item label="数据源类型" prop="source">
									<el-input v-model="item.type" disabled clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="item.resourceId">
								<el-tabs type="border-card">
									<el-tab-pane label="快速配置">
										<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
											<el-form-item label="数据库表" prop="sourceName">
												<el-select v-model="item.name" @change="selectTable(index, $event)" filterable
																	 placeholder="请选择数据库表">
													<el-option v-for="sourceTableItem in sourceTableList[item.resourceId]" :key="sourceTableItem" :label="sourceTableItem" :value="sourceTableItem"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="item.name">
											<el-form-item label="查询字段" prop="sourceColumn">
												<PureTable :ref="el => selectDatasourceTableColumnRefs[index] = el" :columns="tableColumns" :data="tableColumnList[index]"
																	 :pagination="false" :toolButton="false" :row-key="'column_name'" />
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
											<el-form-item label="过滤条件" prop="source.condition">
												<el-input type="textarea" :rows="2" placeholder="使用sql语法，以and作为开始"
																	v-model="item!.condition" />
											</el-form-item>
										</el-col>
									</el-tab-pane>
									<el-tab-pane label="自定义配置">
										<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
											<el-form-item label="自定义sql" prop="source.sql">
												<el-input type="textarea" :rows="2" placeholder="" v-model="item!.sql" />
											</el-form-item>
										</el-col>
									</el-tab-pane>
								</el-tabs>
							</el-col>
							<div style="width: 10%; display: grid">
								<el-button type="danger" link @click="removeSource(index)">
									<template #icon>
										<pure-icon name="pi-carbon:trash-can"></pure-icon>
									</template>
									移除
								</el-button>
							</div>
						</div>
					</template>
					<el-button type="primary" link @click="addSource()">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						添加数据源
					</el-button>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-divider>2. 数据转换</el-divider>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="转换" prop="transform">
						<div style="width: 100%;">
							<template v-for="(item, index) in mappingFields" :key="index">
								<div style=" display: flex; justify-content: left">
									<div style="width: 30%; margin-right: 10px;">
										字段名:
										<el-input v-model="item.name" placeholder="字段名" clearable></el-input>
									</div>
									<div style="width: 30%; margin-right: 10px;">
										映射:
										<el-input v-model="item.mappingName" placeholder="映射字段" clearable></el-input>
									</div>
									<div style="width: 10%; display: grid">
										<el-button type="danger" link @click="removeMappingField(index)">
											<template #icon>
												<pure-icon name="pi-carbon:trash-can"></pure-icon>
											</template>
											移除
										</el-button>
									</div>
								</div>
								<!--								<el-divider />-->
							</template>
							<el-button type="primary" link @click="addMappingField()">
								<template #icon>
									<pure-icon name="pi-carbon:add"></pure-icon>
								</template>
								添加字段映射
							</el-button>
						</div>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-divider>3. 数据加载</el-divider>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="数据源选择" prop="target">
						<PureSelectTable
							ref="selectDatasourceTableTargetRef"
							:columns="columns"
							:request-api="getDatasourcePage"
							:multiple="false"
							:width="800"
							:label="defaultLabel"
							v-model="target.resourceId"
							@radio-change="selectTargetDatasource"
							:keywords="{ label: 'description', value: 'id' }"
						></PureSelectTable>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="target.resourceId">
					<el-form-item label="数据源类型" prop="source">
						<el-input v-model="target.type" disabled clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="target.resourceId">
					<el-form-item label="数据库表" prop="targetName">
						<el-select v-model="target.name" @change="selectTargetTable" filterable
											 placeholder="请选择数据库表">
							<el-option v-for="item in targetTableList" :key="item" :label="item" :value="item"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="模式" prop="targetMode" v-if="target.resourceId">
						<el-select v-model="target.mode" filterable
											 placeholder="请选择写入模式">
							<el-option v-for="item in ETL_LOAD_MODE" :key="item.value" :label="item.label"
												 :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="target.resourceId">
					<el-form-item label="前置处理" prop="targetCondition">
						<el-input type="textarea" :rows="2" placeholder="写入前置处理，清空表或者前置其他操作仅支持sql"
											v-model="target.condition" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="target.resourceId">
					<el-form-item prop="target.expands">
						<div slot="label" style="display: inline-flex; align-items: center">
							拓展:
							<el-tooltip
								class="item"
								effect="dark"
								content="除默认模式外都需要增加主键属性用于匹配过滤"
								placement="top-start"
							>
								<pure-icon name="pi-carbon:help" />
							</el-tooltip>
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
				<!--				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">-->
				<!--					<el-form-item label="配置" prop="configuration">-->
				<!--						<vue-json-pretty :data="json" :editable="false" />-->
				<!--					</el-form-item>-->
				<!--				</el-col>-->
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="状态" prop="status">
						<el-radio-group v-model="drawerProps.row!.active">
							<el-radio :value="true">启用</el-radio>
							<el-radio :value="false">禁用</el-radio>
						</el-radio-group>
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
