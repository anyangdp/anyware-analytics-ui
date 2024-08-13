<script setup lang="tsx">
import { getOrgTreeList } from '@/api/system/org'
import { useHandleData } from '@/hooks/useHandleData'
import PureTable from '@/components/PureTable/PureTable.vue'
import UserDrawer from '@/views/System/User/components/UserDrawer.vue'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { SYS_USER_AUTHOR } from '@/recursos/constantes/author.constant'
import type { UserPageRes } from '@/api/system/interfaces/user.interface'
import { userAccountTypeDic } from '@/recursos/dictionaries/app.dictionary'
import ModifyRecord from '@/components/PureTable/components/ModifyRecord.vue'
import type { PureTableInstance } from '@/components/PureTable/types/pureTable.type'
import type { ColumnProps } from '@/components/PureTable/interfaces/pureTable.interface'
import { addUser, delUser, editUser, getUserPage, resetPwd, setStatus } from '@/api/system/user'

/**
 * @description 初始化加载
 */
onMounted(() => {
	getTreeFilter()
})

/**
 * treeFilter 数据
 */
const treeFilterData = ref<any>([])

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
const columns = reactive<ColumnProps<UserPageRes>[]>([
	{ type: 'index', label: '#', width: 40, fixed: 'left' },
	{
		prop: 'avatar',
		label: '头像',
		width: 80,
		render: scope => (
			<>
				{
					<el-avatar src={scope.row.avatar} size='small'>
						{scope.row.nickName?.slice(0, 1) ?? scope.row.realName?.slice(0, 1)}{' '}
					</el-avatar>
				}
			</>
		)
	},
	{ prop: 'account', label: '账号', width: 140, search: { el: 'input' } },
	{ prop: 'realName', label: '姓名', width: 160 },
	{ prop: 'phone', label: '手机号码', width: 160, search: { el: 'input' } },
	{ prop: 'accountType', label: '账号类型', width: 130, tag: true, enum: userAccountTypeDic },
	{ prop: 'roleName', label: '角色集合', width: 160 },
	{ prop: 'orgName', label: '所属机构', width: 160 },
	{ prop: 'posName', label: '职位名称', width: 100 },
	{ prop: 'orderNo', label: '排序', width: 80 },
	{
		prop: 'status',
		label: '状态',
		width: 80,
		render: scope => <>{<el-switch model-value={scope.row.status} active-value={1} inactive-value={0} onClick={() => changeStatus(scope.row)} />}</>
	},
	{ prop: 'createTime', label: '修改记录', width: 100, render: scope => <>{<ModifyRecord data={scope.row} />}</> },
	{ prop: 'operation', label: '操作', width: 120, fixed: 'right' }
])

/**
 * @description 删除
 * @param params {UserPageRes} 行数据
 */
const del = async (params: UserPageRes) => {
	await useHandleData(delUser, params.id, `删除【${params.realName}】`)
	pureTable.value?.getTableList()
}

/**
 * @description 重置用户密码
 * @param params {UserPageRes} 行数据
 */
const resetUserPwd = async (params: UserPageRes) => {
	await useHandleData(resetPwd, params.id, `重置【${params.realName}】密码`)
	pureTable.value?.getTableList()
}

/**
 * @description 修改状态
 * @param row {UserPageRes} 行记录
 */
const changeStatus = async (row: UserPageRes) => {
	row.status = row.status == 1 ? 0 : 1

	await setStatus(row.id ?? 0, row.status ?? 1).then(() => {
		ElMessage.success('账号状态设置成功')
	})
}

/**
 * @description 打开 drawer
 * @param title {string} 名称
 * @param row {UserPageRes} 行数据
 */
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null)
const openDrawer = (
	title: string,
	row: Partial<UserPageRes> = {
		orderNo: 99,
		status: 1,
		accountType: 777
	}
) => {
	const params: DrawerProps<UserPageRes> = {
		title,
		isView: title === '查看',
		row: { ...row },
		api: title === '新增' ? addUser : title === '编辑' ? editUser : undefined,
		getTableList: pureTable.value?.getTableList,
		orgData: treeFilterData
	}
	drawerRef.value?.acceptParams(params)
}

/**
 * @description 获取 treeFilter 数据
 */
const getTreeFilter = async () => {
	const { result } = await getOrgTreeList({ id: 0 })
	treeFilterData.value = result
	initParam.orgId = 0
}

/**
 * @description 树形筛选切换
 * @param val {string} 选中的值
 */
const changeTreeFilter = (val: string) => {
	pureTable.value!.pageable.page = 1
	initParam.orgId = val === '' ? 0 : Number(val)
}
</script>

<template>
	<div class="main-box">
		<PureTree label="name" :data="treeFilterData" :default-value="initParam.orgId" @change="changeTreeFilter" />
		<div class="table-box">
			<PureTable
				ref="pureTable"
				row-key="id"
				:indent="20"
				:pagination="true"
				:columns="columns"
				:request-api="getUserPage"
				:init-param="initParam"
				:search-col="{ xs: 1, sm: 1, md: 4, lg: 7, xl: 7 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button v-author="SYS_USER_AUTHOR.ADD" type="primary" @click="openDrawer('新增')">
						<template #icon>
							<pure-icon name="pi-carbon:add"></pure-icon>
						</template>
						新增
					</el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link v-author="SYS_USER_AUTHOR.UPDATE" @click="openDrawer('编辑', scope.row)">
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
								<div v-author="SYS_USER_AUTHOR.RESET">
									<el-dropdown-item @click="resetUserPwd(scope.row)">
										<pure-icon name="pi-carbon:reset"></pure-icon>
										重置密码
									</el-dropdown-item>
								</div>
								<div v-author="SYS_USER_AUTHOR.DELETE">
									<el-dropdown-item @click="del(scope.row)" divided>
										<pure-icon name="pi-carbon:trash-can"></pure-icon>
										删除账号
									</el-dropdown-item>
								</div>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</template>
			</PureTable>
			<UserDrawer ref="drawerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
