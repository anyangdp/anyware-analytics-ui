<script setup lang="ts">
import type { FormInstance } from 'element-plus'

import { listPos } from '@/api/system/pos'
import { listRole } from '@/api/system/role'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { PosPageRes } from '@/api/system/interfaces/pos.interface'
import type { RoleListRes } from '@/api/system/interfaces/role.interface'
import type { UserPageRes } from '@/api/system/interfaces/user.interface'
import type { OrgTreeListReq } from '@/api/system/interfaces/org.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'

/**
 * @description drawer 是否显示
 */
const drawerVisible = ref(false)

/**
 * @description 表单实例
 */
const ruleFormRef = ref<FormInstance>()

/**
 * @description 页面初始参数
 * @param loading 加载
 * @param selectedTabName 选中的 tab 页
 * @param posData {Array<PosPageRes>} 职位数据
 * @param roleData {Array<RoleListRes>} 角色数据
 */
const state = reactive({
	loading: false,
	selectedTabName: '0',
	posData: [] as Array<PosPageRes>,
	roleData: [] as Array<RoleListRes>
})

/**
 * @description 定义接收参数
 */
const drawerProps = ref<DrawerProps<UserPageRes>>({
	isView: false,
	title: '',
	row: {},
	orgData: [] as Array<OrgTreeListReq>
})

/**
 * @description 验证规则
 */
const rules = reactive({})

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = async (params: DrawerProps<UserPageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true

	// 初始化数据
	state.loading = true
	let res = await listPos({})
	state.posData = res.result ?? []
	let res1 = await listRole()
	state.roleData = res1.result ?? []
	state.loading = false
}

/**
 * @description 提交数据（新增/编辑）
 */

const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return
		try {
			await drawerProps.value.api!(drawerProps.value.row)
			ElMessage.success({ message: `${drawerProps.value.title}成功！` })
			drawerProps.value.getTableList!()
			drawerVisible.value = false
		} catch (error) {
			console.log(error)
		}
	})
}

/**
 * @description 导出接收参数方法
 */
defineExpose({
	acceptParams
})
</script>

