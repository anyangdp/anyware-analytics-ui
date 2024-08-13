<script setup lang="ts">
import { useIcon } from '@/hooks/useIcon'
import { getApplicationNamespaces } from '@/api/system/codeGen'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { configSysTrueFalseDic } from '@/recursos/dictionaries/app.dictionary'
import GenEntityDrawer from '@/views/System/Database/components/GenEntityDrawer.vue'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import GenSeedDataDrawer from '@/views/System/Database/components/GenSeedDataDrawer.vue'
import { genEntity, genSeedData, getListColumn, getListDatabase, getListTable } from '@/api/system/database'
import type { GenEntityReq, GenSeedDataReq, ListColumnRes, ListDatabaseRes, ListTableRes } from '@/api/system/interfaces/database.interface'

/**
 * @description 增加图标
 */
const addIcon = useIcon({ name: 'pi-carbon:add-large' })

/**
 * @description 页面参数
 */
const state = reactive({
	loading: false,
	loading1: false,
	dbData: [] as Array<ListDatabaseRes>,
	configId: '',
	tableData: [] as Array<ListTableRes>,
	tableName: '',
	columnData: [] as Array<ListColumnRes>,
	queryParams: {
		name: '',
		code: ''
	},
	appNamespaces: [] as Array<String>
})

/**
 * @description 初始化数据
 */
onMounted(async () => {
	state.loading = true
	let res = await getListDatabase()
	state.dbData = res.result
	state.loading = false

	let appNamesRes = await getApplicationNamespaces()
	state.appNamespaces = appNamesRes.result as Array<string>
})

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<ListColumnRes>[]>([
	{ type: 'index', label: '#', width: 80 },
	{ prop: 'dbColumnName', label: '字段名', width: 190 },
	{ prop: 'dataType', label: '数据类型', width: 90 },
	{ prop: 'isPrimarykey', label: '主键', width: 90, tag: true, enum: configSysTrueFalseDic },
	{ prop: 'isIdentity', label: '自增', width: 80, tag: true, enum: configSysTrueFalseDic },
	{ prop: 'isNullable', label: '可空', width: 80, tag: true, enum: configSysTrueFalseDic },
	{ prop: 'length', label: '长度', width: 90 },
	{ prop: 'decimalDigits', label: '精度', width: 80 },
	{ prop: 'defaultValue', label: '默认值', width: 180 },
	{ prop: 'columnDescription', label: '描述' }
])

/**
 * @description 表查询操作
 */
const handleQueryTable = async () => {
	state.tableName = ''
	state.columnData = []
	state.loading = true

	let res = await getListTable(state.configId, true)
	state.tableData = res.result ?? []
	state.loading = false
}

/**
 * @description 列查询操作
 */
const handleQueryColumn = async () => {
	state.columnData = []
	if (state.tableName == '') return

	state.loading1 = true
	let res = await getListColumn(state.configId, state.tableName)
	state.columnData = res.result ?? []
	state.loading1 = false
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const genEntityDrawerRef = ref<InstanceType<typeof GenEntityDrawer> | null>(null)
const openGenEntityDrawer = (
	title: string,
	row: Partial<GenEntityReq> = {
		configId: state.configId,
		tableName: state.tableName,
		position: state.appNamespaces[0].toString()
	}
) => {
	if (state.configId == '' || state.tableName == '') {
		ElMessage({
			type: 'error',
			message: `请选择库名和表名!`
		})
		return
	}
	const params: DrawerProps<GenEntityReq> = {
		title,
		isView: false,
		row: { ...row },
		api: genEntity,
		applicationNamespaces: state.appNamespaces
	}
	genEntityDrawerRef.value?.acceptParams(params)
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const genSeedDataDrawerRef = ref<InstanceType<typeof GenSeedDataDrawer> | null>(null)
const openGenSeedDataDrawer = (
	title: string,
	row: Partial<GenSeedDataReq> = {
		configId: state.configId,
		tableName: state.tableName,
		position: state.appNamespaces[0].toString()
	}
) => {
	if (state.configId == '' || state.tableName == '') {
		ElMessage({
			type: 'error',
			message: `请选择库名和表名!`
		})
		return
	}
	const params: DrawerProps<GenEntityReq> = {
		title,
		isView: false,
		row: { ...row },
		api: genSeedData,
		applicationNamespaces: state.appNamespaces
	}
	genSeedDataDrawerRef.value?.acceptParams(params)
}
</script>

<template>
	<div class="main-box">
		<div class="sys-database-container" style="width: 400px; margin-right: 5px">
			<el-card shadow="hover" :body-style="{ paddingBottom: '0' }">
				<el-form :model="state.queryParams" ref="queryForm" :inline="true" v-loading="state.loading">
					<el-row :gutter="35">
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<el-form-item label="库名">
								<el-select v-model="state.configId" placeholder="库名" filterable style="width: 300px" @change="handleQueryTable">
									<el-option v-for="item in state.dbData" :key="item.configId ?? ''" :label="item.configId ?? ''" :value="item.configId ?? ''" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<el-form-item label="表名">
								<el-select v-model="state.tableName" placeholder="表名" filterable style="width: 300px" clearable @change="handleQueryColumn">
									<el-option
										v-for="item in state.tableData"
										:key="item.tableName ?? ''"
										:label="item.tableName + '[' + item.tableComment + ']'"
										:value="item.tableName ?? ''"
									/>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="text-align: center">
							<el-form-item>
								<el-button-group>
									<el-button type="primary" :icon="addIcon" style="margin-left: 10px" @click="openGenEntityDrawer('生成实体')"> 生成实体 </el-button>
									<el-button type="danger" :icon="addIcon" style="margin-left: 10px" @click="openGenSeedDataDrawer('生成种子数据')">
										生成种子
									</el-button>
								</el-button-group>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-card>
		</div>
		<div class="table-box">
			<PureTable ref="pureTable" :columns="columns" :data="state.columnData" :pagination="false" :tool-button="[]"> </PureTable>
			<GenEntityDrawer ref="genEntityDrawerRef" />
			<GenSeedDataDrawer ref="genSeedDataDrawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
