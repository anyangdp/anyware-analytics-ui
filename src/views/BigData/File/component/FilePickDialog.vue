<script setup lang="ts">
import { directoryAllList } from '@/api/file/sFile'

interface DialogProps {
	visible: boolean;
}

const props = defineProps<DialogProps>()

// 定义 emit 用于更新 visible
const emits = defineEmits<{
	'update:visible': [value: boolean];
	'submit': [value: any]
}>()

const defaultProps = {
	children: 'children',
	label: 'name',
	isLeaf: (data) => !data.directory, // 目录不是叶子节点
	disabled: (data) => data.directory, // 目录无法选中
}
const loadTree = async (node: any, resolve: any) => {
	if (node.level === 0) {
		return resolve([{ value: '', name: '服务器资源', directory: true }])
	}
	let tree: any = await directoryAllList({ relativePath: node.data.value === '' ? '' : '/' + node.data.name })
	if (tree) {
		resolve(tree)
	} else {
		resolve([])
	}
}

const clickNode = (val: any) => {
	if (!val.directory) {
		emits('submit', val)
	}
}

// 关闭对话框的方法
const closeDialog = () => {
	emits('update:visible', false)
}

</script>

<template>
	<el-dialog
		title="提示"
		v-model="props.visible"
		width="30%"
		@update:model-value="emits('update:visible', $event)"
		@close="closeDialog"
	>
		<el-scrollbar :style="{ height: `200px` }">
			<el-tree
				:load="loadTree"
				:props="defaultProps"
				lazy
				@node-click="clickNode"
				:expand-on-click-node="false"
			>
				<template #default="{ node, data }">
        					<span style="display: flex; align-items: center">
										<pure-icon :name="data.directory ? 'pi-carbon:folder': 'pi-carbon:document'"
															 :color="data.directory ? '#409EFF' : '#666'"></pure-icon>
        					</span>
					<span  style="display: flex; align-items: center">
											{{ data.name }}
										</span>
				</template>
			</el-tree>
		</el-scrollbar>
	</el-dialog>
</template>

<style scoped lang="scss">

</style>