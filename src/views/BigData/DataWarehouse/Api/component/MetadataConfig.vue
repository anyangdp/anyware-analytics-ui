<script setup lang="ts">

// 定义 props 和 emits
import { getDatasourcePage, queryTable, queryTableColumns } from '@/api/bigData/datasource/datasource'
import { DATA_SOURCE_TYPE } from '@/recursos/constantes/bigdata.constant'
import type { BdDatasourceDTO } from '@/api/bigData/datasource/datasource.interface'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import type { FilterCondition, QueryConfig } from '@/api/bigData/api/apimetadata.interface'

const props = defineProps<{
	modelValue: QueryConfig;
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: QueryConfig): void;
	(e: 'pageEnableChanged', isEnabled: boolean): void;
}>()

// 直接使用 props.modelValue，不创建本地副本
// 创建本地副本，基于 props.modelValue 初始化
const form = ref<QueryConfig>(JSON.parse(JSON.stringify(props.modelValue)))
onMounted(async () => {
	console.log('form', form.value)
	if (form.value.resourceId) {
		await querySourceTables(form.value.resourceId)
	}
	if (form.value.tableName) {
		// 设置数据源字段默认选中
		await selectTable(form.value.tableName)
	}
	if (tableColumnList.value) {
		const tempColumnsMap = new Map(form.value.selectFields.map(f => [f.column, f.columnAlias]));		// 遍历tableColumnList并检查column_name是否存在于tempColumnsSet中
		for (let valueElement of tableColumnList.value) {
			if (tempColumnsMap.has(valueElement['column_name'])) {
				valueElement['columnAlias'] = tempColumnsMap.get(valueElement['column_name'])
				selectDatasourceTableColumnRef.value.element.toggleRowSelection(valueElement)
				console.log('valueElement: ' ,valueElement)
				// valueElement.columnAlias =
			}
		}
	}
})

// 监听 form 变化，更新父组件数据
watch(
	form,
	(newForm) => {
		console.log('newForm', JSON.parse(JSON.stringify(newForm)));
		emit('update:modelValue', JSON.parse(JSON.stringify(newForm)));
	},
	{ deep: true }
)

// 监听分页开关变化，发射事件
watch(
	() => form.value.pageEnable,
	(newValue) => {
		emit('pageEnableChanged', newValue);
	}
);

const selectDatasourceTableSourceRef = ref()
const selectDatasourceTableColumnRef = ref()
const sourceTableList = ref<string[]>([])
const tableColumnList = ref<any[]>([])
// 表格配置项
const columns = reactive<ColumnProps<BdDatasourceDTO>[]>([
	{ type: 'index', label: '序号', width: 80 },
	{ prop: 'type', label: '数据源类型', enum: DATA_SOURCE_TYPE, search: { el: 'select-v2' } },
	{ prop: 'description', label: '数据源说明', search: { el: 'input' } },
	{ prop: 'host', label: 'ip', width: 130 },
	{ prop: 'port', label: '端口', width: 130 },
	{ prop: 'driver', label: '驱动', width: 130 }
])

const defaultLabel = ref<string>('请选择数据源')

