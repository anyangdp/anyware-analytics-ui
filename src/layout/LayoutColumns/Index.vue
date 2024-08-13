<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuthorStore } from '@/stores/modules/author'
import { useGlobalStore } from '@/stores/modules/global'
import { HOME_URL } from '@/recursos/constantes/app.constant'
import LayoutMain from '@/layout/components/LayoutMain/Index.vue'
import LayoutNavBar from '@/layout/components/LayoutNavBar/Index.vue'
import SideBarItem from '@/layout/components/LayoutSideBar/SideBarItem.vue'
import type { AuthorMenuTree } from '@/api/system/interfaces/author.interface'

/**
 * @description 初始化对象
 */
const route = useRoute()
const router = useRouter()
const splitActive = ref('')
const authStore = useAuthorStore()
const globalStore = useGlobalStore()
const title = import.meta.env.VITE_APP_TITLE
const subMenuList = ref<AuthorMenuTree[]>([])
const menuList = computed(() => authStore.authMenuList)
const accordion = computed(() => globalStore.accordion)
const isCollapse = computed(() => globalStore.isCollapse)
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string)

/**
 * @description 监听路由和菜单列表，动态渲染子菜单
 */
watch(
	() => [menuList, route],
	() => {
		if (!menuList.value.length) return
		splitActive.value = route.path
		const menuItem = menuList.value.filter((item: AuthorMenuTree) => {
			return route.path === item.path || `/${route.path.split('/')[1]}` === item.path
		})
		if (menuItem.length > 0) {
			if (menuItem[0].children?.length) return (subMenuList.value = menuItem[0].children)
		}
		subMenuList.value = []
	},
	{
		deep: true,
		immediate: true
	}
)

/**
 * @description 切换子菜单
 */
const changeSubMenu = (item: AuthorMenuTree) => {
	splitActive.value = item.path ?? ''
	if (item.children?.length) return (subMenuList.value = item.children)
	subMenuList.value = []
	router.push(item.path ?? HOME_URL)
}
</script>

<template>
	<el-container class="layout">
		<div class="aside-split">
			<!-- 侧边栏 logo -->
			<div class="logo flx-center">
				<img class="logo-img" src="@/assets/logo.png" alt="logo" />
			</div>
			<!-- 一级侧边栏 -->
			<el-scrollbar>
				<div class="split-list">
					<div
						v-for="item in menuList"
						:key="item.path ?? ''"
						class="split-item"
						:class="{ 'split-active': splitActive === item.path || `/${splitActive.split('/')[1]}` === item.path }"
						@click="changeSubMenu(item)"
					>
						<el-icon>
							<pure-icon :name="item.meta?.icon ?? ''" />
						</el-icon>
						<span class="title">{{ item.meta?.title }}</span>
					</div>
				</div>
			</el-scrollbar>
		</div>
		<!-- 二级侧边栏 -->
		<el-aside :class="{ 'not-aside': !subMenuList.length }" :style="{ width: isCollapse ? '65px' : '210px' }">
			<div class="logo flx-center">
				<span v-show="subMenuList.length" class="logo-text">{{ isCollapse ? 'P' : title }}</span>
			</div>
			<el-scrollbar>
				<el-menu :router="false" :default-active="activeMenu" :collapse="isCollapse" :unique-opened="accordion" :collapse-transition="false">
					<SideBarItem :routerList="subMenuList" />
				</el-menu>
			</el-scrollbar>
		</el-aside>
		<el-container>
			<!-- 头部 -->
			<el-header>
				<LayoutNavBar />
			</el-header>
			<!-- 主体部分 -->
			<LayoutMain />
		</el-container>
	</el-container>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
