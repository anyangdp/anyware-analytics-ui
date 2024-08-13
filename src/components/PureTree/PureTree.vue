<script setup lang="ts">
import type { PureTreeFilterProps } from '@/components/PureTree/interfaces/pureTree.interface'

/**
 * @description 定义接收参数
 */
const props = withDefaults(defineProps<PureTreeFilterProps>(), {
	id: 'id',
	label: 'label',
	multiple: false
})

/**
 * @description 定义默认参数
 */
const treeRef = ref()
const selected = ref()
const filterText = ref('')
const treeData = ref<{ [key: string]: any }[]>([])
const emit = defineEmits<{ change: [value: any] }>()
const treeAllData = ref<{ [key: string]: any }[]>([])
const defaultProps = { children: 'children', label: props.label }

/**
 * @description 初始化 api
 */
onBeforeMount(async () => {
	setSelected()
	if (props.requestApi) {
		const { data } = await props.requestApi!()
		treeData.value = data
		treeAllData.value = [{ id: '', [props.label]: '全部' }, ...data]
	}
})

/**
 * @description 获取选中值
 */
const setSelected = () => {
	if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue]
	else selected.value = typeof props.defaultValue === 'string' ? props.defaultValue : ''
}

/**
 * @description 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
 */
watch(
	() => props.defaultValue,
	() => nextTick(() => setSelected()),
	{ deep: true, immediate: true }
)

watch(
	() => props.data,
	() => {
		if (props.data?.length) {
			treeData.value = props.data
			treeAllData.value = [{ id: '', [props.label]: '全部' }, ...props.data]
		}
	},
	{ deep: true, immediate: true }
)

watch(filterText, val => {
	treeRef.value!.filter(val)
})

/**
 * @description 过滤
 */
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
	if (!value) return true
	let parentNode = node.parent,
		labels = [node.label],
		level = 1
	while (level < node.level) {
		labels = [...labels, parentNode.label]
		parentNode = parentNode.parent
		level++
	}
	return labels.some(label => label.indexOf(value) !== -1)
}

/**
 * @description 单选
 */
const handleNodeClick = (data: { [key: string]: any }) => {
	if (props.multiple) return
	emit('change', data[props.id])
}

/**
 * @description 多选
 */
const handleCheckChange = () => {
	emit('change', treeRef.value?.getCheckedKeys())
}

/**
 * @description 暴露给父组件使用
 */
defineExpose({ treeData, treeAllData, treeRef })
</script>

<template>
	<div class="card filter">
		<h4 v-if="title" class="title sle">
			{{ title }}
		</h4>
		<el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
		<el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
			<el-tree
				ref="treeRef"
				:node-key="id"
				:data="multiple ? treeData : treeAllData"
				:show-checkbox="multiple"
				:check-strictly="false"
				:current-node-key="!multiple ? selected : ''"
				:highlight-current="!multiple"
				:expand-on-click-node="false"
				:check-on-click-node="multiple"
				:props="defaultProps"
				:filter-node-method="filterNode"
				:default-checked-keys="multiple ? selected : []"
				@node-click="handleNodeClick"
				@check="handleCheckChange"
			>
			</el-tree>
		</el-scrollbar>
	</div>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
