<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuthorStore } from '@/stores/modules/author'
import LayoutMain from '@/layout/components/LayoutMain/Index.vue'
import LayoutNavBar from '@/layout/components/LayoutNavBar/Index.vue'
import SideBarItem from '@/layout/components/LayoutSideBar/SideBarItem.vue'
import type { AuthorMenuTree } from '@/api/system/interfaces/author.interface'

/**
 * @description 引用全局配置
 */
const route = useRoute()
const router = useRouter()
const authorStore = useAuthorStore()
const title = import.meta.env.VITE_APP_TITLE
const menuList = computed(() => authorStore.authMenuList.filter(v => v.meta && !v.meta.isHide))
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string)

/**
 * @description 菜单点击事件
 */
const handleClickMenu = (subItem: AuthorMenuTree) => {
	if (subItem.meta?.isLink) return window.open(subItem.meta?.isLink, '_blank')
	router.push(subItem?.path ?? '')
}
</script>

<template>
	<el-container class="layout">
		<el-header>
			<div class="logo flx-center">
				<img class="logo-img" src="@/assets/logo.png" alt="logo" />
				<span class="logo-text">{{ title }}</span>
			</div>
			<el-menu mode="horizontal" :router="false" :default-active="activeMenu">
				<!-- 不能直接使用 SubMenu 组件，无法触发 el-menu 隐藏省略功能 -->
				<template v-for="subItem in menuList" :key="subItem.path">
					<el-sub-menu v-if="subItem.children?.length" :key="subItem.path ?? ''" :index="subItem.path + 'el-sub-menu'">
						<template #title>
							<pure-icon :name="subItem.meta?.icon ?? ''"></pure-icon>
							<span>{{ subItem.meta?.title }}</span>
						</template>
						<SideBarItem :router-list="subItem.children" />
					</el-sub-menu>
					<el-menu-item v-else :key="subItem.path + 'el-menu-item'" :index="subItem.path" @click="handleClickMenu(subItem)">
						<pure-icon :name="subItem.meta?.icon ?? ''"></pure-icon>
						<template #title>
							<span>{{ subItem.meta?.title }}</span>
						</template>
					</el-menu-item>
				</template>
			</el-menu>
			<LayoutNavBar :header-menu="true" />
		</el-header>
		<LayoutMain />
	</el-container>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
