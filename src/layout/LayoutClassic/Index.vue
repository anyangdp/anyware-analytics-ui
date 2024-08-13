<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores/modules/global'
import { useAuthorStore } from '@/stores/modules/author'
import PureIcon from '@/components/PureIcon/PureIcon.vue'
import { HOME_URL } from '@/recursos/constantes/app.constant'
import LayoutMain from '@/layout/components/LayoutMain/Index.vue'
import LayoutNavBar from '@/layout/components/LayoutNavBar/Index.vue'
import SideBarItem from '@/layout/components/LayoutSideBar/SideBarItem.vue'
import type { AuthorMenuTree } from '@/api/system/interfaces/author.interface'

/**
 * @description 初始化相关对象
 */
const route = useRoute()
const router = useRouter()
const splitActive = ref('')
const globalStore = useGlobalStore()
const authorStore = useAuthorStore()
const title = import.meta.env.VITE_APP_TITLE
const subMenuList = ref<AuthorMenuTree[]>([])
const accordion = computed(() => globalStore.accordion)
const isCollapse = computed(() => globalStore.isCollapse)
const menuList = computed(() => authorStore.authMenuList.filter(v => v.meta && !v.meta.isHide))
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string)

/**
 * @description 监听路由和菜单列表，动态渲染子菜单
 */
watch(
	() => [menuList, route],
	() => {
		if (!menuList.value.length) return
		const menuItem = menuList.value.filter((item: AuthorMenuTree) => {
			return route.path === item.path || `/${route.path.split('/')[1]}` === item.path
		})
		if (menuItem.length > 0) {
			if (menuItem[0].children?.length) {
				splitActive.value = '/' + route.path.split('/')[1]
				return (subMenuList.value = menuItem[0].children)
			}
		}
		splitActive.value = route.path
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
	if (item.children?.length) return (subMenuList.value = item.children)
	subMenuList.value = []
	router.push(item.path ?? HOME_URL)
}
</script>

<template>
	<!-- 经典布局 -->
	<el-container class="layout">
		<el-header>
			<div class="logo flx-center">
				<img class="logo-img" src="@/assets/logo.png" alt="logo" />
				<span class="logo-text">{{ title }}</span>
			</div>
			<el-menu mode="horizontal" :router="false" :default-active="splitActive">
				<template v-for="subItem in menuList" :key="subItem.path">
					<el-menu-item :index="subItem.path" @click="changeSubMenu(subItem)">
						<template v-if="subItem.meta?.icon">
							<pure-icon :name="subItem.meta.icon" />
							<span>{{ subItem.meta?.title }}</span>
						</template>
						<template v-else>
							{{ subItem.meta?.title }}
						</template>
					</el-menu-item>
				</template>
			</el-menu>
			<LayoutNavBar :header-menu="true" />
		</el-header>
		<el-container class="classic-content">
			<el-aside>
				<div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
					<el-scrollbar>
						<el-menu
							:router="false"
							:default-active="activeMenu"
							:collapse="isCollapse"
							:unique-opened="accordion"
							:collapse-transition="false"
							background-color="var(--pure-left-menu-background)"
							text-color="#fff"
						>
							<SideBarItem :routerList="subMenuList" />
						</el-menu>
					</el-scrollbar>
				</div>
			</el-aside>
			<el-container class="classic-main">
				<LayoutMain />
			</el-container>
		</el-container>
	</el-container>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
