<script setup lang="ts">
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { PureSelectTableProps, PureSelectTableShowLabelProps } from '@/components/PureSelectTable/interfaces/pureSelectTable.interface'

/**
 * @description select 框实例
 */
const selectRef = ref()

/**
 * @description 定义双向绑定数据
 */
const modelValue = defineModel()

/**
 * @description PureTable 实例
 */
const tableRef = ref<PureTableInstance>()

/**
 * @description 抛出事件
 */
const emits = defineEmits(['selectionChange', 'radioChange'])

/**
 * @description 接受父组件参数，配置默认值
 */
const props = withDefaults(defineProps<PureSelectTableProps>(), {
	columns: () => [],
	requestAuto: false,
	pagination: true,
	initParam: {},
	border: true,
	toolButton: false,
	rowKey: 'id',
	searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
	multiple: false,
	width: 800,
	keywords: () => {
		return {
			label: 'label',
			value: 'value'
		}
	}
})

/**
 * @description 页面所需数据
 */
const state = reactive<PureSelectTableShowLabelProps>({
	showLabel: props.label
})

/**
 * @description select 框额外属性
 */
const selectAttr = computed(() => {
	return {
		clearable: true,
		...useAttrs()
	}
})

/**
 * @description select 删除标签
 */
const removeTag = (val: any): void => {
	const row = tableRef.value?.tableData.find((item: any) => item[props.keywords.label] === val)
	tableRef.value?.element?.toggleRowSelection(row, false)
	if (Array.isArray(modelValue.value) && Array.isArray(state.showLabel)) {
		modelValue.value = modelValue.value.filter(s => s != row[props.keywords.value])
		state.showLabel = state.showLabel.filter(s => s != row[props.keywords.label])
	} else {
		modelValue.value = ''
		state.showLabel = ''
	}
}

/**
 * @description select 清空
 */
const onClear = () => {
	tableRef.value?.element?.clearSelection()
	if (Array.isArray(modelValue.value) && Array.isArray(state.showLabel)) {
		modelValue.value.length = 0
		state.showLabel = []
	} else {
		modelValue.value = ''
		state.showLabel = ''
	}
}

/**
 * @description 监测数据表变化
 */
watch(
	() => tableRef.value?.tableData,
	(value, oldValue, onCleanup) => {
		if (props.multiple) {
			if (Array.isArray(modelValue.value)) {
				modelValue.value.forEach((val: any) => {
					value?.forEach(row => {
						if (row[props.keywords.value] === val) {
							if (tableRef.value?.selectedList.find((item: any) => item[props.keywords.value] === val) === undefined) {
								tableRef.value?.element?.toggleRowSelection(row, true)
							}
						}
					})
				})
			}
		} else {
			if (value !== undefined && value.length > 0) {
				value?.forEach(row => {
					if (row[props.keywords.value] === modelValue.value) {
						state.showLabel = row[props.keywords.label]
						tableRef.value?.element?.setCurrentRow(row)
					}
				})
			}
		}
	},
	{ immediate: true }
)

/**
 * @description 表格选择事件
 */
const handleSelected = (selection: any, row: any) => {
	// true 就是选中，0 或者 false 是取消选中
	let selected = selection.length && selection.indexOf(row) !== -1
	if (selected) {
		if (Array.isArray(modelValue.value) && Array.isArray(state.showLabel)) {
			if (modelValue.value.find(s => s === row[props.keywords.value]) === undefined) {
				modelValue.value.push(row[props.keywords.value])
				state.showLabel.push(row[props.keywords.label])
			}
		}
	} else {
		if (Array.isArray(modelValue.value) && Array.isArray(state.showLabel)) {
			modelValue.value = modelValue.value.filter(s => s != row[props.keywords.value])
			state.showLabel = state.showLabel.filter(s => s != row[props.keywords.label])
		}
	}

	emits('selectionChange', selection)
}

/**
 * @description 行点击事件
 */
const rowClick = (row: any, column: any) => {
	// 如果不是多选操作，调用表格选择
	if (!props.multiple) {
		state.showLabel = row[props.keywords.label]
		modelValue.value = row[props.keywords.value]
		onSure()

		emits('radioChange', row, row && row[props.keywords.value])
	}
}

/**
 * @description 高亮当前选中行
 */
const rowStyle = (data: any) => {
	if (props.multiple) return
	return {
		cursor: 'pointer',
		background: data.row[props.keywords.label] === state.showLabel ? 'var(--el-color-primary-light-9)' : ''
	}
}

/**
 * @description 下拉筛选确认
 */
const onSure = () => {
	selectRef.value.blur()
}

/**
 * @description 初始化表格
 */
const initTable = () => {
	tableRef.value?.getTableList()
}

/**
 * @description 暴露方法
 */
defineExpose({
	initTable
})
</script>

<template>
	<el-select
		ref="selectRef"
		v-model="state.showLabel"
		placeholder="请选择"
		:multiple="props.multiple"
		:collapse-tags="props.multiple"
		:max-collapse-tags="5"
		:value-key="props.keywords.value"
		@remove-tag="removeTag"
		@clear="onClear"
		v-bind="selectAttr"
	>
		<template #empty>
			<div class="table-box p-4" :style="{ width: props.width + 'px', height: '50vh' }">
				<!--				<div class="table-box p-4 p-l14 p-r14">-->
				<pure-table
					ref="tableRef"
					:row-key="props.rowKey"
					:row-style="rowStyle"
					:columns="props.columns"
					:pagination="props.pagination"
					:tool-button="props.toolButton"
					:border="props.border"
					:data="props.data"
					:title="props.title"
					:data-callback="props.dataCallback"
					:request-api="props.requestApi"
					:request-auto="props.requestAuto"
					:request-error="props.requestError"
					:init-param="props.initParam"
					:search-col="props.searchCol"
					@select="handleSelected"
					@row-click="rowClick"
				></pure-table>
				<el-button class="absolute bottom-[45px] left-[30px]" type="primary" bg @click="onSure"> 确定</el-button>
			</div>
		</template>
	</el-select>
</template>

<style scoped lang="scss">
:deep(.el-table__header-wrapper .el-checkbox) {
	display: none;
}
</style>
