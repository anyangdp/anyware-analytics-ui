<script setup lang="tsx">
import {
	AppReleaseRecordAppTypeDic,
	AppReleaseRecordUpdateTypeDic,
	AppReleaseRecordVersionTypeDic,
	appStatusDic
} from '@/recursos/dictionaries/app.dictionary'
import { useHandleData } from '@/hooks/useHandleData'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import { BASE_APP_RELEASE_RECORD_AUTHOR } from '@/recursos/constantes/author.constant'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import type { AppReleaseRecordPageRes } from '@/api/base/interfaces/appReleaseRecord.interface'
import { addRecord, delRecord, editRecord, getAppReleaseRecordPage } from '@/api/base/appReleaseRecord'
import AppReleaseRecordDrawer from '@/views/Base/AppReleaseRecord/components/AppReleaseRecordDrawer.vue'

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
const columns = reactive<ColumnProps<AppReleaseRecordPageRes>[]>([
	{ type: 'index', label: '#', width: 50 },
	{ prop: 'appType', label: 'App类型', search: { el: 'select-v2' }, enum: AppReleaseRecordAppTypeDic },
	{ prop: 'versionCode', label: '版本号' },
	{ prop: 'updateType', label: '更新类型', enum: AppReleaseRecordUpdateTypeDic },
	{ prop: 'downloadUrl', label: '下载地址', width: 230 },
	{ prop: 'updateMessage', label: '更新内容', width: 230 },
	{ prop: 'versionStatus', label: '版本状态', width: 90, enum: AppReleaseRecordVersionTypeDic },
	{ prop: 'publishTime', label: '发布时间', width: 150 },
	{ prop: 'sort', label: '排序', width: 90 },
	{ prop: 'status', label: '状态', width: 70, tag: true, enum: appStatusDic },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 130 }
])

/**
 * @description 删除
 */
const del = async (params: AppReleaseRecordPageRes) => {
	await useHandleData(delRecord, params.id, `删除`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer（新增、修改、查看）
 */
const drawerRef = ref<InstanceType<typeof AppReleaseRecordDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<AppReleaseRecordPageRes> = { sort: 99, status: 1 }) => {
	const params: DrawerProps<AppReleaseRecordPageRes> = {
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
				:request-api="getAppReleaseRecordPage"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 2, lg: 7, xl: 7 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" v-author="BASE_APP_RELEASE_RECORD_AUTHOR.ADD" @click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link v-author="BASE_APP_RELEASE_RECORD_AUTHOR.UPDATE" @click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" link v-author="BASE_APP_RELEASE_RECORD_AUTHOR.DELETE" @click="del(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<AppReleaseRecordDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
