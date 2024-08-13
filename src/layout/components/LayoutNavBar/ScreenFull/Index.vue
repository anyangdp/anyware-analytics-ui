<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { useGlobalStore } from '@/stores/modules/global'

const globalStore = useGlobalStore()
const { toggle, isFullscreen } = useFullscreen()

const colorIcon = computed(() => {
	const layout = globalStore.layout
	if (layout === 'columns') {
		return 'black'
	} else return 'white'
})
</script>

<template>
	<div class="btn">
		<el-tooltip effect="dark" :content="!isFullscreen ? '全屏' : '收起'" placement="bottom">
			<el-button link @click="toggle">
				<template #icon>
					<pure-icon v-if="!isFullscreen" name="pi-tdesign:fullscreen-1" :color="colorIcon" :size="16" />
					<pure-icon v-else name="pi-tdesign:fullscreen-exit-1" :color="colorIcon" :size="16" />
				</template>
			</el-button>
		</el-tooltip>
	</div>
</template>

<style scoped lang="scss">
.btn {
	padding-right: 20px;
	cursor: pointer;
	transition: all 0.3s;
}

.el-button:not(.is-circle) i.el-icon {
	font-size: 16px !important;
}
</style>
