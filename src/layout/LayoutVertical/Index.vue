<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useGlobalStore } from '@/stores/modules/global'
import { useAuthorStore } from '@/stores/modules/author'
import LayoutMain from '@/layout/components/LayoutMain/Index.vue'
import LayoutNavbar from '@/layout/components/LayoutNavBar/Index.vue'
import SideBarItem from '@/layout/components/LayoutSideBar/SideBarItem.vue'

/**
 * @description 引用全局配置
 */
const route = useRoute()
const globalStore = useGlobalStore()
const authorStore = useAuthorStore()
const title = import.meta.env.VITE_APP_TITLE
const isCollapse = computed(() => globalStore.isCollapse)
const accordion = computed(() => globalStore.accordion)
const menuList = computed(() => authorStore.authMenuList.filter(v => v.meta && !v.meta.isHide))
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string)
</script>

<template>
	<el-container class="pure-layout-admin-wrapper">
		<!--  侧边栏  -->
		<el-aside>
			<div class="pure-layout-sidebar-container" :style="{ width: isCollapse ? '65px' : '210px' }">
				<div class="logo flx-center">
					<img class="logo-img" src="@/assets/logo.png" alt="logo" />
					<span v-show="!isCollapse" class="logo-text">{{ title }}</span>
				</div>
				<el-scrollbar class="menu-container">
					<el-menu
						:router="false"
						:default-active="activeMenu"
						:collapse="isCollapse"
						:unique-opened="accordion"
						:collapse-transition="true"
						background-color="var(--pure-left-menu-background)"
						text-color="var(--pure-menu-color)"
					>
						<SideBarItem :router-list="menuList" />
					</el-menu>
				</el-scrollbar>
			</div>
		</el-aside>
		<!--  中间布局  -->
		<el-container>
			<el-header>
				<LayoutNavbar />
			</el-header>
			<LayoutMain />
		</el-container>
	</el-container>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
