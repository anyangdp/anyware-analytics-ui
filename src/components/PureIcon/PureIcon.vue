<script setup lang="ts">
import { ElIcon } from 'element-plus'
import type { PureIconProps } from '@/components/PureIcon/interfaces/icon.interface'

/**
 * @description 接收父组件参数并设置默认值
 */
const props = withDefaults(defineProps<PureIconProps>(), {
	size: 16
})

/**
 * @description 是否为 iconify 图标
 */
const isIconify = computed(() => props.name.startsWith('pi-'))

/**
 * @description 图标在 iconfont 中的名字
 */
const iconClassName = computed(() => {
	return `#${props.name}`
})

/**
 * @description 获取图标样式
 */
const getIconifyStyle = computed(() => {
	const { color, size } = props
	return {
		fontSize: `${size}px`,
		color
	}
})
</script>

<template>
	<ElIcon :size="size" :color="color">
		<svg class="icon" v-if="!isIconify" aria-hidden="true">
			<use :xlink:href="iconClassName" />
		</svg>
		<template v-else>
			<div :class="`${props.name}`" :style="getIconifyStyle"></div>
		</template>
	</ElIcon>
</template>

<style scoped></style>
