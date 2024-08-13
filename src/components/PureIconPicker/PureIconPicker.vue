<script setup lang="ts">
import { nextTick } from 'vue'
import { computed, type CSSProperties, ref, unref, watch } from 'vue'
import { ElInput, ElPopover, ElScrollbar, ElTabs, ElTabPane, ElPagination } from 'element-plus'

import tIcons from '@/plugins/unocss/icons/icons.td'
import epIcons from '@/plugins/unocss/icons/icons.ep'
import cIocns from '@/plugins/unocss/icons/icons.carbon'
import antIcons from '@/plugins/unocss/icons/icons.antd'
import customIcons from '@/plugins/unocss/icons/icons.custom'

/**
 * @description 定义接收默认图标名称
 */
const modelValue = defineModel<string>()

/**
 * @description 定义图标集合
 */
const icons = [epIcons, antIcons, tIcons, cIocns, customIcons]

/**
 * @description 定义搜索关键字
 */
const search = ref('')

/**
 * @description 定义当前一页数量
 */
const pageSize = ref(49)

/**
 * @description 定义当前页码
 */
const currentPage = ref(1)

/**
 * @description 默认 icon 前缀
 */
const iconName = ref(icons[0].prefix)

/**
 * @description 初始化 icon
 */
const init = async (icon?: string) => {
	if (!icon) return
	let iconInfo: string[] = []
	if (icon.indexOf(':') === -1) iconInfo = icon.split('-')
	else iconInfo = icon.split(':')
	iconName.value = iconInfo[0]
	const wrapIndex = icons.findIndex(item => item.prefix === iconInfo[0])
	// 查询当前 icon 的索引
	const index = filterItemIcons(icons[wrapIndex].icons).findIndex(item => item === icon)
	// 计算当前 icon 的页码
	await nextTick()
	currentPage.value = Math.ceil((index + 1) / unref(pageSize))
}

/**
 * @description 初始化 icon 样式
 */
const iconWrapStyle = computed((): CSSProperties => {
	return {
		width: '24px',
		height: '24px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow: '0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset',
		position: 'relative',
		left: '-1px',
		cursor: 'pointer'
	}
})

/**
 * @description 默认 icon 名称对应集合
 */
const currentIconNameIndex = computed(() => {
	return icons.findIndex(item => item.prefix === unref(iconName))
})

/**
 * @description tab 切换方法
 */
const tabChange = () => {
	currentPage.value = 1
}

/**
 * @description 过滤 icon
 */
const filterIcons = (icons: string[]) => {
	const start = (unref(currentPage) - 1) * unref(pageSize)
	const end = unref(currentPage) * unref(pageSize)
	return icons.slice(start, end)
}

/**
 * @description 监测默认选中 icon
 */
watch(
	() => modelValue.value,
	async val => {
		await nextTick()
		val && init(val)
	},
	{
		immediate: true
	}
)

/**
 * @description 显示弹框选择
 */
const popoverShow = () => {
	init(unref(modelValue))
}

/**
 * @description 选中 icon
 */
const iconSelect = (icon: string) => {
	// 如果是同一个icon则不做处理，则相当于点击了清空按钮
	if (icon === unref(modelValue)) {
		modelValue.value = ''
		return
	}
	modelValue.value = icon
}

/**
 * @description 匹配 icon
 */
const filterItemIcons = (icons: string[]) => {
	return icons.filter(item => item.includes(unref(search)))
}

/**
 * @description 清空 input 框
 */
const inputClear = () => {
	init(unref(modelValue))
}
</script>

<template>
	<div class="flex justify-center items-center box flex-auto">
		<ElInput disabled v-model="modelValue" clearable />
		<ElPopover
			placement="bottom"
			trigger="click"
			:width="450"
			popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; height: 380px;"
			@show="popoverShow"
		>
			<template #reference>
				<div :style="iconWrapStyle">
					<pure-icon v-if="modelValue" :name="modelValue" />
				</div>
			</template>
			<ElScrollbar class="h-[calc(100%-50px)]!">
				<ElInput v-model="search" class="mb-20px" clearable placeholder="搜索图标" @clear="inputClear" />
				<ElTabs tab-position="left" v-model="iconName" @tab-change="tabChange">
					<ElTabPane v-for="item in icons" :key="item.name" :label="item.name" :name="item.prefix">
						<div class="flex flex-wrap box-border">
							<div
								v-for="icon in filterIcons(filterItemIcons(item.icons))"
								:key="icon"
								:style="{
									width: '30px',
									height: '30px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									cursor: 'pointer',
									border: `1px solid ${icon === modelValue ? 'var(--el-color-primary)' : 'var(--el-border-color)'}`,
									boxSizing: 'border-box',
									margin: '2px',
									transition: 'all 0.3s'
								}"
								class="hover:border-color-[var(--el-color-primary)]!"
								@click="iconSelect(icon)"
							>
								<pure-icon :name="icon" :color="icon === modelValue ? 'var(--el-color-primary)' : 'inherit'" />
							</div>
						</div>
					</ElTabPane>
				</ElTabs>
			</ElScrollbar>
			<div class="h-50px absolute bottom-0 left-0 flex items-center pl-[var(--el-popover-padding)] pr-[var(--el-popover-padding)]">
				<ElPagination
					v-model:current-page="currentPage"
					v-model:page-size="pageSize"
					:pager-count="5"
					size="small"
					:page-sizes="[100, 200, 300, 400]"
					layout="total, prev, pager, next, jumper"
					:total="filterItemIcons(icons[currentIconNameIndex].icons).length"
				/>
			</div>
		</ElPopover>
	</div>
</template>

<style scoped lang="scss"></style>
