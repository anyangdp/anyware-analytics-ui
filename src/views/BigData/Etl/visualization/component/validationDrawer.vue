<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import 'vue-json-pretty/lib/styles.css'
import {
	cleanOperationOptions,
	logicEnum,
	logicOptions,
	operatorOptions,
	ruleType, validationOptions
} from '@/recursos/constantes/bigdata.constant'

/**
 * @description 抛出事件
 */
const emits = defineEmits(['submit'])
// 初始化对象
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps<any>>({
	isView: false,
	title: '',
	row: {}
})

const validationRules = ref<any[]>([]);
// 添加验证规则
const addValidationRule = () => {
	validationRules.value.push({
		field: '',
		type: '',
		expectedValue: null,
		message: ''
	});
};

// 删除验证规则
const removeValidationRule = (index: number) => {
	validationRules.value.splice(index, 1);
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()

// 验证
const rules = reactive({
	description: [{ required: true, message: '请输入名称描述', trigger: 'blur' }]
})

// 接收父组件传过来的参数
const acceptParams = async (params: DrawerProps<any>) => {
	console.log('params:', params)
	drawerProps.value = params
	drawerVisible.value = true
	validationRules.value = drawerProps.value.row.validationRules
	console.log("filterRules:", validationRules.value)
}


const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) {
			return
		}
		try {
			drawerProps.value.row.validationRules = validationRules.value
			emits('submit', drawerProps.value.row)
			drawerVisible.value = false
		} catch (error) {
			console.log(error)
		}
	})
}
const closeDrawer = () => {

}

defineExpose({
	acceptParams
})
</script>

<template>
	<el-drawer v-model="drawerVisible" @close="closeDrawer" :destroy-on-close="true" size="750px"
						 :title="`${drawerProps.title}`">
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
					<el-form-item label="步骤名称" prop="description">
						<el-input v-model="drawerProps.row!.description" placeholder="请填写步骤名称" clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="验证规则" prop="validation">
						<div style="width: 100%;">
							<template v-for="(item, index) in validationRules" :key="index">
								<div style="display: flex; justify-content: left; margin-bottom: 10px;">
									<div style="width: 25%; margin-right: 10px;">
										字段:
										<el-input v-model="item.field" placeholder="字段" clearable />
									</div>
									<div style="width: 25%; margin-right: 10px;">
										类型:
										<el-select v-model="item.type" placeholder="验证类型" clearable>
											<el-option-group
												v-for="group in validationOptions"
												:key="group.groupLabel"
												:label="group.groupLabel"
											>
												<el-option
													v-for="option in group.options"
													:key="option.value"
													:label="option.label"
													:value="option.value"
												/>
											</el-option-group>
										</el-select>
									</div>
									<div style="width: 25%; margin-right: 10px;" v-if="item.type && validationOptions.flatMap(g => g.options).find(opt => opt.value === item.type)?.requiresValue">
										期望值:
										<el-input v-model="item.expectedValue" placeholder="期望值" clearable />
									</div>
									<div style="width: 25%; margin-right: 10px;">
										错误消息:
										<el-input v-model="item.message" placeholder="错误消息" clearable />
									</div>
									<div style="width: 10%;">
										<el-button type="danger" link @click="removeValidationRule(index)">
											<template #icon>
												<pure-icon name="pi-carbon:trash-can"></pure-icon>
											</template>
											移除
										</el-button>
									</div>
								</div>
							</template>
							<el-button type="primary" link @click="addValidationRule">
								<template #icon>
									<pure-icon name="pi-carbon:add"></pure-icon>
								</template>
								添加验证规则
							</el-button>
						</div>
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
