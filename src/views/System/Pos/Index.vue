<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import PureTable from '@/components/PureTable/PureTable.vue'
import PosDrawer from '@/views/System/Pos/components/PosDrawer.vue'
import { appActiveDic } from '@/recursos/dictionaries/app.dictionary'
import { SYS_POS_AUTHOR } from '@/recursos/constantes/author.constant'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { getPosPage, addPos, editPos, delPos } from '@/api/system/pos'
import type { PosPageRes } from '@/api/system/interfaces/pos.interface'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'

// PureTable 实例
const initParam = reactive({})
const pureTable = ref<PureTableInstance>()

// 表格配置项
const columns = reactive<ColumnProps<PosPageRes>[]>([
	{ type: 'index', label: '#', width: 80 },
	{ prop: 'name', label: '职位名称', search: { el: 'input' } },
	{ prop: 'code', label: '职位编号', search: { el: 'input' } },
	{ prop: 'orderNo', label: '排序', width: 130 },
	{ prop: 'status', label: '状态', width: 120, tag: true, enum: appActiveDic },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 130 }
])

// 删除用户信息
const deletePos = async (params: PosPageRes) => {
	await useHandleData(delPos, params.id, `删除【${params.name}】`)
	pureTable.value?.getTableList()
}

// 打开 drawer（新增、修改、查看）
const drawerRef = ref<InstanceType<typeof PosDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<PosPageRes> = { orderNo: 99, status: 1 }) => {
	const params: DrawerProps<PosPageRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addPos : title === '编辑' ? editPos : undefined,
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
				:request-api="getPosPage"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 2, lg: 7, xl: 7 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" v-author="SYS_POS_AUTHOR.ADD" @click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link v-author="SYS_POS_AUTHOR.UPDATE" @click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" link v-author="SYS_POS_AUTHOR.DELETE" @click="deletePos(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<PosDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
