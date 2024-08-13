<script setup lang="ts">
import Grid from '@/components/PureGrid/PureGrid.vue'
import GridItem from '@/components/PureGrid/components/GridItem.vue'
import type { BreakPoint } from '@/components/PureGrid/types/pureGrid.type'
import SearchFormItem from '@/components/PureSearch/components/PureSearchItem.vue'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import type { SearchFormProps } from '@/components/PureSearch/interfaces/pureSearch.interface'
import { useIcon } from '@/hooks/useIcon'

/**
 * @description 定义页面图标
 */
const searchIcon = useIcon({ name: 'pi-carbon:search' })
const resetIcon = useIcon({ name: 'pi-carbon:reset' })

/**
 * @description 默认值
 */
const formProps = withDefaults(defineProps<SearchFormProps>(), {
	columns: () => [],
	searchParam: () => ({})
})

/**
 * @description 获取响应式设置
 */
const getResponsive = (item: ColumnProps) => {
	return {
		span: item.search?.span,
		offset: item.search?.offset ?? 0,
		xs: item.search?.xs,
		sm: item.search?.sm,
		md: item.search?.md,
		lg: item.search?.lg,
		xl: item.search?.xl
	}
}

/**
 * @description 是否默认折叠搜索项
 */
const collapsed = ref(true)

/**
 * @description 获取响应式断点
 */
const gridRef = ref()
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint)

/**
 * @description 判断是否显示 展开/合并 按钮
 */
const showCollapse = computed(() => {
	let show = false
	formProps.columns.reduce((prev, current) => {
		prev +=
			(current.search![breakPoint.value]?.span ?? current.search?.span ?? 1) +
			(current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0)
		if (typeof formProps.searchCol !== 'number') {
			if (prev >= formProps.searchCol[breakPoint.value]) show = true
		} else {
			if (prev >= formProps.searchCol) show = true
		}
		return prev
	}, 0)
	return show
})
</script>

<template>
	<div v-if="columns.length" class="card table-search" style="margin-bottom: 7px">
		<el-form ref="formRef" :model="searchParam">
			<Grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
				<GridItem v-for="(item, index) in columns" :key="item.prop" v-bind="getResponsive(item)" :index="index">
					<el-form-item>
						<template #label>
							<el-space :size="4">
								<span>{{ `${item.search?.label ?? item.label}` }}</span>
								<el-tooltip v-if="item.search?.tooltip" effect="dark" :content="item.search?.tooltip" placement="top">
									<pure-icon name="pi-ep:warning"></pure-icon>
								</el-tooltip>
							</el-space>
							<span>&nbsp;:</span>
						</template>
						<SearchFormItem :column="item" :search-param="searchParam" />
					</el-form-item>
				</GridItem>
				<GridItem>
					<div class="operation">
						<el-button type="primary" :icon="searchIcon" @click="search"> 查询 </el-button>
						<el-button @click="reset" :icon="resetIcon"> 重置 </el-button>
						<el-button v-if="showCollapse" type="primary" link class="search-isOpen" @click="collapsed = !collapsed">
							{{ collapsed ? '展开' : '合并' }}
							<el-icon class="el-icon--right">
								<pure-icon v-if="collapsed" name="pi-ep:arrow-down" />
								<pure-icon v-else name="pi-ep:arrow-up" />
							</el-icon>
						</el-button>
					</div>
				</GridItem>
			</Grid>
		</el-form>
	</div>
</template>
