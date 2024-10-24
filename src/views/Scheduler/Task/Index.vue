<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import PureTable from '@/components/PureTable/PureTable.vue'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import type { SchedulerJobInfoDTO } from '@/api/scheduler/jobinfo.interface'
import {
	addJobInfoDetails,
	delJobInfoDetails,
	editJobInfoDetails,
	getJobInfoPage, pauseJobInfoDetails, resumeJobInfoDetails
} from '@/api/scheduler/JobInfo'
import JobInfoDetailDrawer from '@/views/Scheduler/Task/component/JobInfoDetailDrawer.vue'
import { JOB_TYPE } from '@/recursos/constantes/scheduler.constant'
import { appActiveDic } from '@/recursos/dictionaries/app.dictionary'

// PureTable 实例
const initParam = reactive({})
const pureTable = ref<PureTableInstance>()

// 表格配置项
const columns = reactive<ColumnProps<SchedulerJobInfoDTO>[]>([
	{ type: 'index', label: '序号', width: 80 },
	{ prop: 'name', label: '任务名称' ,search: { el: 'input' }},
	{ prop: 'groupName', label: '任务组' },
	{ prop: 'type', label: '类型', enum: JOB_TYPE },
	{ prop: 'cron', label: '时间表达式' },
	{ prop: 'className', label: '执行类' },
	{ prop: 'active', label: '状态', width: 120, tag: true, enum: appActiveDic, search: { el: 'select-v2' }  },
	{
		prop: 'jobData',
		label: '高级配置',
		width: 100,
		render: scope => (
			<>
				{
					JSON.stringify(scope.row.jobData)
				}
			</>
		)
	},
	{ prop: 'description', label: '任务说明', width: 150 },
	{ prop: 'operation', label: '操作', width: 200, fixed: 'right' }
])

// 删除任务
const deleteTask = async (params: SchedulerJobInfoDTO) => {
	await useHandleData(delJobInfoDetails, params.id, `删除【${params.description}】`)
	pureTable.value?.getTableList()
}

// 暂停任务
const pauseTask = async (params: SchedulerJobInfoDTO) => {
	await useHandleData(pauseJobInfoDetails, params.id, `暂停【${params.description}】`)
	pureTable.value?.getTableList()
}

// 恢复任务
const resumeTask = async (params: SchedulerJobInfoDTO) => {
	await useHandleData(resumeJobInfoDetails, params.id, `恢复【${params.description}】`)
	pureTable.value?.getTableList()
}

// 打开 drawer（新增、修改、查看）
const drawerRef = ref<InstanceType<typeof JobInfoDetailDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<SchedulerJobInfoDTO> = { }) => {
	const params: DrawerProps<SchedulerJobInfoDTO> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addJobInfoDetails : title === '编辑' ? editJobInfoDetails : undefined,
		getTableList: pureTable.value?.getTableList
	}
	drawerRef.value?.acceptParams(params)
}
</script>

<template>
	<div class="main-box">
		<div class="table-box">
			<PureTable
				ref="pureTable"
				:columns="columns"
				:request-api="getJobInfoPage"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 2, lg: 6, xl: 6 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" @click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link @click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button v-if="scope.row.active" type="primary" link @click="pauseTask(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:pause-future"></pure-icon>
						</template>
						暂停
					</el-button>
					<el-button v-else type="primary" link @click="resumeTask(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:play-outline"></pure-icon>
						</template>
						恢复
					</el-button>
					<el-button type="danger" link @click="deleteTask(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<JobInfoDetailDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
