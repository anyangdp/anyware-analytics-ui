<script setup lang="ts">
import { ref } from 'vue'

import { storeToRefs } from 'pinia'
import mittBus from '@/plugins/mitt'
import { useTheme } from '@/hooks/useTheme'
import { useGlobalStore } from '@/stores/modules/global'
import type { LayoutType } from '@/recursos/types/global.type'
import { DEFAULT_PRIMARY } from '@/recursos/constantes/app.constant'

const { changePrimary } = useTheme()

const globalStore = useGlobalStore()
const { layout, primary, isCollapse, accordion, breadcrumb, breadcrumbIcon, tabs, tabsIcon, footer } = storeToRefs(globalStore)

// 预定义主题颜色
const colorList = [DEFAULT_PRIMARY, '#daa96e', '#0c819f', '#409eff', '#27ae60', '#ff5c93', '#e74c3c', '#fd726d', '#f39c12', '#9b59b6']

// 设置布局方式
const setLayout = (val: LayoutType) => {
	globalStore.setGlobalState('layout', val)
}

// 打开主题设置
const drawerVisible = ref(false)
mittBus.on('openThemeDrawer', () => (drawerVisible.value = true))
</script>

<template>
	<el-drawer v-model="drawerVisible" title="布局设置" size="300px">
		<!-- 布局样式 -->
		<el-divider class="divider" content-position="center"> <pure-icon name="pi-carbon:blog" />布局样式</el-divider>
		<div class="layout-box">
			<el-tooltip effect="dark" content="纵向" placement="top" :show-after="200">
				<div :class="['layout-item layout-vertical', { 'is-active': layout == 'vertical' }]" @click="setLayout('vertical')">
					<div class="layout-dark"></div>
					<div class="layout-container">
						<div class="layout-light"></div>
						<div class="layout-content"></div>
					</div>
					<pure-icon name="pi-carbon:checkmark-filled" v-if="layout == 'vertical'" />
				</div>
			</el-tooltip>
			<el-tooltip effect="dark" content="经典" placement="top" :show-after="200">
				<div :class="['layout-item layout-classic', { 'is-active': layout == 'classic' }]" @click="setLayout('classic')">
					<div class="layout-dark"></div>
					<div class="layout-container">
						<div class="layout-light"></div>
						<div class="layout-content"></div>
					</div>
					<pure-icon name="pi-carbon:checkmark-filled" v-if="layout == 'classic'" />
				</div>
			</el-tooltip>
			<el-tooltip effect="dark" content="横向" placement="top" :show-after="200">
				<div :class="['layout-item layout-transverse', { 'is-active': layout == 'transverse' }]" @click="setLayout('transverse')">
					<div class="layout-dark"></div>
					<div class="layout-content"></div>
					<pure-icon name="pi-carbon:checkmark-filled" v-if="layout == 'transverse'" />
				</div>
			</el-tooltip>
			<el-tooltip effect="dark" content="分栏" placement="top" :show-after="200">
				<div :class="['layout-item layout-columns', { 'is-active': layout == 'columns' }]" @click="setLayout('columns')">
					<div class="layout-dark"></div>
					<div class="layout-light"></div>
					<div class="layout-content"></div>
					<pure-icon name="pi-carbon:checkmark-filled" v-if="layout == 'columns'" />
				</div>
			</el-tooltip>
		</div>

		<!-- 全局主题 -->
		<el-divider class="divider" content-position="center"> <pure-icon name="pi-carbon:cookie" />全局主题 </el-divider>
		<div class="theme-item">
			<span>主题颜色</span>
			<el-color-picker v-model="primary" :predefine="colorList" @change="changePrimary" />
		</div>

		<!-- 界面设置 -->
		<el-divider class="divider" content-position="center"> <pure-icon name="pi-carbon:open-panel-left" />界面设置 </el-divider>
		<div class="theme-item">
			<span>菜单折叠</span>
			<el-switch v-model="isCollapse" />
		</div>
		<div class="theme-item">
			<span>菜单手风琴</span>
			<el-switch v-model="accordion" />
		</div>
		<div class="theme-item">
			<span>面包屑</span>
			<el-switch v-model="breadcrumb" />
		</div>
		<div class="theme-item">
			<span>面包屑图标</span>
			<el-switch v-model="breadcrumbIcon" />
		</div>
		<div class="theme-item">
			<span>标签栏</span>
			<el-switch v-model="tabs" />
		</div>
		<div class="theme-item">
			<span>标签栏图标</span>
			<el-switch v-model="tabsIcon" />
		</div>
		<div class="theme-item">
			<span>页脚</span>
			<el-switch v-model="footer" />
		</div>
	</el-drawer>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
