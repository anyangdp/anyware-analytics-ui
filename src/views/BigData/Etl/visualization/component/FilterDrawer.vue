<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { FORM_LABEL_POSITION, FORM_SIZE } from '@/recursos/constantes/app.constant'
import 'vue-json-pretty/lib/styles.css'
import { logicEnum, logicOptions, operatorOptions, ruleType } from '@/recursos/constantes/bigdata.constant'

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

// 定义 filterRules
const filterRules = ref<any[]>([]);

// 添加顶层规则
const addFilterRule = (type: string) => {
	if (type === ruleType.SIMPLE) {
		filterRules.value.push({
			type: ruleType.SIMPLE,
			field: '',
			operator: '',
			value: ''
		});
	} else if (type === ruleType.COMPOSITE) {
		filterRules.value.push({
			type: ruleType.COMPOSITE,
			logic: 'AND',
			rules: []
		});
	}
};

// 删除顶层规则
const removeFilterRule = (index) => {
	filterRules.value.splice(index, 1);
};

// 添加子规则
const addSubRule = (parentIndex, type, subParentIndex = null) => {
	const targetRules = subParentIndex === null
		? filterRules.value[parentIndex].rules
		: filterRules.value[parentIndex].rules[subParentIndex].rules;

	if (type === ruleType.SIMPLE) {
		targetRules.push({
			type: ruleType.SIMPLE,
			field: '',
			operator: '',
			value: ''
		});
	} else if (type === ruleType.COMPOSITE) {
		targetRules.push({
			type: ruleType.COMPOSITE,
			logic: logicEnum.AND,
			rules: []
		});
	}
};

// 删除子规则
const removeSubRule = (parentIndex, subIndex) => {
	filterRules.value[parentIndex].rules.splice(subIndex, 1);
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
	filterRules.value = drawerProps.value.row.filterRules
	console.log("filterRules:", filterRules.value)
}


const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) {
			return
		}
		try {
			drawerProps.value.row.filterRules = filterRules.value
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
					<el-form-item label="转换" prop="transform">
						<div style="width: 100%;">
							<!-- 渲染所有规则 -->
							<template v-for="(item, index) in filterRules" :key="index">
								<!-- 简单规则 -->
								<div v-if="item.type === ruleType.SIMPLE" style="display: flex; justify-content: left; margin-bottom: 10px;">
									<div style="width: 30%; margin-right: 10px;">
										字段:
										<el-input v-model="item.field" placeholder="字段" clearable />
									</div>
									<div style="width: 30%; margin-right: 10px;">
										操作符:
										<el-select v-model="item.operator" placeholder="操作符" clearable>
											<el-option
												v-for="option in operatorOptions"
												:key="option.value"
												:label="option.label"
												:value="option.value"
											/>
										</el-select>
									</div>
									<div style="width: 30%; margin-right: 10px;">
										比较值:
										<el-input v-model="item.value" placeholder="比较值" clearable />
									</div>
									<div style="width: 10%;">
										<el-button type="danger" link @click="removeFilterRule(index)">
											<template #icon>
												<pure-icon name="pi-carbon:trash-can"></pure-icon>
											</template>
											移除
										</el-button>
									</div>
								</div>

								<!-- 复合规则 -->
								<div v-else-if="item.type === ruleType.COMPOSITE" style="border: 1px solid #dcdfe6; padding: 10px; margin-bottom: 10px;">
									<div style="display: flex; align-items: center; margin-bottom: 10px;">
										<el-select v-model="item.logic" style="width: 100px;">
											<el-option
												v-for="option in logicOptions"
												:key="option.value"
												:label="option.label"
												:value="option.value"
											/>
										</el-select>
										<el-button type="primary" link @click="addSubRule(index, ruleType.SIMPLE)" style="margin-left: 10px;">
											<template #icon>
												<pure-icon name="pi-carbon:add"></pure-icon>
											</template>
											添加子规则
										</el-button>
										<el-button type="danger" link @click="removeFilterRule(index)" style="margin-left: auto;">
											<template #icon>
												<pure-icon name="pi-carbon:trash-can"></pure-icon>
											</template>
											移除复合规则
										</el-button>
									</div>
									<!-- 递归渲染子规则 -->
									<template v-for="(subItem, subIndex) in item.rules" :key="subIndex">
										<!-- 子简单规则 -->
										<div v-if="subItem.type === ruleType.SIMPLE" style="display: flex; justify-content: left; margin-left: 20px; margin-bottom: 10px;">
											<div style="width: 30%; margin-right: 10px;">
												字段:
												<el-input v-model="subItem.field" placeholder="字段" clearable />
											</div>
											<div style="width: 30%; margin-right: 10px;">
												操作符:
												<el-select v-model="subItem.operator" placeholder="操作符" clearable>
													<el-option
														v-for="option in operatorOptions"
														:key="option.value"
														:label="option.label"
														:value="option.value"
													/>
												</el-select>
											</div>
											<div style="width: 30%; margin-right: 10px;">
												比较值:
												<el-input v-model="subItem.value" placeholder="比较值" clearable />
											</div>
											<div style="width: 10%;">
												<el-button type="danger" link @click="removeSubRule(index, subIndex)">
													<template #icon>
														<pure-icon name="pi-carbon:trash-can"></pure-icon>
													</template>
													移除
												</el-button>
											</div>
										</div>
										<!-- 子复合规则（支持嵌套） -->
										<div v-else-if="subItem.type === ruleType.COMPOSITE" style="border: 1px solid #dcdfe6; padding: 10px; margin-left: 20px; margin-bottom: 10px;">
											<div style="display: flex; align-items: center; margin-bottom: 10px;">
												<el-select v-model="subItem.logic" style="width: 100px;">
													<el-option label="AND" value="AND" />
													<el-option label="OR" value="OR" />
												</el-select>
												<el-button type="primary" link @click="addSubRule(index, ruleType.SIMPLE, subIndex)" style="margin-left: 10px;">
													<template #icon>
														<pure-icon name="pi-carbon:add"></pure-icon>
													</template>
													添加子规则
												</el-button>
												<el-button type="danger" link @click="removeSubRule(index, subIndex)" style="margin-left: auto;">
													<template #icon>
														<pure-icon name="pi-carbon:trash-can"></pure-icon>
													</template>
													移除复合规则
												</el-button>
											</div>
											<!-- 更深层的子规则可以继续嵌套，此处省略以避免代码冗长 -->
										</div>
									</template>
								</div>
							</template>

							<!-- 添加按钮 -->
							<el-button type="primary" link @click="addFilterRule(ruleType.SIMPLE)">
								<template #icon>
									<pure-icon name="pi-carbon:add"></pure-icon>
								</template>
								添加简单规则
							</el-button>
							<el-button type="primary" link @click="addFilterRule(ruleType.COMPOSITE)">
								<template #icon>
									<pure-icon name="pi-carbon:add"></pure-icon>
								</template>
								添加复合规则
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
