<script setup lang="tsx">
import { ref, reactive } from 'vue'
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
	const newPassword = ref('')
	const validatePassword = (pwd: string): { valid: boolean; message: string } => {
		if (!pwd) {
			return { valid: false, message: '请输入新密码' }
		}
		if (pwd.length < 8) {
			return { valid: false, message: '新密码至少8位' }
		}
		const hasUpper = /[A-Z]/.test(pwd)
		const hasLower = /[a-z]/.test(pwd)
		const hasNumber = /\d/.test(pwd)
		const hasSpecial = /[@$!%*?&]/.test(pwd)
		const typesCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length
		if (typesCount < 3) {
			return { valid: false, message: '新密码需包含大小写字母、数字、特殊符号中的三种以上' }
		}
		return { valid: true, message: '' }
	}
	const inputDialog = await ElMessageBox({
		title: `重置【${params.nickname}】密码`,
		message: `
			<div style="padding: 10px;">
				<label style="display: block; margin-bottom: 8px; font-weight: 500;">新密码</label>
				<input 
					id="reset-pwd-input"
					type="password" 
					placeholder="请输入新密码" 
					style="width: 100%; padding: 8px; border: 1px solid #dcdfe6; border-radius: 4px; box-sizing: border-box;"
				/>
				<p style="margin-top: 8px; font-size: 12px; color: #909399;">
					密码规则：至少8位，包含大小写字母、数字、特殊符号中的三种以上
				</p>
			</div>
		`,
		showCancelButton: true,
		confirmButtonText: '确认重置',
		cancelButtonText: '取消',
		dangerouslyUseHTMLString: true,
		beforeClose: async (action, instance, done) => {
			if (action === 'confirm') {
				const input = document.getElementById('reset-pwd-input') as HTMLInputElement
				if (input) {
					newPassword.value = input.value
					const result = validatePassword(newPassword.value)
					if (!result.valid) {
						ElMessage.error(result.message)
						done(false)
						return
					}
				}
			}
			done()
		}
	}).catch(() => {})
	if (inputDialog === 'confirm') {
		await useHandleData(resetPassword, { id: params.id!, newPassword: newPassword.value }, `重置【${params.nickname}】密码`)
		pureTable.value?.getTableList()
	}
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