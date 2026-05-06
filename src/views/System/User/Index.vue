<script setup lang="tsx">
import { useHandleData } from '@/hooks/useHandleData'
import PureTable from '@/components/PureTable/PureTable.vue'
import UserDrawer from '@/views/System/User/components/UserDrawer.vue'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { UserDTO } from '@/api/system/interfaces/user.interface'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { createUser, deleteUser, updateUser, getUserPage, resetPassword, activeUser, deActiveUser } from '@/api/system/user'

const pureTable = ref<PureTableInstance>()

const columns = reactive<ColumnProps<UserDTO>[]>([
	{ type: 'index', label: '#', width: 60 },
	{
		prop: 'avatar',
		label: '头像',
		width: 100,
		render: scope => (
			<>
				<el-avatar src={scope.row.avatar} size='small'>
					{scope.row.nickname?.slice(0, 1) ?? scope.row.username?.slice(0, 1)}
				</el-avatar>
			</>
		)
	},
	{ prop: 'username', label: '用户名', search: { el: 'input' } },
	{ prop: 'nickname', label: '昵称', search: { el: 'input' } },
	{
		prop: 'active',
		label: '状态',
		width: 100,
		render: scope => (
			<>
				<el-switch
					model-value={scope.row.active}
					active-value={true}
					inactive-value={false}
					onClick={() => changeStatus(scope.row)}
				/>
			</>
		)
	},
	{ prop: 'createdAt', label: '创建时间' },
	{ prop: 'operation', label: '操作', width: 180, fixed: 'right' }
])

const del = async (params: UserDTO) => {
	await useHandleData(deleteUser, params.id!, `删除【${params.nickname}】`)
	pureTable.value?.getTableList()
}

const resetUserPwd = async (params: UserDTO) => {
	await useHandleData(resetPassword, { id: params.id!, newPassword: '123456' }, `重置【${params.nickname}】密码`)
	pureTable.value?.getTableList()
}

const changeStatus = async (row: UserDTO) => {
	if (row.active) {
		await deActiveUser(row.id!)
		row.active = false
	} else {
		await activeUser(row.id!)
		row.active = true
	}
	ElMessage.success('状态设置成功')
}

const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null)
const openDrawer = (
	title: string,
	row: Partial<UserDTO> = {}
) => {
	const params: DrawerProps<UserDTO> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? createUser : title === '编辑' ? updateUser : undefined,
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
				:pagination="true"
				:columns="columns"
				:request-api="getUserPage"
				:search-col="{ xs: 1, sm: 1, md: 4, lg: 7, xl: 7 }"
			>
				<template #tableHeader>
					<el-button type="primary" @click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<template #operation="scope">
					<el-button type="primary" link @click="openDrawer('编辑', scope.row)">
						<template #icon>
							<pure-icon name="pi-carbon:edit"></pure-icon>
						</template>
						编辑
					</el-button>
					<el-dropdown>
						<el-button size="small" text type="primary">
							<template #icon>
								<pure-icon name="pi-carbon:overflow-menu-vertical"></pure-icon>
							</template>
						</el-button>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="resetUserPwd(scope.row)">
									<pure-icon name="pi-carbon:reset"></pure-icon>
									重置密码
								</el-dropdown-item>
								<el-dropdown-item @click="del(scope.row)" divided>
									<pure-icon name="pi-carbon:trash-can"></pure-icon>
									删除账号
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</template>
			</PureTable>
			<UserDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.main-box {
	width: 100%;
	height: 100%;
}

.table-box {
	width: 100%;
}
</style>