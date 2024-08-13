<script setup lang="ts" name="LayoutMain">
import type { RendererElement, RendererNode } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useGlobalStore } from '@/stores/modules/global'
import { useKeepAliveStore } from '@/stores/modules/keepAlive'
import LayoutFooter from '@/layout/components/LayoutFooter/Index.vue'
import LayoutTabsBar from '@/layout/components/LayoutTabsBar/Index.vue'

const globalStore = useGlobalStore()
const keepAliveStore = useKeepAliveStore()
const isTabs = computed(() => globalStore.tabs)
const layout = computed(() => globalStore.layout)
const isFooter = computed(() => globalStore.footer)
const keepAliveName = computed(() => keepAliveStore.keepAliveName)

// 通过 provide 进行页面刷新
const isRouterShow = ref(true)
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val)
provide('refresh', refreshCurrentPage)

// 通过 globalStore 进行刷新页面
watch(
	() => globalStore.refresh,
	() => {
		isRouterShow.value = false
		nextTick(() => {
			isRouterShow.value = true
		})
	}
)

// 解决详情页 keep-alive 问题
const wrapperMap = new Map()
function createComponentWrapper(component: globalThis.VNode<RendererNode, RendererElement>, route: RouteLocationNormalizedLoaded) {
	if (!component) return
	const wrapperName = route.fullPath
	let wrapper = wrapperMap.get(wrapperName)
	if (!wrapper) {
		wrapper = { name: wrapperName, render: () => h(component) }
		wrapperMap.set(wrapperName, wrapper)
	}
	return h(wrapper)
}

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
	() => layout.value,
	() => {
		const body = document.body as HTMLElement
		body.setAttribute('class', layout.value)
	},
	{ immediate: true }
)
</script>

<template>
	<LayoutTabsBar v-if="isTabs" />
	<el-main>
		<router-view v-slot="{ Component, route }">
			<transition appear name="el-fade-in" mode="out-in">
				<keep-alive :include="keepAliveName">
					<component :is="createComponentWrapper(Component, route)" v-if="isRouterShow" :key="route.fullPath" />
				</keep-alive>
			</transition>
		</router-view>
	</el-main>
	<el-footer v-if="isFooter">
		<LayoutFooter />
	</el-footer>
</template>

<style scoped lang="scss">
.el-main {
	box-sizing: border-box;
	padding: 7px;
	overflow-x: hidden;
	background-color: var(--pure-bg-main-color);
}
.el-footer {
	padding: 0;
	height: var(--pure-app-footer-height);
}
</style>
