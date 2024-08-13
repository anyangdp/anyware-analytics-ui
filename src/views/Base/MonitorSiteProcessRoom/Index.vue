<script setup lang="tsx">
import { trimEnd } from 'lodash'
import { useHandleData } from '@/hooks/useHandleData'
import { getDictDataList as di } from '@/utils/dict.util'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { appStatusDic, MonitorSiteTypeTypeDic } from '@/recursos/dictionaries/app.dictionary'
import { addRecord, delRecord, editRecord, getRecordPage } from '@/api/base/monitorSiteProcessRoom'
import type { MonitorSiteProcessRoomPageRes } from '@/api/base/interfaces/monitorSiteProcessRoom.interface'
import MonitorSiteProcessRoomDrawer from '@/views/Base/MonitorSiteProcessRoom/components/MonitorSiteProcessRoomDrawer.vue'

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
const columns = reactive<ColumnProps<MonitorSiteProcessRoomPageRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ prop: 'name', label: '工艺间名称', search: { el: 'input' } },
	{ prop: 'monitorSiteType', label: '适用站点类型', enum: MonitorSiteTypeTypeDic },
	{
		prop: 'processRoomFlag',
		label: '工艺间标识',
		render(scope) {
			let retName: string = ''
			di('process_room_flag').forEach(data => {
				if (scope.row.processRoomFlag?.indexOf(data.code) !== -1) {
					retName += data.value + ','
				}
			})

			return trimEnd(retName, ',')
		}
	},
	{ prop: 'sort', label: '排序' },
	{ prop: 'status', label: '状态', width: 140, tag: true, enum: appStatusDic },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 160 }
])

/**
 * @description 删除
 */
const del = async (params: MonitorSiteProcessRoomPageRes) => {
	await useHandleData(delRecord, params.id, `删除`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof MonitorSiteProcessRoomDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<MonitorSiteProcessRoomPageRes> = { sort: 99, status: 1 }) => {
	const params: DrawerProps<MonitorSiteProcessRoomPageRes> = {
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
					<el-button type="primary" v-author="'base:monitorSiteProcessRoom:add'" v-on:click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" v-author="'base:monitorSiteProcessRoom:update'" link v-on:click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" v-author="'base:monitorSiteProcessRoom:delete'" link v-on:click="del(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<MonitorSiteProcessRoomDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
