<script setup lang="ts">
import { useTable } from '@/hooks/useTable'
import { handleProp } from '@/utils/prop.util'
import { useSelected } from '@/hooks/useSelected'
import Pagination from './components/Pagination.vue'
import ColSetting from './components/ColSetting.vue'
import TableColumn from './components/TableColumn.vue'
import SearchForm from '@/components/PureSearch/PureSearch.vue'
import type { ColumnTypeProps } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps, PureTableProps } from '@/components/PureTable/interfaces/pureTable.interface'

/**
 * @description 接受父组件参数，配置默认值
 */
const tableProps = withDefaults(defineProps<PureTableProps>(), {
	columns: () => [],
	requestAuto: true,
	pagination: true,
	initParam: {},
	border: true,
	toolButton: true,
	rowKey: 'id',
	searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
})

/**
 * @description 表格多选 Hooks
 */
const { selectedList, selectedListIds, isSelected, selectedChange } = useSelected(tableProps.rowKey)

/**
 * @description 表格操作 Hooks
 */
const { tableData, pageable, loading, searchParam, searchInitParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } = useTable(
	tableProps.requestApi,
	tableProps.initParam,
	tableProps.pagination,
	tableProps.dataCallback,
	tableProps.requestError
)

/**
 * @description table 实例
 */
const tableRef = ref()

/**
 * @description 单选值
 */
const radio = ref('')

/**
 * @description 是否显示搜索模块
 */
const isShowSearch = ref(true)

/**
 * @description column 列类型
 */
const columnTypes: ColumnTypeProps[] = ['selection', 'radio', 'index', 'expand', 'sort']

/**
 * @description 控制 ToolButton 显示
 */
const showToolButton = (key: 'refresh' | 'setting' | 'search') => {
	return Array.isArray(tableProps.toolButton) ? tableProps.toolButton.includes(key) : tableProps.toolButton
}

/**
 * @description 清空选中数据列表
 */
const clearSelection = () => tableRef.value!.clearSelection()

/**
 * @description 初始化表格数据 && 拖拽排序
 */
onMounted(() => {
	tableProps.requestAuto && getTableList()
	tableProps.data && (pageable.value.total = tableProps.data.length)
})

/**
 * @description 处理表格数据
 */
const processTableData = computed(() => {
	if (!tableProps.data) return tableData.value
	if (!tableProps.pagination) return tableProps.data
	return tableProps.data.slice((pageable.value.page - 1) * pageable.value.pageSize, pageable.value.pageSize * pageable.value.page)
})

/**
 * @description 监听页面 initParam 改化，重新获取表格数据
 */
watch(() => tableProps.initParam, getTableList, { deep: true })

/**
 * @description 接收 columns 并设置为响应式
 */
const tableColumns = reactive<ColumnProps[]>(tableProps.columns)

/**
 * @description 扁平化 columns
 */
const flatColumns = computed(() => flatColumnsFunc(tableColumns))

/**
 * @description 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
 */
const enumMap = ref(new Map<string, { [key: string]: any }[]>())
const setEnumMap = async ({ prop, enum: enumValue }: ColumnProps) => {
	if (!enumValue) return

	// 如果当前 enumMap 存在相同的值 return
	if (enumMap.value.has(prop!) && (typeof enumValue === 'function' || enumMap.value.get(prop!) === enumValue)) return

	// 当前 enum 为静态数据，则直接存储到 enumMap
	if (typeof enumValue !== 'function') return enumMap.value.set(prop!, unref(enumValue!))

	// 为了防止接口执行慢，而存储慢，导致重复请求，所以预先存储为[]，接口返回后再二次存储
	enumMap.value.set(prop!, [])

	// 当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
	const { result } = await enumValue()
	enumMap.value.set(prop!, result)
}

/**
 * @description 注入 enumMap
 */
provide('enumMap', enumMap)

/**
 * @description 扁平化 columns 的方法
 */
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
	columns.forEach(async col => {
		if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children))
		flatArr.push(col)

		// column 添加默认 isShow && isFilterEnum 属性值
		col.isShow = col.isShow ?? true
		col.isFilterEnum = col.isFilterEnum ?? true

		// 设置 enumMap
		await setEnumMap(col)
	})
	return flatArr.filter(item => !item._children?.length)
}

/**
 * @description 过滤需要搜索的配置项 && 排序
 */
const searchColumns = computed(() => {
	return flatColumns.value?.filter(item => item.search?.el || item.search?.render).sort((a, b) => a.search!.order! - b.search!.order!)
})

/**
 * @description 设置搜索表单默认排序 && 搜索表单项的默认值
 */
searchColumns.value?.forEach((column, index) => {
	column.search!.order = column.search?.order ?? index + 2
	const key = column.search?.key ?? handleProp(column.prop!)
	const defaultValue = column.search?.defaultValue
	if (defaultValue !== undefined && defaultValue !== null) {
		searchInitParam.value[key] = defaultValue
		searchParam.value[key] = defaultValue
	}
})

