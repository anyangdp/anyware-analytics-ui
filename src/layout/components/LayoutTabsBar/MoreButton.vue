<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { useTabsStore } from '@/stores/modules/tabs'
import { HOME_URL } from '@/recursos/constantes/app.constant'

// 初始化对象
const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()

// 关闭当前页
const closeCurrentTab = () => {
	if (route.meta.isAffix) return
	tabsStore.removeTabs(route.fullPath)
}

// 关闭所有
const closeAllTab = () => {
	tabsStore.closeMultipleTab()
	router.push(HOME_URL)
}
</script>

<template>
	<el-dropdown trigger="click" :teleported="false">
		<div class="more-button">
			<pure-icon name="pi-ant-design:ellipsis-outlined" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="closeCurrentTab">
					<pure-icon name="pi-ant-design:close-circle-outlined" />
					关闭当前
				</el-dropdown-item>
				<el-dropdown-item @click="tabsStore.closeTabsOnSide(route.fullPath, 'left')">
					<pure-icon name="pi-ant-design:vertical-right-outlined" />
					关闭左侧
				</el-dropdown-item>
				<el-dropdown-item @click="tabsStore.closeTabsOnSide(route.fullPath, 'right')">
					<pure-icon name="pi-ant-design:vertical-left-outlined" />
					关闭右侧
				</el-dropdown-item>
				<el-dropdown-item divided @click="tabsStore.closeMultipleTab(route.fullPath)">
					<pure-icon name="pi-ant-design:enter-outlined" />
					关闭其它
				</el-dropdown-item>
				<el-dropdown-item @click="closeAllTab">
					<pure-icon name="pi-ant-design:close-square-outlined" />
					关闭所有
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<style scoped lang="scss">
.el-dropdown {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;

	.more-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 43px;
		cursor: pointer;
		border-left: 1px solid var(--el-border-color-light);
		transition: all 0.3s;

		&:hover {
			background-color: var(--el-color-info-light-9);
		}

		.iconfont {
			font-size: 12.5px;
		}
	}
}
</style>