const selectSourceDatasource = async (e: BdDatasourceDTO) => {
	if (e.id) {
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
	const temp = await getTableColumn(form?.value.resourceId || '', e)
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

const tableColumns = reactive<ColumnProps<any>[]>([
	{ type: 'selection', label: '#', width: 40 },
	{ prop: 'column_name', label: '字段名', width: 130 },
	{ prop: 'data_type', label: '数据类型', width: 130 },
	{ prop: 'is_primary_key', label: '是否是主键' },
	{ prop: 'column_comment', label: '备注' },
	{ prop: 'columnAlias', label: '查询别名', showOverflowTooltip: false }
])

// 添加条件（支持嵌套）
const addCondition = (conditions: FilterCondition[], parent?: FilterCondition) => {
	const newCondition: FilterCondition = {
		field: '',
		expr: '=',
		value: null,
		type: 'string',
		required: false,
		defaultValue: null,
		logicalOperator: 'AND',
		subConditions: []
	}
	if (parent) {
		parent.subConditions.push(newCondition)
	} else {
		conditions.push(newCondition)
	}
}

// 删除条件
const removeCondition = (conditions: FilterCondition[], index: number) => {
	conditions.splice(index, 1)
}

const addOrderBy = () => {
	form.value.orderBy.push({ column: '', asc: true })
}

const removeOrderBy = (index: number) => {
	form.value.orderBy.splice(index, 1)
}

const handlerAlias = (row) => {
	if (form.value.selectFields) {
		form.value.selectFields.forEach((value, index) => {
			if (value.column === row.column_name) {
				value.columnAlias = row.columnAlias
      }
		})
	}
}

const handlerSelectColumn = (selection) => {
	console.log('handlerSelectColumn', selection)
	form.value.selectFields = selection.map((item) => ({
		column: item.column_name,
		columnAlias: item.columnAlias
	}));
	console.log('form.selectFields', form.value.selectFields)
}

// 暴露方法给父组件（可选）
// defineExpose({
// 	pageChange
// });

</script>

<template>
	<el-row :gutter="35">
		<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
			<el-form-item label="数据源选择" prop="source">
				<PureSelectTable
					ref="selectDatasourceTableSourceRef"
					:columns="columns"
					:request-auto="true"
					:request-api="getDatasourcePage"
					:multiple="false"
					:width="800"
					:label="defaultLabel"
					v-model="form.resourceId"
					@radio-change="selectSourceDatasource"
					:keywords="{ label: 'description', value: 'id' }"
				></PureSelectTable>
			</el-form-item>
		</el-col>
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-form-item label="表名">
				<el-select v-model="form.tableName" @change="selectTable" filterable
									 placeholder="请选择数据库表">
					<el-option v-for="item in sourceTableList" :key="item" :label="item" :value="item"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-form-item label="查询字段">
				<PureTable @selection-change="handlerSelectColumn" ref="selectDatasourceTableColumnRef" :columns="tableColumns" :data="tableColumnList"
									 :pagination="false" :toolButton="false" :row-key="'column_name'" >
					<template #columnAlias="scope">
						<el-input v-model="scope.row.columnAlias" @input="handlerAlias(scope.row)" placeholder="输入别名（可选）" />
					</template>
				</PureTable>
			</el-form-item>
		</el-col>
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-form-item label="条件">
				<!-- 一级条件 -->
				<div class="condition-container">
					<div v-for="(condition, index) in form.conditions" :key="index" class="condition-item">
						<el-row :gutter="10" align="middle">
							<el-col :span="3">
								<el-select v-model="condition.logicalOperator" placeholder="逻辑">
									<el-option label="AND" value="AND" />
									<el-option label="OR" value="OR" />
								</el-select>
							</el-col>
							<el-col :span="4">
								<el-select v-model="condition.field" placeholder="选择查询条件">
									<el-option v-for="item in tableColumnList" :key="item"
														 :label="item.column_comment ? item.column_comment : item.column_name"
														 :value="item.column_name"></el-option>
								</el-select>
							</el-col>
							<el-col :span="3">
								<el-select v-model="condition.expr" placeholder="操作符">
									<el-option label="=" value="=" />
									<el-option label=">" value=">" />
									<el-option label="<" value="<" />
									<el-option label="<=" value="<=" />
									<el-option label=">=" value=">=" />
									<el-option label="LIKE" value="like" />
									<el-option label="!=" value="!=" />
								</el-select>
							</el-col>
							<el-col :span="4">
								<el-input v-model="condition.value" placeholder="值" />
							</el-col>
							<el-col :span="3">
								<el-select v-model="condition.type" placeholder="类型">
									<el-option label="int" value="int" />
									<el-option label="string" value="string" />
								</el-select>
							</el-col>
							<el-col :span="2">
								<el-checkbox v-model="condition.required" label="必填" />
							</el-col>
							<el-col :span="4">
								<el-input v-model="condition.defaultValue" placeholder="默认值" />
							</el-col>
							<el-col :span="1">
								<el-button type="danger" link @click="removeCondition(form.conditions, index)">
									<template #icon>
										<pure-icon name="pi-carbon:trash-can"></pure-icon>
									</template>
								</el-button>
							</el-col>
						</el-row>
						<!-- 子条件 -->
						<div class="sub-condition-container" v-if="condition.subConditions.length || true">
							<div v-for="(subCondition, subIndex) in condition.subConditions" :key="subIndex"
									 class="sub-condition-item">
								<el-row :gutter="10" align="middle">
									<el-col :span="3">
										<el-select v-model="subCondition.logicalOperator" placeholder="逻辑">
											<el-option label="AND" value="AND" />
											<el-option label="OR" value="OR" />
										</el-select>
									</el-col>
									<el-col :span="4">
										<el-input v-model="subCondition.field" placeholder="字段名" />
									</el-col>
									<el-col :span="3">
										<el-select v-model="subCondition.expr" placeholder="操作符">
											<el-option label="=" value="=" />
											<el-option label=">" value=">" />
											<el-option label="<" value="<" />
											<el-option label="<=" value="<=" />
											<el-option label=">=" value=">=" />
											<el-option label="LIKE" value="like" />
											<el-option label="!=" value="!=" />
										</el-select>
									</el-col>
									<el-col :span="4">
										<el-input v-model="subCondition.value" placeholder="值" />
									</el-col>
									<el-col :span="3">
										<el-select v-model="subCondition.type" placeholder="类型">
											<el-option label="int" value="int" />
											<el-option label="string" value="string" />
										</el-select>
									</el-col>
									<el-col :span="2">
										<el-checkbox v-model="subCondition.required" label="必填" />
									</el-col>
									<el-col :span="4">
										<el-input v-model="subCondition.defaultValue" placeholder="默认值" />
									</el-col>
									<el-col :span="1">
										<el-button type="danger" link @click="removeCondition(condition.subConditions, subIndex)">
											<template #icon>
												<pure-icon name="pi-carbon:trash-can"></pure-icon>
											</template>
										</el-button>
									</el-col>
								</el-row>
							</div>
							<el-button size="small" type="text" @click="addCondition(condition.subConditions, condition)">+
								添加子条件
							</el-button>
						</div>
					</div>
					<el-button type="primary" plain @click="addCondition(form.conditions)">+ 添加条件</el-button>
				</div>
			</el-form-item>
		</el-col>

		<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
			<el-form-item label="分组">
				<el-select v-model="form.groupBy" multiple placeholder="选择分组字段">
					<el-option v-for="item in tableColumnList" :label="item.column_comment ? item.column_comment : item.column_name"
										 :value="item.column_name" />
				</el-select>
			</el-form-item>
		</el-col>
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-form-item label="排序">
				<div class="order-container">
					<div v-for="(order, index) in form.orderBy" :key="index" class="order-item">
						<el-row :gutter="10" align="middle">
							<el-col :span="10">
								<el-select v-model="order.column" placeholder="排序字段">
									<el-option v-for="item in tableColumnList" :key="item"
														 :label="item.column_comment ? item.column_comment : item.column_name"
														 :value="item.column_name"></el-option>
								</el-select>
							</el-col>
							<el-col :span="10">
								<el-radio-group v-model="order.asc">
									<el-radio :label="true">升序</el-radio>
									<el-radio :label="false">降序</el-radio>
								</el-radio-group>
							</el-col>
							<el-col :span="4">
								<el-button type="danger" link @click="removeOrderBy(index)">
									<template #icon>
										<pure-icon name="pi-carbon:trash-can"></pure-icon>
									</template>
								</el-button>
							</el-col>
						</el-row>
					</div>
					<el-button type="primary" plain @click="addOrderBy">+ 添加排序</el-button>
				</div>
			</el-form-item>
		</el-col>
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-form-item label="分页">
				<el-switch v-model="form.pageEnable"/>
			</el-form-item>
		</el-col>
	</el-row>
</template>

<style scoped lang="scss">
.query-config-form {
	padding: 20px;
}

.condition-container {
	padding: 10px;
	background-color: #f9f9f9;
	border-radius: 4px;
}

.condition-item {
	padding: 10px;
	margin-bottom: 10px;
	background-color: #fff;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
}

.sub-condition-container {
	margin-top: 10px;
	padding: 10px;
	border: 1px dashed #dcdfe6;
	border-radius: 4px;
}

.sub-condition-item {
	padding: 10px;
	margin-bottom: 10px;
	background-color: #fff;
	border: 1px solid #e8ecef;
	border-radius: 4px;
}

.order-item {
	margin-bottom: 10px;
}

.el-button--text {
	color: #409eff;
}

.el-button--text:hover {
	color: #66b1ff;
}

.order-container {
	padding: 10px;
	background-color: #f9f9f9;
	border-radius: 4px;
}

.order-item {
	padding: 10px;
	margin-bottom: 10px;
	background-color: #fff;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
}

.pagination-container {
	padding: 10px;
	background-color: #f9f9f9;
	border-radius: 4px;
}

.pagination-item {
	margin-top: 10px;
	padding: 10px;
	background-color: #fff;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
}
</style>