/**
 * @description 列设置 ==> 需要过滤掉不需要设置的列
 */
const colRef = ref()
const colSetting = tableColumns!.filter(item => {
	const { type, prop, isShow } = item
	return !columnTypes.includes(type!) && prop !== 'operation' && isShow
})
const openColSetting = () => colRef.value.openColSetting()

/**
 * @description 定义 emit 事件
 */
const emit = defineEmits<{
	search: []
	reset: []
	dargSort: [{ newIndex?: number; oldIndex?: number }]
}>()

const _search = () => {
	search()
	emit('search')
}

const _reset = () => {
	reset()
	emit('reset')
}

/**
 * @description 暴露给父组件的参数和方法
 */
defineExpose({
	element: tableRef,
	tableData: processTableData,
	radio,
	pageable,
	searchParam,
	searchInitParam,
	getTableList,
	search,
	reset,
	handleSizeChange,
	handleCurrentChange,
	clearSelection,
	enumMap,
	isSelected,
	selectedList,
	selectedListIds
})
</script>

<template>
	<!-- 查询表单 -->
	<SearchForm v-show="isShowSearch" :search="_search" :reset="_reset" :columns="searchColumns" :search-param="searchParam" :search-col="searchCol" />

	<!-- 表格主体 -->
	<div class="card table-main">
		<!-- 表格头部，操作按钮 -->
		<div class="table-header">
			<div class="header-button-lf">
				<slot name="tableHeader" :selected-list="selectedList" :selected-list-ids="selectedListIds" :is-selected="isSelected"></slot>
			</div>
			<div v-if="toolButton" class="header-button-ri">
				<slot name="toolButton">
					<el-button v-if="showToolButton('refresh')" circle @click="getTableList">
						<template #icon>
							<pure-icon name="pi-ep:refresh-left"></pure-icon>
						</template>
					</el-button>
					<el-button v-if="showToolButton('setting') && columns.length" circle @click="openColSetting">
						<template #icon>
							<pure-icon name="pi-ep:setting"></pure-icon>
						</template>
					</el-button>
					<el-button v-if="showToolButton('search') && searchColumns?.length" circle @click="isShowSearch = !isShowSearch">
						<template #icon>
							<pure-icon name="pi-ep:search"></pure-icon>
						</template>
					</el-button>
				</slot>
			</div>
		</div>
		<!-- 表格主体 -->
		<el-table
			ref="tableRef"
			v-loading="loading"
			v-bind="$attrs"
			:data="processTableData"
			:border="border"
			:row-key="rowKey"
			@selection-change="selectedChange"
		>
			<!-- 默认插槽 -->
			<slot />
			<template v-for="item in tableColumns" :key="item">
				<!-- selection || radio || index || expand || sort -->
				<el-table-column
					v-if="item.type && columnTypes.includes(item.type)"
					v-bind="item"
					:align="item.align ?? 'center'"
					:reserve-selection="item.type == 'selection'"
				>
					<template #default="scope">
						<!-- expand -->
						<template v-if="item.type == 'expand'">
							<component :is="item.render" v-bind="scope" v-if="item.render" />
							<slot v-else :name="item.type" v-bind="scope" />
						</template>
						<!-- radio -->
						<el-radio v-if="item.type == 'radio'" v-model="radio" :label="scope.row[rowKey]">
							<i></i>
						</el-radio>
						<!-- sort -->
						<el-tag v-if="item.type == 'sort'" class="move">
							<pure-icon name="pi-ep:sort-down"></pure-icon>
						</el-tag>
					</template>
				</el-table-column>
				<!-- other -->
				<TableColumn v-if="!item.type && item.prop && item.isShow" :column="item">
					<template v-for="slot in Object.keys($slots)" #[slot]="scope">
						<slot :name="slot" v-bind="scope" />
					</template>
				</TableColumn>
			</template>
			<!-- 插入表格最后一行之后的插槽 -->
			<template #append>
				<slot name="append" />
			</template>
			<!-- 无数据 -->
			<template #empty>
				<div class="table-empty">
					<slot name="empty">
						<img src="@/assets/notData.png" alt="notData" />
						<div>暂无数据</div>
					</slot>
				</div>
			</template>
		</el-table>
		<!-- 分页组件 -->
		<slot name="pagination">
			<Pagination v-if="pagination" :pageable="pageable" :handle-size-change="handleSizeChange" :handle-current-change="handleCurrentChange" />
		</slot>
	</div>
	<!-- 列设置 -->
	<ColSetting v-if="toolButton" ref="colRef" v-model:col-setting="colSetting" />
</template>

<style scoped lang="scss"></style>
