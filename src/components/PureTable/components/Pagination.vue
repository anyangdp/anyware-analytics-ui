<script setup lang="ts">
import type { PaginationProps } from '@/components/PureTable/interfaces/pureTable.interface'

defineProps<PaginationProps>()
</script>

<template>
	<!-- 分页组件 -->
	<el-pagination
		:background="true"
		:size="'small'"
		:current-page="pageable.page"
		:page-size="pageable.pageSize"
		:page-sizes="[10, 25, 50, 100]"
		:total="pageable.total"
		layout="total, sizes, prev, pager, next"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
	></el-pagination>
</template>
