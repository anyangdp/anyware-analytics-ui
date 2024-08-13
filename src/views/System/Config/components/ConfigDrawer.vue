<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import type { ConfigPageRes } from '@/api/system/interfaces/config.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'

/**
 * @description 初始化对象
 */
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<ConfigPageRes>>({
	isView: false,
	title: '',
	row: {}
})

/**
 * @description 表单验证
 */
const rules = reactive({})

/**
 * @description 接收父组件传过来的参数
 */
const acceptParams = (params: DrawerProps<ConfigPageRes>) => {
	drawerProps.value = params
	drawerVisible.value = true
}

/**
 * @description 提交数据（新增/编辑）
 */
const ruleFormRef = ref<FormInstance>()
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
 * @description 对外函数
 */
defineExpose({
	acceptParams
})
</script>

<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="650px" :title="`${drawerProps.title}`">
		<el-form
			:label-position="FORM_LABEL_POSITION"
			ref="ruleFormRef"
			:size="FORM_SIZE"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.row"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="配置名称" prop="name" :rules="[{ required: true, message: '配置名称不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.name" placeholder="配置名称" clearable />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="配置编码" prop="code" :rules="[{ required: true, message: '配置编码不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.code" placeholder="配置编码" clearable :disabled="drawerProps.row!.sysFlag == 1" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="值" prop="value" :rules="[{ required: true, message: '值不能为空', trigger: 'blur' }]">
						<el-input v-model="drawerProps.row!.value" placeholder="值">
							<template #append>
								<el-space :size="10" spacer="|">
									<el-dropdown
										style="color: inherit"
										trigger="click"
										@command="
											(value: string) => {
												drawerProps.row!.value = value
											}
										"
									>
										<el-button style="margin: 0px -20px; color: inherit"> 选项</el-button>
										<template #dropdown>
											<el-dropdown-menu>
												<el-dropdown-item command="True"> True</el-dropdown-item>
												<el-dropdown-item command="False"> False</el-dropdown-item>
											</el-dropdown-menu>
										</template>
									</el-dropdown>
								</el-space>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="内置参数" prop="sysFlag" :rules="[{ required: true, message: '内置参数不能为空', trigger: 'blur' }]">
						<el-radio-group v-model="drawerProps.row!.sysFlag" :disabled="drawerProps.row!.sysFlag == 1 && drawerProps.row!.id != undefined">
							<el-radio :value="1">是</el-radio>
							<el-radio :value="2">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="分组编码">
						<el-input v-model="drawerProps.row!.groupCode" placeholder="分组编码" clearable :disabled="drawerProps.row!.sysFlag == 1" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="排序">
						<el-input-number v-model="drawerProps.row!.orderNo" placeholder="排序" class="w100" />
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
