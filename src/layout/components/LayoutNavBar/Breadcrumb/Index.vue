<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useGlobalStore } from '@/stores/modules/global'
import { useAuthorStore } from '@/stores/modules/author'
import { HOME_URL } from '@/recursos/constantes/app.constant'
import type { AuthorMenuTree } from '@/api/system/interfaces/author.interface'

/**
 * @description 初始化对象
 */
const route = useRoute()
const router = useRouter()
const authorStore = useAuthorStore()
const globalStore = useGlobalStore()
const colorIcon = computed(() => {
	const layout = globalStore.layout
	if (layout === 'columns') {
		return 'black'
	} else return 'white'
})

/**
 * @description 计算对象
 */
const breadcrumbList = computed(() => {
	let breadcrumbData = authorStore.getBreadcrumbList[route.matched[route.matched.length - 1].path] ?? []
	// 不需要首页面包屑可删除以下判断
	/*  if (breadcrumbData[0].path !== HOME_URL) {
      breadcrumbData = [{path: HOME_URL, meta: {icon: "HomeFilled", title: "首页"}}, ...breadcrumbData];
    }*/
	return breadcrumbData
})

/**
 * @description 面包屑点击事件
 */
const onBreadcrumbClick = (item: AuthorMenuTree, index: number) => {
	if (index !== breadcrumbList.value.length - 1 && item.children?.length == 0) router.push(item.path ?? HOME_URL)
}
</script>

<template>
	<div :class="['breadcrumb-box mask-image', !globalStore.breadcrumbIcon && 'no-icon']">
		<el-breadcrumb separator="/">
			<transition-group name="breadcrumb">
				<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
					<div class="el-breadcrumb__inner is-link" :class="{ 'item-no-icon': !item.meta.icon }" @click="onBreadcrumbClick(item, index)">
						<el-icon v-if="item.meta.icon && globalStore.breadcrumbIcon" class="breadcrumb-icon">
							<pure-icon :name="item.meta.icon" />
						</el-icon>
						<span class="breadcrumb-title" :style="'color:' + colorIcon">{{ item.meta.title }}</span>
					</div>
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
	</div>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
