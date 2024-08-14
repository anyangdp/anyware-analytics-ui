<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import { appStatusDic } from '@/recursos/dictionaries/app.dictionary'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { addRecord, delRecord, editRecord, getRecordPage } from '@/api/base/emissionIndicators'
import EmissionIndicatorsDrawer from '@/views/Base/EmissionIndicators/components/EmissionIndicatorsDrawer.vue'
import type { EmissionIndicatorsPageRes, EmissionMethodListRes } from '@/api/base/interfaces/emissionIndicators.interface'

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
const columns = reactive<ColumnProps<EmissionIndicatorsPageRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ type: 'expand', label: '检测方式', width: 100 },
	{ prop: 'name', label: '指标名称', search: { el: 'input' } },
	{ prop: 'unit', label: '单位' },
	{ prop: 'status', label: '状态', width: 140, tag: true, enum: appStatusDic },
	{ prop: 'sort', label: '排序', width: 140 },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 160 }
])

/**
 * @description 检测方式表格配置项
 */
const methodColumns = reactive<ColumnProps<EmissionMethodListRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ prop: 'testMethod', label: '检测方法' },
	{ prop: 'standardSources', label: '标准来源' }
])

/**
 * @description 删除
 */
const del = async (params: EmissionIndicatorsPageRes) => {
	await useHandleData(delRecord, params.id, `删除`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof EmissionIndicatorsDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<EmissionIndicatorsPageRes> = { sort: 99, status: 1 }) => {
	const params: DrawerProps<EmissionIndicatorsPageRes> = {
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
					<el-button type="primary" v-author="'base:emissionIndicators:add'" v-on:click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- Expand -->
				<template #expand="scope">
					<div class="p-20">
						<PureTable :toolButton="false" :pagination="false" :columns="methodColumns" :data="scope.row.emissionMethodList"></PureTable>
					</div>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" v-author="'base:emissionIndicators:update'" link v-on:click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" v-author="'base:emissionIndicators:delete'" link v-on:click="del(scope.row)" style="margin-left: 5px">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<EmissionIndicatorsDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
