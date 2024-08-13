<script setup lang="ts">
import mittBus from '@/plugins/mitt'
import { useGlobalStore } from '@/stores/modules/global'

const globalStore = useGlobalStore()
const colorIcon = computed(() => {
	const layout = globalStore.layout
	if (layout === 'columns') {
		return 'black'
	} else return 'white'
})

/**
 * @description 打开全局设置抽屉
 */
const openDrawer = () => {
	mittBus.emit('openThemeDrawer')
}
</script>

<template>
	<div class="btn">
		<el-tooltip content="设置">
			<el-button link @click="openDrawer">
				<template #icon>
					<pure-icon name="pi-ep:setting" :color="colorIcon" :size="16" />
				</template>
			</el-button>
		</el-tooltip>
	</div>
</template>

<style scoped lang="scss">
.btn {
	margin-right: 20px;
	cursor: pointer;
	transition: all 0.3s;
}

.el-button:not(.is-circle) i.el-icon {
	font-size: 16px !important;
}
</style>
