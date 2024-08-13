<script setup lang="ts">
import { useIcon } from '@/hooks/useIcon'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { PureTransferTableProps } from '@/components/PureTransferTable/interfaces/pureTransferTable.interface'

/**
 * @description PureTable 实例
 */
const tableLeftRef = ref<PureTableInstance>()
const tableRightRef = ref<PureTableInstance>()
const leftIcon = useIcon({ name: 'pi-carbon:chevron-right' })
const rightIcon = useIcon({ name: 'pi-carbon:chevron-left' })

/**
 * @description 定义变量内容
 */
let state = reactive({
	isShowDialog: false,
	leftSelectData: [],
	rightSelectData: [],
	leftLoading: false,
	rightLoading: false
})

/**
 * @description 接受父组件参数，配置默认值
 */
const props = withDefaults(defineProps<PureTransferTableProps>(), {
	columns: () => [],
	requestAuto: true,
	pagination: true,
	initParam: {},
	toolButton: false,
	rowKey: 'id',
	width: 1200,
	searchCol: () => ({ xs: 1, sm: 1, md: 1, lg: 2, xl: 3 })
})

/**
 * @description 抛出事件
 */
const emits = defineEmits(['relation', 'unRelation', 'reload'])

/**
 * @description打开弹窗
 */
const openDialog = () => {
	state.isShowDialog = true
}

/**
 * @description 关闭弹窗
 */
const closeDialog = () => {
	state.isShowDialog = false
	state.leftSelectData = []
	state.rightSelectData = []
	emits('reload')
}

/**
 * @description 取消
 */
const onCancel = () => {
	closeDialog()
}

/**
 * @description 左表格选择事件
 */
const handleLeftSelected = (selection: any) => {
	state.leftSelectData = selection
}

/**
 * @description 右表格选择事件
 */
const handleRightSelected = (selection: any) => {
	state.rightSelectData = selection
}

/**
 * @description 关联
 */
const relation = () => {
	state.leftLoading = true
	emits('relation', state.leftSelectData, props.initParam)
	setTimeout(() => {
		state.leftSelectData = []
		state.rightSelectData = []
		tableLeftRef.value?.clearSelection()
		tableRightRef.value?.clearSelection()
		tableLeftRef.value?.getTableList()
		tableRightRef.value?.getTableList()
		state.leftLoading = false
	}, 400)
}

/**
 * @description 取消关联
 */
const unRelation = () => {
	state.rightLoading = true
	emits('unRelation', state.rightSelectData, props.initParam)
	setTimeout(() => {
		state.leftSelectData = []
		state.rightSelectData = []
		tableLeftRef.value?.clearSelection()
		tableRightRef.value?.clearSelection()
		tableLeftRef.value?.getTableList()
		tableRightRef.value?.getTableList()
		state.rightLoading = false
	}, 400)
}

/**
 * @description 暴露打开弹框方法
 */
defineExpose({
	openDialog
})
</script>

<template>
	<el-dialog v-model="state.isShowDialog" :width="props.width + 'px'" destroy-on-close class="dialog-transfer" :before-close="onCancel">
		<template #header>
			<div>
				<pure-icon name="pi-carbon:chart-relationship"></pure-icon>
				<span>关联</span>
			</div>
		</template>
		<div class="transfer-container">
			<div class="transfer-left">
				<div class="transfer-top">
					<div class="transfer-top-title">
						<span>待选列表</span>
					</div>
					<div class="transfer-top-number">
						<p>{{ props.pagination ? tableLeftRef?.pageable.total : tableLeftRef?.tableData.length }} 项</p>
					</div>
				</div>
				<div class="transfer-main">
					<div class="table-box" style="width: 100%; height: 60vh">
						<pure-table
							ref="tableLeftRef"
							:row-key="props.rowKey"
							:columns="props.columns"
							:pagination="props.pagination"
							:tool-button="props.toolButton"
							:data="props.dataLeft"
							:title="props.title"
							:data-callback="props.dataCallback"
							:request-api="props.requestLeftApi"
							:init-param="props.initParam"
							:search-col="props.searchCol"
							@selection-change="handleLeftSelected"
						></pure-table>
					</div>
				</div>
			</div>
			<div class="transfer-btn">
				<div class="btn-add">
					<el-button
						type="primary"
						:icon="leftIcon"
						:loading="state.leftLoading"
						:disabled="state.leftSelectData.length ? false : true"
						@click="relation"
					></el-button>
				</div>
				<div class="btn-del">
					<el-button
						type="primary"
						:icon="rightIcon"
						:loading="state.rightLoading"
						:disabled="state.rightSelectData.length ? false : true"
						@click="unRelation"
					></el-button>
				</div>
			</div>
			<div class="transfer-right">
				<div class="transfer-top">
					<div class="transfer-top-title">
						<span>已选列表</span>
					</div>
					<div class="transfer-top-number">
						<p>{{ props.pagination ? tableRightRef?.pageable.total : tableRightRef?.tableData.length }} 项</p>
					</div>
				</div>
				<div class="transfer-main">
					<div class="table-box" style="width: 100%; height: 60vh">
						<pure-table
							ref="tableRightRef"
							:row-key="props.rowKey"
							:columns="props.columns"
							:pagination="props.pagination"
							:tool-button="props.toolButton"
							:data="props.dataRight"
							:data-callback="props.dataCallback"
							:request-api="props.requestRightApi"
							:init-param="props.initParam"
							:search-col="props.searchCol"
							@selection-change="handleRightSelected"
						></pure-table>
					</div>
				</div>
			</div>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="onCancel">取 消</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
