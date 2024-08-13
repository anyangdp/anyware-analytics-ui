<script setup lang="ts">
import type { VNodeArrayChildren } from 'vue'
import type { BreakPoint, GridProps } from '@/components/PureGrid/types/pureGrid.type'

/**
 * @description 入参
 */
const props = withDefaults(defineProps<GridProps>(), {
	cols: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
	collapsed: false,
	collapsedRows: 1,
	gap: 0
})

/**
 * @description 声明周期函数
 */
onBeforeMount(() => props.collapsed && findIndex())
onMounted(() => {
	resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent)
	window.addEventListener('resize', resize)
})
onActivated(() => {
	resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent)
	window.addEventListener('resize', resize)
})
onUnmounted(() => {
	window.removeEventListener('resize', resize)
})
onDeactivated(() => {
	window.removeEventListener('resize', resize)
})

/**
 * @description 监听屏幕变化
 */
const resize = (e: UIEvent) => {
	let width = (e.target as Window).innerWidth
	switch (!!width) {
		case width < 768:
			breakPoint.value = 'xs'
			break
		case width >= 768 && width < 992:
			breakPoint.value = 'sm'
			break
		case width >= 992 && width < 1200:
			breakPoint.value = 'md'
			break
		case width >= 1200 && width < 1920:
			breakPoint.value = 'lg'
			break
		case width >= 1920:
			breakPoint.value = 'xl'
			break
	}
}

/**
 * @description 注入 gap 间距
 */
provide('gap', Array.isArray(props.gap) ? props.gap[0] : props.gap)

/**
 * @description 注入响应式断点
 */
let breakPoint = ref<BreakPoint>('xl')
provide('breakPoint', breakPoint)

/**
 * @description 注入要开始折叠的 index
 */
const hiddenIndex = ref(-1)
provide('shouldHiddenIndex', hiddenIndex)

/**
 * @description 注入 cols
 */
const gridCols = computed(() => {
	if (typeof props.cols === 'object') return props.cols[breakPoint.value] ?? props.cols
	return props.cols
})
provide('cols', gridCols)

/**
 * @description 寻找需要开始折叠的字段 index
 */
const slots = useSlots().default!()

const findIndex = () => {
	let fields: VNodeArrayChildren = []
	let suffix: VNode | null = null
	slots.forEach((slot: any) => {
		if (typeof slot.type === 'object' && slot.type.name === 'GridItem' && slot.props?.suffix !== undefined) suffix = slot
		if (typeof slot.type === 'symbol' && Array.isArray(slot.children)) fields.push(...slot.children)
	})

	// 计算 suffix 所占用的列
	let suffixCols = 0
	if (suffix) {
		suffixCols =
			((suffix as VNode).props![breakPoint.value]?.span ?? (suffix as VNode).props?.span ?? 1) +
			((suffix as VNode).props![breakPoint.value]?.offset ?? (suffix as VNode).props?.offset ?? 0)
	}
	try {
		let find = false
		fields.reduce((prev = 0, current, index) => {
			prev +=
				((current as VNode)!.props![breakPoint.value]?.span ?? (current as VNode)!.props?.span ?? 1) +
				((current as VNode)!.props![breakPoint.value]?.offset ?? (current as VNode)!.props?.offset ?? 0)
			if (Number(prev) > props.collapsedRows * gridCols.value - suffixCols) {
				hiddenIndex.value = index
				find = true
				throw 'find it'
			}
			return prev
		}, 0)
		if (!find) hiddenIndex.value = -1
	} catch (e) {}
}

/**
 * @description 断点变化时执行 findIndex
 */
watch(
	() => breakPoint.value,
	() => {
		if (props.collapsed) findIndex()
	}
)

/**
 * @description 监听 collapsed
 */
watch(
	() => props.collapsed,
	value => {
		if (value) return findIndex()
		hiddenIndex.value = -1
	}
)

/**
 * @description 设置间距
 */
const gridGap = computed(() => {
	if (typeof props.gap === 'number') return `${props.gap}px`
	if (Array.isArray(props.gap)) return `${props.gap[1]}px ${props.gap[0]}px`
	return 'unset'
})

/**
 * @description 设置 style
 */
const style = computed(() => {
	return {
		display: 'grid',
		gridGap: gridGap.value,
		gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))`
	}
})

defineExpose({ breakPoint })
</script>

<template>
	<div :style="style">
		<slot></slot>
	</div>
</template>

<style scoped lang="scss"></style>