<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="800px" :title="`${drawerProps.title}用户`">
		<el-tabs v-loading="drawerProps.loading" v-model="drawerProps.selectedTabName">
			<el-tab-pane label="基础信息" style="height: 550px">
				<el-form
					:label-position="FORM_LABEL_POSITION"
					ref="ruleFormRef"
					:rules="rules"
					:size="FORM_SIZE"
					:disabled="drawerProps.isView"
					:model="drawerProps.row"
					:hide-required-asterisk="drawerProps.isView"
				>
					<el-row :gutter="35">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="账号名称" prop="account" :rules="[{ required: true, message: '账号名称不能为空', trigger: 'blur' }]">
								<el-input v-model="drawerProps.row!.account" placeholder="账号名称" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="昵称">
								<el-input v-model="drawerProps.row!.nickName" placeholder="昵称" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="手机号码" prop="phone" :rules="[{ required: true, message: '手机号码不能为空', trigger: 'blur' }]">
								<el-input v-model="drawerProps.row!.phone" placeholder="手机号码" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="真实姓名" prop="realName" :rules="[{ required: true, message: '真实姓名不能为空', trigger: 'blur' }]">
								<el-input v-model="drawerProps.row!.realName" placeholder="真实姓名" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="角色集合" prop="roleIdList" :rules="[{ required: true, message: '角色集合不能为空', trigger: 'blur' }]">
								<el-select
									v-model="drawerProps.row!.roleIdList"
									multiple
									value-key="id"
									clearable
									placeholder="角色集合"
									collapse-tags
									collapse-tags-tooltip
									class="w100"
									filterable
								>
									<el-option v-for="item in state.roleData" :key="item.id" :label="item.name" :value="item.id" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="账号类型" prop="accountType" :rules="[{ required: true, message: '账号类型不能为空', trigger: 'blur' }]">
								<el-select v-model="drawerProps.row!.accountType" placeholder="账号类型" collapse-tags collapse-tags-tooltip class="w100">
									<el-option label="系统管理员" :value="888" />
									<el-option label="普通账号" :value="777" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="邮箱">
								<el-input v-model="drawerProps.row!.email" placeholder="邮箱" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb5">
							<el-form-item label="排序">
								<el-input-number v-model="drawerProps.row!.orderNo" placeholder="排序" class="w100" />
							</el-form-item>
						</el-col>
						<el-divider border-style="dashed" content-position="center">
							<div style="color: #b1b3b8">机构组织</div>
						</el-divider>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="所属机构" prop="orgId" :rules="[{ required: true, message: '所属机构不能为空', trigger: 'blur' }]">
								<el-cascader
									:options="drawerProps.orgData"
									:props="{ checkStrictly: true, emitPath: false, value: 'id', label: 'name', expandTrigger: 'hover' }"
									placeholder="所属机构"
									clearable
									class="w100"
									v-model="drawerProps.row!.orgId"
								>
									<template #default="{ node, data }">
										<span>{{ data.name }}</span>
										<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
									</template>
								</el-cascader>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="职位" prop="posId" :rules="[{ required: true, message: '职位名称不能为空', trigger: 'blur' }]">
								<el-select v-model="drawerProps.row!.posId" placeholder="职位" class="w100">
									<el-option v-for="d in state.posData" :key="d.id" :label="d.name" :value="d.id" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="工号">
								<el-input v-model="drawerProps.row!.jobNum" placeholder="工号" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="入职日期">
								<el-date-picker
									v-model="drawerProps.row!.joinDate"
									type="date"
									placeholder="入职日期"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									class="w100"
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="档案信息" style="height: 700px">
				<el-form :label-position="FORM_LABEL_POSITION" :size="FORM_SIZE" :model="drawerProps.row" :hide-required-asterisk="drawerProps.isView">
					<el-row :gutter="35">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="证件类型" prop="cardType">
								<el-select v-model="drawerProps.row!.cardType" placeholder="证件类型" class="w100">
									<el-option label="身份证" :value="0" />
									<el-option label="护照" :value="1" />
									<el-option label="出生证" :value="2" />
									<el-option label="港澳台通行证" :value="3" />
									<el-option label="外国人居留证" :value="4" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="证件号码">
								<el-input v-model="drawerProps.row!.idCardNum" placeholder="证件号码" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="出生日期" prop="birthday">
								<el-date-picker
									v-model="drawerProps.row!.birthday"
									type="date"
									placeholder="出生日期"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									class="w100"
								/>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="性别">
								<el-radio-group v-model="drawerProps.row!.sex">
									<el-radio :value="1">男</el-radio>
									<el-radio :value="2">女</el-radio>
									<el-radio :value="3">其他</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb5">
							<el-form-item label="年龄">
								<el-input-number v-model="drawerProps.row!.age" placeholder="年龄" class="w100" />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="民族">
								<el-input v-model="drawerProps.row!.nation" placeholder="民族" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<el-form-item label="地址">
								<el-input v-model="drawerProps.row!.address" placeholder="地址" clearable type="textarea" />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="毕业学校">
								<el-input v-model="drawerProps.row!.college" placeholder="毕业学校" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="文化程度">
								<el-select v-model="drawerProps.row!.cultureLevel" placeholder="文化程度" class="w100">
									<el-option label="其他" :value="0" />
									<el-option label="小学" :value="1" />
									<el-option label="初中" :value="2" />
									<el-option label="普通高中" :value="3" />
									<el-option label="技工学校" :value="4" />
									<el-option label="职业教育" :value="5" />
									<el-option label="职业高中" :value="6" />
									<el-option label="中等专科" :value="7" />
									<el-option label="大学专科" :value="8" />
									<el-option label="大学本科" :value="9" />
									<el-option label="硕士研究生" :value="10" />
									<el-option label="博士研究生" :value="11" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="政治面貌">
								<el-input v-model="drawerProps.row!.politicalOutlook" placeholder="政治面貌" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="办公电话">
								<el-input v-model="drawerProps.row!.officePhone" placeholder="办公电话" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="紧急联系人">
								<el-input v-model="drawerProps.row!.emergencyContact" placeholder="紧急联系人" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
							<el-form-item label="联系人电话">
								<el-input v-model="drawerProps.row!.emergencyPhone" placeholder="联系人电话" clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<el-form-item label="联系人地址">
								<el-input v-model="drawerProps.row!.emergencyAddress" placeholder="联系人地址" clearable type="textarea" />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<el-form-item label="备注">
								<el-input v-model="drawerProps.row!.remark" placeholder="备注" clearable type="textarea" />
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
		</el-tabs>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button v-show="!drawerProps.isView" type="primary" v-throttle="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<style scoped lang="scss"></style>
