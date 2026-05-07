<script setup lang="ts" name="MenuDrawer">
import type { CascaderOption, FormInstance } from 'element-plus'

import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { MenuListRes } from '@/api/system/interfaces/menu.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import PureIconPicker from '@/components/PureIconPicker/PureIconPicker.vue'

const drawerVisible = ref(false)

const ruleFormRef = ref<FormInstance>()

const drawerProps = ref<DrawerProps<MenuListRes>>({
	isView: false,
	title: '',
	row: {}
})

const acceptParams = (params: DrawerProps<MenuListRes>) => {
	drawerProps.value = params
	drawerVisible.value = true
}

const findMenuById = (menus: MenuListRes[], id: string): MenuListRes | null => {
	for (const menu of menus) {
		if (menu.id === id) return menu
		if (menu.children && menu.children.length > 0) {
			const found = findMenuById(menu.children, id)
			if (found) return found
		}
	}
	return null
}

watch(
	() => drawerProps.value.row!.parentId,
	newVal => {
		if (!newVal) {
			drawerProps.value.row!.level = 1
		} else {
			const parentMenu = findMenuById(drawerProps.value.data as MenuListRes[], newVal)
			if (parentMenu) {
				drawerProps.value.row!.level = (parentMenu.level || 1) + 1
			}
		}
	}
)

const rules = reactive({
	name: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
	type: [{ required: true, message: '菜单类型不能为空', trigger: 'blur' }],
	title: [{ required: true, message: '标题不能为空', trigger: 'blur' }]
})

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
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="菜单类型" prop="type">
						<el-radio-group v-model="drawerProps.row!.type">
							<el-radio :value="0">顶部菜单</el-radio>
							<el-radio :value="1">页面</el-radio>
							<el-radio :value="2">具体操作</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="上级菜单">
						<el-cascader
							:options="drawerProps.data as CascaderOption[] | undefined"
							:props="{ checkStrictly: true, emitPath: false, value: 'id', label: 'name' }"
							placeholder="请选择上级菜单（一级菜单无需选择）"
							clearable
							class="w100"
							v-model="drawerProps.row!.parentId"
						>
							<template #default="{ node, data }">
								<span>{{ data.name }}</span>
								<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
							</template>
						</el-cascader>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="菜单名称" prop="name">
						<el-input v-model="drawerProps.row!.name" placeholder="菜单名称" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="标题" prop="title">
						<el-input v-model="drawerProps.row!.title" placeholder="标题（面包屑使用）" clearable />
					</el-form-item>
				</el-col>
				<template v-if="drawerProps.row!.type === 0 || drawerProps.row!.type === 1">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="路由路径">
							<el-input v-model="drawerProps.row!.path" placeholder="路由路径" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="菜单图标">
							<pure-icon-picker v-model="drawerProps.row!.icon" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="菜单排序">
							<el-input-number v-model="drawerProps.row!.sort" placeholder="排序" class="w100" />
						</el-form-item>
					</el-col>
				</template>
				<template v-if="drawerProps.row!.type === 2">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="菜单排序">
							<el-input-number v-model="drawerProps.row!.sort" placeholder="排序" class="w100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="HTTP方法">
							<el-input v-model="drawerProps.row!.httpMethod" placeholder="GET/POST/PUT/DELETE" clearable />
						</el-form-item>
					</el-col>
				</template>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="是否总是显示">
						<el-radio-group v-model="drawerProps.row!.showAlways">
							<el-radio :value="0">不显示</el-radio>
							<el-radio :value="1">显示</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="描述">
						<el-input v-model="drawerProps.row!.description" placeholder="请输入描述内容" clearable type="textarea" />
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