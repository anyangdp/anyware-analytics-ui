<script setup lang="ts" name="MenuDrawer">
import type { CascaderOption, FormInstance } from 'element-plus'

import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { MenuListRes } from '@/api/system/interfaces/menu.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import PureIconPicker from '@/components/PureIconPicker/PureIconPicker.vue'

/**
 * @description drawer 是否显示
 */
const drawerVisible = ref(false)

/**
 * @description 表单实例
 */
const ruleFormRef = ref<FormInstance>()

/**
 * @description 定义接收参数
 */
const drawerProps = ref<DrawerProps<MenuListRes>>({
	isView: false,
	title: '',
	row: {}
})

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = (params: DrawerProps<MenuListRes>) => {
	drawerProps.value = params
	drawerVisible.value = true
}

/**
 * @description 表单验证规则
 */
const rules = reactive({})

/**
 * @description 提交表单
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
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="750px" :title="`${drawerProps.title}菜单`">
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
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="上级菜单">
						<el-cascader
							:options="drawerProps.data as CascaderOption[] | undefined"
							:props="{ checkStrictly: true, emitPath: false, value: 'id', label: 'title' }"
							placeholder="请选择上级菜单"
							clearable
							class="w100"
							v-model="drawerProps.row!.pid"
						>
							<template #default="{ node, data }">
								<span>{{ data.title }}</span>
								<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
							</template>
						</el-cascader>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="菜单类型" prop="type" :rules="[{ required: true, message: '菜单类型不能为空', trigger: 'blur' }]">
						<el-radio-group v-model="drawerProps.row!.type">
							<el-radio :value="1">目录</el-radio>
							<el-radio :value="2">菜单</el-radio>
							<el-radio :value="3">按钮</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="菜单名称" prop="title" :rules="[{ required: true, message: '菜单名称不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.title" placeholder="菜单名称" clearable />
					</el-form-item>
				</el-col>
				<template v-if="drawerProps.row!.type === 1 || drawerProps.row!.type === 2">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="路由名称">
							<el-input v-model="drawerProps.row!.name" placeholder="路由名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="路由路径">
							<el-input v-model="drawerProps.row!.path" placeholder="路由路径" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="组件路径">
							<el-input v-model="drawerProps.row!.component" placeholder="组件路径" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="菜单图标">
							<pure-icon-picker v-model="drawerProps.row!.icon" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="重定向">
							<el-input v-model="drawerProps.row!.redirect" placeholder="重定向地址" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="链接地址">
							<el-input v-model="drawerProps.row!.outLink" placeholder="外链/内嵌时链接地址" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="菜单排序">
							<el-input-number v-model="drawerProps.row!.orderNo" placeholder="排序" class="w100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="是否隐藏">
							<el-radio-group v-model="drawerProps.row!.isHide">
								<el-radio :value="true">隐藏</el-radio>
								<el-radio :value="false">不隐藏</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="是否缓存">
							<el-radio-group v-model="drawerProps.row!.isKeepAlive">
								<el-radio :value="true">缓存</el-radio>
								<el-radio :value="false">不缓存</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="是否固定">
							<el-radio-group v-model="drawerProps.row!.isAffix">
								<el-radio :value="true">固定</el-radio>
								<el-radio :value="false">不固定</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="是否内嵌">
							<el-radio-group v-model="drawerProps.row!.isIframe">
								<el-radio :value="true">内嵌</el-radio>
								<el-radio :value="false">不内嵌</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</template>
				<template v-if="drawerProps.row!.type === 3">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="权限标识">
							<el-input v-model="drawerProps.row!.permission" placeholder="权限标识" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="菜单排序">
							<el-input-number v-model="drawerProps.row!.orderNo" placeholder="排序" class="w100" />
						</el-form-item>
					</el-col>
				</template>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="是否启用">
						<el-radio-group v-model="drawerProps.row!.status">
							<el-radio :value="1">启用</el-radio>
							<el-radio :value="0">不启用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="备注">
						<el-input v-model="drawerProps.row!.remark" placeholder="请输入备注内容" clearable type="textarea" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<style scoped lang="scss"></style>
