<script setup lang="ts">
import type { ElTree, FormInstance } from 'element-plus'

import { listMenu } from '@/api/system/menu'
import { getRoleOwnMenuList } from '@/api/system/role'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { RolePageRes } from '@/api/system/interfaces/role.interface'
import type { MenuListRes } from '@/api/system/interfaces/menu.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'

/**
 * @description drawer 是否显示
 */
const drawerVisible = ref(false)

/**
 * @description 树实例
 */
const treeRef = ref<InstanceType<typeof ElTree>>()

/**
 * @description 定义接收参数
 * @param isView {boolean} 是否显示
 * @param titile {string} 标题
 * @param row {RolePageRes} 行数据
 */
const drawerProps = ref<DrawerProps<RolePageRes>>({
	isView: false,
	title: '',
	row: {}
})

/**
 * @description 页面参数
 * @param loading {boolean} 树形组件加载动画
 * @param menuData {} 菜单数据
 */
const state = reactive({
	loading: false,
	menuData: [] as Array<MenuListRes> // 菜单数据
})

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = async (params: DrawerProps<RolePageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true

	state.loading = true
	let res = await listMenu({})
	state.menuData = res ?? []
	state.loading = false

	// 判断是否需要加载选中的菜单
	if (drawerProps.value.row.id != undefined) {
		let res = await getRoleOwnMenuList(drawerProps.value.row.id)
		setTimeout(() => {
			const permissionIds = res?.map(item => item?.permissionId) ?? [];
			treeRef.value!.setCheckedKeys(permissionIds)
		}, 100)
	}
}

/**
 * @description 提交数据（新增/编辑）
 */
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return
		try {
			console.log(drawerProps.value.title)
			if (drawerProps.value.title == '授权') {
				// 赋值选中的菜单 id 列表
				let permissionList = treeRef.value?.getCheckedKeys() as Array<string>
				console.log(drawerProps.value.api)
				await drawerProps.value.api!({
					roleId: drawerProps.value.row.id,
					permissionList: permissionList
				})
			} else {
				await drawerProps.value.api!(drawerProps.value.row)
			}
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
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="700px" :title="`${drawerProps.title}`">
		<el-form
			:label-position="FORM_LABEL_POSITION"
			ref="ruleFormRef"
			:size="FORM_SIZE"
			:disabled="drawerProps.isView"
			:model="drawerProps.row"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-if="drawerProps.title != '授权'">
					<el-form-item label="角色名称" prop="name" :rules="[{ required: true, message: '角色名称不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.name" placeholder="角色名称" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-if="drawerProps.title != '授权'">
					<el-form-item label="排序" prop="sort" :rules="[{ required: true, message: '排序不能为空', trigger: 'blur' }]">
						<el-input-number v-model="drawerProps.row!.sort" placeholder="排序" class="w100" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-if="drawerProps.title != '授权'">
					<el-form-item label="状态" prop="active" :rules="[{ required: true, message: '状态不能为空', trigger: 'blur' }]">
						<el-radio-group v-model="drawerProps.row!.active">
							<el-radio :value="true">启用</el-radio>
							<el-radio :value="false">禁用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="drawerProps.title != '授权'">
					<el-form-item label="备注">
						<el-input v-model="drawerProps.row!.description" placeholder="请输入备注内容" clearable type="textarea" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"  v-if="drawerProps.title == '授权'">
					<el-form-item label="菜单权限" v-loading="state.loading">
						<el-tree
							ref="treeRef"
							:data="state.menuData"
							node-key="id"
							show-checkbox
							:props="{ children: 'children', label: 'title' }"
							highlight-current
							style="overflow-y: auto"
						/>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button v-show="!drawerProps.isView" type="primary" v-throttle="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<style scoped lang="scss"></style>
