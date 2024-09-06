<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { TabPaneName, TabsPaneContext } from 'element-plus'

import { useTabsStore } from '@/stores/modules/tabs'
import { useGlobalStore } from '@/stores/modules/global'
import { useAuthorStore } from '@/stores/modules/author'
import type { TabsMenuProps } from '@/stores/interfaces/tabs.interface'
import MoreButton from '@/layout/components/LayoutTabsBar/MoreButton.vue'
import { HOME_TITLE, HOME_URL } from '@/recursos/constantes/app.constant'

/**
 * @description 初始化基础对象
 */
const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()
const authorStore = useAuthorStore()
const globalStore = useGlobalStore()
const tabsMenuValue = ref(route.fullPath)
const tabsIcon = computed(() => globalStore.tabsIcon)
const tabsMenuList = computed(() => tabsStore.tabsMenuList)

/**
 * @description 页面初始化
 */
onMounted(() => {
	initTabs()
})

/**
 * @description 初始化 tab，生成需要固定的 tabs
 */
const initTabs = () => {
	authorStore.menuList.forEach(item => {
		if (item.children?.length)
			item.children.forEach(childItem => {
				if (childItem.meta?.isAffix && !childItem.meta?.isHide) {
					const tabsParams: TabsMenuProps = {
						icon: childItem.meta.icon ?? '',
						title: childItem.meta.title ?? '',
						path: childItem.path ?? '',
						name: childItem.name ?? '',
						close: !childItem.meta.isAffix,
						isKeepAlive: childItem.meta.isKeepAlive ?? false
					}
					tabsStore.addTabs(tabsParams)
				}
			})

		if (item.meta?.isAffix && !item.meta?.isHide) {
			const tabsParams: TabsMenuProps = {
				icon: item.meta.icon ?? '',
				title: item.meta.title ?? '',
				path: item.path ?? '',
				name: item.name ?? '',
				close: !item.meta.isAffix,
				isKeepAlive: item.meta.isKeepAlive ?? false
			}
			tabsStore.addTabs(tabsParams)
		}
	})

	// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
	watch(
		() => route.fullPath,
		() => {
			if (route.meta.isFull) return
			tabsMenuValue.value = route.fullPath
			const tabsParams = {
				icon: route.meta.icon as string,
				title: route.meta.title as string,
				path: route.fullPath,
				name: route.name as string,
				close: !route.meta.isAffix,
				isKeepAlive: route.meta.isKeepAlive as boolean
			}
			if (route.fullPath === HOME_URL) {
				tabsParams.title = HOME_TITLE
				tabsParams.close = false
			}
			tabsStore.addTabs(tabsParams)
		},
		{ immediate: true }
	)
}

/**
 * @description tab 点击
 */
const tabClick = (tabItem: TabsPaneContext) => {
	const fullPath = tabItem.props.name as string
	router.push(fullPath)
}

/**
 * @description tab 删除
 */
const tabRemove = (fullPath: TabPaneName) => {
	tabsStore.removeTabs(fullPath as string, fullPath == route.fullPath)
}
</script>

<template>
	<div class="tabs-box">
		<div class="tabs-menu">
			<el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
				<el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path" :closable="item.close">
					<template #label>
						<pure-icon v-if="item.icon && tabsIcon" :name="item.icon" />
						<span style="margin-left: 6px">{{ item.title }}</span>
					</template>
				</el-tab-pane>
			</el-tabs>
			<MoreButton />
		</div>
	</div>
</template>

<style scoped lang="scss">
.tabs-box {
	background-color: var(--el-bg-color);

	.tabs-menu {
		position: relative;
		width: 100%;

		:deep(.el-tabs) {
			.el-tabs__header {
				box-sizing: border-box;
				height: var(--pure-tabs-bar-height);
				padding: 0 5px;
				margin: 0;

				.el-tabs__nav-wrap {
					position: absolute;
					width: calc(100% - 70px);

					.el-tabs__nav {
						display: flex;
						border: none;

						.el-tabs__item {
							font-size: 12px;
							display: flex;
							align-items: center;
							justify-content: center;
							color: #afafaf;
							border: none;
							height: var(--pure-tabs-item-height);

							.tabs-icon {
								margin: 1.5px 4px 0 0;
								font-size: 12px;
							}

							.is-icon-close {
								margin-top: 1px;
							}

							&.is-active {
								color: var(--el-color-primary);

								&::before {
									position: absolute;
									bottom: 0;
									width: 100%;
									height: 0;
									content: '';
									border-bottom: 2px solid var(--el-color-primary) !important;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
