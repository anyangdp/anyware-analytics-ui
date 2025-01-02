<script setup lang="tsx">

import type { SchedulerDTO } from '@/api/scheduler/jobinfo.interface'
import { schedulerDetail } from '@/api/scheduler/JobInfo'

const detail = ref<SchedulerDTO>()
const init = async() => {
	const scheduler: any =  await schedulerDetail();
	detail.value = scheduler;
	console.log(detail.value)
}

init();
</script>

<template>
	<div style="background-color: var(--el-bg-color); padding: 10px; height: auto;border: 1px solid var(--el-border-color-light)">
			<el-descriptions title="调度器信息" :column="1">
				<el-descriptions-item label="调度器名称:">{{detail?.schedulerName}}</el-descriptions-item>
				<el-descriptions-item label="调度器实例:">{{ detail?.schedulerInstanceId }}</el-descriptions-item>
			</el-descriptions>
	</div>
</template>

<style scoped lang="scss"></style>
