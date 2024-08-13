<script setup lang="tsx">
import { getDictDataList as di } from '@/utils/dict.util'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { getCodeGenConfigList, updateCodeGenConfig } from '@/api/system/codeGen'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import type { CodeGenPageRes, CodeGenConfigListRes } from '@/api/system/interfaces/codeGen.interface'

/**
 * @description 初始化对象
 */
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<CodeGenPageRes>>({
	isView: false,
	title: '',
	row: {}
})

/**
 * @description 页面数据
 */
const state = reactive({
	tableData: [] as CodeGenConfigListRes[],
	effectTypeList: [] as any,
	queryTypeList: [] as any
})

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<CodeGenConfigListRes>[]>([
	{ type: 'index', label: '#', width: 80 },
	{ prop: 'propertyName', label: '实体属性', width: 180 },
	{ prop: 'columnComment', label: '描述', render: scope => <>{<el-input v-model={scope.row.columnComment} autocomplete='off' />}</> },
	{ prop: 'netType', label: '数据类型', width: 90 },
	{
		prop: 'effectType',
		label: '作用类型',
		width: 120,
		render: scope => (
			<>
				{
					<el-select v-model={scope.row.effectType} placeholder='Select' disabled={judgeColumns(scope.row)}>
						{state.effectTypeList.map((item: any) => (
							<el-option key={item.code} label={item.value} value={item.code} />
						))}
					</el-select>
				}
			</>
		)
	},
	{ prop: 'whetherTable', label: '列表显示', width: 85, render: scope => <>{<el-checkbox v-model={scope.row.whetherTable} />}</> },
	{
		prop: 'whetherAddUpdate',
		label: '增改',
		width: 80,
		render: scope => <>{<el-checkbox v-model={scope.row.whetherAddUpdate} disabled={judgeColumns(scope.row)} />}</>
	},
	{
		prop: 'whetherRequired',
		label: '必填',
		width: 80,
		render: scope => <>{<el-checkbox v-model={scope.row.whetherRequired} disabled={judgeColumns(scope.row)} />}</>
	},
	{ prop: 'whetherSortable', label: '可排序', width: 80, render: scope => <>{<el-checkbox v-model={scope.row.whetherSortable} />}</> },
	{
		prop: 'queryWhether',
		label: '是否是查询',
		width: 80,
		render: scope => <>{<el-switch v-model={scope.row.queryWhether} active-value={true} inactive-value={false} />}</>
	},
	{
		prop: 'queryType',
		label: '查询方式',
		width: 130,
		render: scope => (
			<>
				{
					<el-select v-model={scope.row.queryType} placeholder='Select' disabled={!scope.row.queryWhether}>
						{state.queryTypeList.map((item: any) => (
							<el-option key={item.code} label={item.value} value={item.code} />
						))}
					</el-select>
				}
			</>
		)
	},
	{ prop: 'orderNo', label: '排序', width: 100, render: scope => <>{<el-input v-model={scope.row.orderNo} autocomplete='off' type='number' />}</> }
])

/**
 * @description 提交数据（新增/编辑）
 */
const handleSubmit = async () => {
	let lst = state.tableData
	lst.forEach((item: any) => {
		// 必填那一项转换
		for (let key in item) {
			if (item[key] === true) {
				item[key] = 'Y'
			}
			if (item[key] === false) {
				item[key] = 'N'
			}
		}
	})
	await updateCodeGenConfig(lst)
	ElMessage.success({ message: `${drawerProps.value.title}成功！` })
	drawerProps.value.getTableList!()
	drawerVisible.value = false
}

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = async (params: DrawerProps<CodeGenPageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true

	// 获取配置列表
	let { result } = await getCodeGenConfigList({ id: drawerProps.value.row.id ?? 0 })
	let data = result ?? []

	// 列表显示的 checkbox
	let lstWhetherColumn = ['whetherTable', 'whetherAddUpdate', 'whetherRequired', 'whetherSortable']
	data.forEach((item: any) => {
		for (const key in item) {
			if (item[key] === 'Y') {
				item[key] = true
			}
			if (item[key] === 'N' || (lstWhetherColumn.includes(key) && item[key] === null)) {
				item[key] = false
			}
		}
	})
	state.tableData = data

	// 获取作用类型
	state.effectTypeList = di('code_gen_effect_type')

	// 获取查询方式
	state.queryTypeList = di('code_gen_query_type')
}

/**
 * @description 判断是否（用于是否能选择或输入等）
 */
const judgeColumns = (data: any): boolean => data.whetherCommon === true || data.columnKey === 'True'

/**
 * @description 对外函数
 */
defineExpose({
	acceptParams
})
</script>

<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="1500px" :title="`${drawerProps.title}`">
		<PureTable ref="pureTable" :columns="columns" :pagination="false" :data="state.tableData" :search-col="{ xs: 1, sm: 1, md: 2, lg: 7, xl: 7 }">
		</PureTable>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<style scoped lang="scss"></style>
