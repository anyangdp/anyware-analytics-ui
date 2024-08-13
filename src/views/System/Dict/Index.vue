<script setup lang="tsx">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

import { useHandleData } from '@/hooks/useHandleData'
import { appStatusDic } from '@/recursos/dictionaries/app.dictionary'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { SYS_DICT_AUTHOR } from '@/recursos/constantes/author.constant'
import type { DictDataPageRes, DictTypePageRes } from '@/api/system/interfaces/dict.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import DictTypeDrawer from '@/views/System/Dict/Components/DictTypeDrawer.vue'
import DictDataDrawer from '@/views/System/Dict/Components/DictDataDrawer.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { addDictData, addDictType, delDictData, delDictType, editDictData, editDictType, getDictDataPage, getDictTypePage } from '@/api/system/dict'

/**
 * @description 初始化请求参数
 */
const initParam = reactive({})

/**
 * @description 初始化请求参数
 */
const initDataParam = reactive({ dictTypeId: 0 })

/**
 * @description PureTable 实例
 */
const pureTable = ref<PureTableInstance>()

/**
 * @description pureTableData 实例
 */
const pureTableData = ref<PureTableInstance>()

/**
 * @description 表格配置项
 */
const columns = reactive<ColumnProps<DictTypePageRes>[]>([
	{ type: 'index', label: '#', width: 80 },
	{ prop: 'name', label: '字典名称', search: { el: 'input' } },
	{ prop: 'code', label: '字典编码' },
	{ prop: 'status', label: '状态', width: 70, tag: true, enum: appStatusDic },
	{ prop: 'orderNo', label: '排序', width: 70 },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 80,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 130 }
])

/**
 * @description 表格配置项
 */
const columnsData = reactive<ColumnProps<DictDataPageRes>[]>([
	{ type: 'index', label: '#', width: 80 },
	{
		prop: 'value',
		label: '字典值',
		render: scope => (
			<>
				{
					<el-tag type={scope.row.tagType} style={scope.row.styleSetting} class={scope.row.classSetting}>
						{scope.row.value}
					</el-tag>
				}
			</>
		)
	},
	{ prop: 'code', label: '编码', search: { el: 'input' } },
	{ prop: 'name', label: '名称' },
	{ prop: 'status', label: '状态', width: 70, tag: true, enum: appStatusDic },
	{ prop: 'orderNo', label: '排序', width: 70 },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 80,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 100 }
])

/**
 * @description 删除
 */
const del = async (params: DictTypePageRes) => {
	await useHandleData(delDictType, params.id, `删除【${params.name}】`)
	pureTable.value?.getTableList()
}

/**
 * @description 删除值
 */
const delData = async (params: DictDataPageRes) => {
	await useHandleData(delDictData, params.id, `删除【${params.name}】`)
	pureTableData.value?.getTableList()
}

/**
 * @description 单击字典类型行
 */
const rowClick = (row: DictTypePageRes, column: TableColumnCtx<DictTypePageRes>) => {
	if (column.property == 'radio' || column.property == 'operation') return

	pureTableData.value!.pageable.page = 1
	initDataParam.dictTypeId = row.id ?? 0
}

/**
 * @description 单击字典类型行
 */
const openDictData = (row: DictTypePageRes) => {
	pureTableData.value!.pageable.page = 1
	initDataParam.dictTypeId = row.id ?? 0
}

/**
 * @description 打开 字典类别 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof DictTypeDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<DictTypePageRes> = { orderNo: 99, status: 1 }) => {
	const params: DrawerProps<DictTypePageRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addDictType : title === '编辑' ? editDictType : undefined,
		getTableList: pureTable.value?.getTableList
	}
	drawerRef.value?.acceptParams(params)
}

/**
 * @description 打开 字典值 drawer（新增、修改、查看）
 */
