<script setup lang="ts">
import { reactive } from 'vue'
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useGlobalStore } from '@/stores/modules/global'
import type { EpPropMergeType } from 'element-plus/es/utils'
import { getDarkColor, getLightColor } from '@/utils/color.util'

/**
 * @description 获取全局主题
 */
const { primary } = useGlobalStore()

/**
 * @description 计算主题颜色变化
 */
document.documentElement.style.setProperty('--el-color-primary', primary)
for (let i = 1; i <= 9; i++) {
	const primaryColor = `${getLightColor(primary, i / 10)}`
	const darkColor = `${getDarkColor(primary, i / 10)}`
	document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor)
	document.documentElement.style.setProperty(`--el-color-primary-dark-${i}`, darkColor)
}

/**
 * @description 初始化页面参数
 */
let state = reactive({
	size: 'small' as EpPropMergeType<StringConstructor, '' | 'default' | 'small' | 'large', never> | undefined,
	zIndex: 300,
	local: zhCn
})
</script>

<template>
	<el-config-provider :size="state.size" :z-index="state.zIndex" :locale="state.local">
		<RouterView />
	</el-config-provider>
</template>

<style scoped></style>
