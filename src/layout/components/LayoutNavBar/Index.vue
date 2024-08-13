<script setup lang="ts">
import User from './User/Index.vue'
import Refresh from './Refresh/Index.vue'
import Settings from './Settings/Index.vue'
import ScreenFull from './ScreenFull/Index.vue'
import Breadcrumb from './Breadcrumb/Index.vue'
import { useGlobalStore } from '@/stores/modules/global'

const props = defineProps({
	headerMenu: {
		default: () => false
	}
})
const globalStore = useGlobalStore()
const isCollapse = computed(() => globalStore.isCollapse)
const isBreadcrumb = computed(() => globalStore.breadcrumb)
const colorIcon = computed(() => {
	const layout = globalStore.layout
	if (layout === 'columns') {
		return 'black'
	} else return 'white'
})
const handleCollapse = () => globalStore.setGlobalState('isCollapse', !globalStore.isCollapse)
</script>

<template>
	<div
		class="nav-bar-container"
		:style="colorIcon === 'white' ? '' : 'border-bottom:1px solid var(--pure-header-border-color)'"
		:class="props.headerMenu ? 'menu-container' : 'header-container'"
	>
		<div class="left-panel" v-if="!props.headerMenu">
			<el-icon class="fold-unfold" @click="handleCollapse">
				<pure-icon name="pi-ep:fold" v-if="!isCollapse" style="cursor: pointer" :size="17" :color="colorIcon"></pure-icon>
				<pure-icon name="pi-ep:expand" v-if="isCollapse" style="cursor: pointer" :size="17" :color="colorIcon"></pure-icon>
			</el-icon>
			<Breadcrumb v-if="isBreadcrumb" />
		</div>
		<div class="right-panel">
			<Refresh />
			<ScreenFull />
			<Settings />
			<User />
		</div>
	</div>
</template>

<style scoped lang="scss">
.nav-bar-container {
	display: flex;
	height: var(--pure-nav-bar-height);
	padding-right: var(--pure-base-padding);
	padding-left: var(--pure-base-padding);
	overflow: hidden;
	user-select: none;

	.left-panel {
		display: flex;
		align-items: center;
		justify-items: center;
		height: var(--pure-nav-bar-height);
		margin-left: 10px;
	}

	.right-panel {
		flex: 1;
		display: flex;
		align-content: center;
		align-items: center;
		justify-content: flex-end;
		height: var(--pure-nav-bar-height);
	}
}

.header-container {
	width: 100% !important;
	background: var(--pure-color-white);
}

.menu-container {
	:deep(.user-name) {
		color: var(--pure-header-logo-text-color-white);
	}
	:deep(.avatar-dropdown .el-icon) {
		color: var(--pure-header-logo-text-color-white);
	}
}
</style>
