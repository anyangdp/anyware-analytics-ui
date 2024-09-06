<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import RoleDrawer from '@/views/System/Role/components/RoleDrawer.vue'
import { SYS_ROLE_AUTHOR } from '@/recursos/constantes/author.constant'
import type { RolePageRes } from '@/api/system/interfaces/role.interface'
import { addRole, delRole, editRole, getRolePage } from '@/api/system/role'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import { appActiveDic, roleDataScopeDic } from '@/recursos/dictionaries/app.dictionary'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'

/**
 * @description 初始化请求参数
 */
const initParam = reactive({ orgId: 0 })

/**
 * @description pureTable 实例
 */
const pureTable = ref<PureTableInstance>()

/**
 * @description 表格列配置项
 */
const columns = reactive<ColumnProps<RolePageRes>[]>([
	{ type: 'index', label: '#', width: 40, fixed: 'left' },
	{ prop: 'name', label: '角色名称', search: { el: 'input' } },
	{ prop: 'code', label: '角色编码', search: { el: 'input' } },
	// {prop: "dataScope", label: "数据范围", tag: true, enum: roleDataScope},
	{ prop: 'orderNo', label: '排序', width: 80 },
	{ prop: 'status', label: '状态', width: 100, tag: true, enum: appActiveDic },
	{
		prop: 'createTime',
		label: '修改记录',
		width: 100,
		render: scope => <>{<ModifyRecord data={scope.row} />}</>
	},
	{ prop: 'operation', label: '操作', width: 150, fixed: 'right' }
])

/**
 * @description 删除
 * @param params {UserPageRes} 行数据
 */
const del = async (params: RolePageRes) => {
	await useHandleData(delRole, params.id, `删除【${params.name}】`)
	pureTable.value?.getTableList()
}

/**
 * @description 打开 drawer
 * @param title {string} 名称
 * @param row {UserPageRes} 行数据
 */
const drawerRef = ref<InstanceType<typeof RoleDrawer> | null>(null)
const openDrawer = (
	title: string,
	row: Partial<RolePageRes> = {
		orderNo: 99,
		status: 1
	}
) => {
	const params: DrawerProps<RolePageRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addRole : title === '编辑' ? editRole : undefined,
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
				row-key="id"
				:indent="20"
				:pagination="true"
				:columns="columns"
				:request-api="getRolePage"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 4, lg: 7, xl: 7 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button v-author="SYS_ROLE_AUTHOR.ADD" type="primary" @click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link v-author="SYS_ROLE_AUTHOR.UPDATE" @click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-button type="danger" link v-author="SYS_ROLE_AUTHOR.DELETE" @click="del(scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:trash-can"></pure-icon>
						</template>
						删除
					</el-button>
				</template>
			</PureTable>
			<RoleDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