const drawerDataRef = ref<InstanceType<typeof DictDataDrawer> | null>(null)
const openDataDrawer = (
	title: string,
	row: Partial<DictDataPageRes> = {
		orderNo: 99,
		status: 1,
		dictTypeId: initDataParam.dictTypeId,
		tagType: 'primary'
	}
) => {
	if (initDataParam.dictTypeId === 0) {
		ElMessage.warning('请选择字典')
		return
	}

	const params: DrawerProps<DictDataPageRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addDictData : title === '编辑' ? editDictData : undefined,
		getTableList: pureTableData.value?.getTableList
	}
	drawerDataRef.value?.acceptParams(params)
}
</script>

<template>
	<div class="main-box">
		<el-row :gutter="8" style="width: 100%; height: 100%; flex: 1">
			<el-col :span="12" :xs="24" style="display: flex; height: 100%; flex: 1">
				<div class="table-box">
					<PureTable
						ref="pureTable"
						:columns="columns"
						:request-api="getDictTypePage"
						:init-param="initParam"
						:search-col="{ xs: 1, sm: 1, md: 1, lg: 3, xl: 3 }"
						@row-click="rowClick"
						highlight-current-row
					>
						<!-- 表格 header 按钮 -->
						<template #tableHeader>
							<el-button type="primary" v-author="SYS_DICT_AUTHOR.ADD" @click="openDrawer('新增')">
								<template #icon>
									<pure-icon name="pi-carbon:add"></pure-icon>
								</template>
								新增
							</el-button>
						</template>
						<!-- 表格操作 -->
						<template #operation="scope">
							<el-tooltip content="字典值">
								<el-button type="primary" size="small" text @click="openDictData(scope.row)" style="margin-left: 0 !important">
									<template #icon>
										<pure-icon name="pi-carbon:catalog"></pure-icon>
									</template>
								</el-button>
							</el-tooltip>
							<el-tooltip content="编辑">
								<el-button type="primary" size="small" text v-author="SYS_DICT_AUTHOR.UPDATE" @click="openDrawer('编辑', scope.row)">
									<template #icon>
										<pure-icon name="pi-carbon:edit"></pure-icon>
									</template>
								</el-button>
							</el-tooltip>
							<el-tooltip content="删除">
								<el-button type="danger" size="small" text v-author="SYS_DICT_AUTHOR.DELETE" @click="del(scope.row)">
									<template #icon>
										<pure-icon name="pi-carbon:trash-can"></pure-icon>
									</template>
								</el-button>
							</el-tooltip>
						</template>
					</PureTable>
					<DictTypeDrawer ref="drawerRef" />
				</div>
			</el-col>
			<el-col :span="12" :xs="24" style="display: flex; height: 100%; flex: 1">
				<div class="table-box">
					<PureTable
						ref="pureTableData"
						:columns="columnsData"
						:request-api="getDictDataPage"
						:init-param="initDataParam"
						:search-col="{ xs: 1, sm: 1, md: 1, lg: 3, xl: 3 }"
					>
						<!-- 表格 header 按钮 -->
						<template #tableHeader>
							<el-button type="primary" v-author="SYS_DICT_AUTHOR.ADD" @click="openDataDrawer('新增')">
								<template #icon>
									<pure-icon name="pi-carbon:add"></pure-icon>
								</template>
								新增
							</el-button>
						</template>
						<!-- 表格操作 -->
						<template #operation="scope">
							<el-tooltip content="编辑">
								<el-button
									type="primary"
									size="small"
									text
									v-author="SYS_DICT_AUTHOR.UPDATE"
									@click="openDataDrawer('编辑', scope.row)"
									style="margin-left: 0 !important"
								>
									<template #icon>
										<pure-icon name="pi-carbon:edit"></pure-icon>
									</template>
								</el-button>
							</el-tooltip>
							<el-tooltip content="删除">
								<el-button type="danger" size="small" text v-author="SYS_DICT_AUTHOR.DELETE" @click="delData(scope.row)">
									<template #icon>
										<pure-icon name="pi-carbon:trash-can"></pure-icon>
									</template>
								</el-button>
							</el-tooltip>
						</template>
					</PureTable>
					<DictTypeDrawer ref="drawerRef" />
					<DictDataDrawer ref="drawerDataRef" />
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<style scoped lang="scss"></style>
