<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import { appStatusDic } from '@/recursos/dictionaries/app.dictionary'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import { BASE_ASSESSMENT_ITEM_AUTHOR } from '@/recursos/constantes/author.constant'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { addRecord, delRecord, editRecord, getRecordPage } from '@/api/base/assessmentItem'
import type { AssessmentItemPageRes } from '@/api/base/interfaces/assessmentItem.interface'
import AssessmentItemDrawer from '@/views/Base/AssessmentItem/components/AssessmentItemDrawer.vue'

/**
 * @description 初始化请求参数
 */
const initParam = reactive({})

/**
 * @description PureTable 实例
 */
const pureTable = ref<PureTableInstance>()

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<AssessmentItemPageRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ prop: 'name', label: '考核项目名称', search: { el: 'input' } },
	{ prop: 'assessmentDescription', label: '考核描述' },
	{ prop: 'fullScore', label: '分值' },
	{ prop: 'sort', label: '排序' },
	{ prop: 'status', label: '状态', tag: true, enum: appStatusDic },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作' }
])

/**
 * @description 删除
 */
const del = async (params: AssessmentItemPageRes) => {
	await useHandleData(delRecord, params.id, `删除`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof AssessmentItemDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<AssessmentItemPageRes> = { sort: 99, status: 1 }) => {
	const params: DrawerProps<AssessmentItemPageRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addRecord : title === '编辑' ? editRecord : undefined,
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
				:request-api="getRecordPage"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 2, lg: 7, xl: 7 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" v-author="BASE_ASSESSMENT_ITEM_AUTHOR.ADD" @click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link v-author="BASE_ASSESSMENT_ITEM_AUTHOR.UPDATE" @click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" link v-author="BASE_ASSESSMENT_ITEM_AUTHOR.DELETE" @click="del(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<AssessmentItemDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
