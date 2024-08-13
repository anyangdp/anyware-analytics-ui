<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { appStatusDic, MonitorSiteTypeTypeDic } from '@/recursos/dictionaries/app.dictionary'
import { addRecord, delRecord, editRecord, getRecordPage } from '@/api/base/emissionTemplate'
import EmissionTemplateDrawer from '@/views/Base/EmissionTemplate/components/EmissionTemplateDrawer.vue'
import type { EmissionTemplateDetailRes, EmissionTemplatePageRes } from '@/api/base/interfaces/emissionTemplate.interface'

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
const columns = reactive<ColumnProps<EmissionTemplatePageRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ type: 'expand', label: '指标列表', width: 100 },
	{ prop: 'name', label: '模板名称', search: { el: 'input' } },
	{ prop: 'busType', label: '业务类型', enum: MonitorSiteTypeTypeDic, tag: true },
	{ prop: 'status', label: '状态', tag: true, enum: appStatusDic },
	{ prop: 'sort', label: '排序' },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 160 }
])

/**
 * @description 表格配置项
 */
const emissionColumns = reactive<ColumnProps<EmissionTemplateDetailRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ prop: 'emissionIndicatorsName', label: '指标名称' },
	{ prop: 'emissionIndicatorsUnit', label: '指标单位' },
	{
		prop: 'upperConcentration',
		label: '超标上限值'
	},
	{
		prop: 'lowerConcentration',
		label: '超标下限值'
	},
	{
		prop: 'decimalDigit',
		label: '小数位数'
	}
])

/**
 * @description 删除
 */
const del = async (params: EmissionTemplatePageRes) => {
	await useHandleData(delRecord, params.id, `删除`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof EmissionTemplateDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<EmissionTemplatePageRes> = { sort: 99, status: 1, emissionDetailList: [] }) => {
	const params: DrawerProps<EmissionTemplatePageRes> = {
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
					<el-button type="primary" v-author="'base:emissionTemplate:add'" v-on:click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- Expand -->
				<template #expand="scope">
					<div class="p-20">
						<PureTable :toolButton="false" :pagination="false" :columns="emissionColumns" :data="scope.row.emissionDetailList"></PureTable>
					</div>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" v-author="'base:emissionTemplate:update'" link v-on:click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" v-author="'base:emissionTemplate:delete'" link v-on:click="del(scope.row)" style="margin-left: 5px">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<EmissionTemplateDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
