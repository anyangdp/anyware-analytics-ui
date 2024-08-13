<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useGlobalStore } from '@/stores/modules/global'
import { useKeepAliveStore } from '@/stores/modules/keepAlive'

const route = useRoute()
const globalStore = useGlobalStore()
const keepAliveStore = useKeepAliveStore()

const colorIcon = computed(() => {
	const layout = globalStore.layout
	if (layout === 'columns') {
		return 'black'
	} else return 'white'
})

/**
 * @description 刷新
 */
const onRefresh = () => {
	setTimeout(() => {
		route.meta.isKeepAlive && keepAliveStore.removeKeepAliveName(route.fullPath as string)
		globalStore.setGlobalState('refresh', true)
		nextTick(() => {
			route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.fullPath as string)
			globalStore.setGlobalState('refresh', false)
		})
	}, 0)
}
</script>

<template>
	<div class="btn">
		<el-tooltip content="刷新">
			<el-button link @click="onRefresh">
				<template #icon>
					<pure-icon name="pi-ep:refresh" :color="colorIcon" :size="16" />
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
