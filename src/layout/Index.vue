<script setup lang="ts">
import type { Component } from 'vue'
import { useGlobalStore } from '@/stores/modules/global'
import type { LayoutType } from '@/recursos/types/global.type'
import LayoutColumns from '@/layout/LayoutColumns/Index.vue'
import LayoutClassic from '@/layout/LayoutClassic/Index.vue'
import LayoutVertical from '@/layout/LayoutVertical/Index.vue'
import LayoutTransverse from '@/layout/LayoutTransverse/Index.vue'
import ThemeDrawer from '@/layout/components/ThemeDrawer/Index.vue'
/**
 * @description 定义布局类型，不同布局对应不同的布局组件
 * @return {Record<LayoutType, Component>>} 布局组件
 */
const layoutComponents: Record<LayoutType, Component> = {
	vertical: LayoutVertical,
	classic: LayoutClassic,
	transverse: LayoutTransverse,
	columns: LayoutColumns
}

/**
 * @description 获取全局布局配置
 */
const globalStore = useGlobalStore()
const layout = computed(() => globalStore.layout)
</script>

<template>
	<component :is="layoutComponents[layout]" />
	<ThemeDrawer />
</template>

<style scoped lang="scss"></style>
