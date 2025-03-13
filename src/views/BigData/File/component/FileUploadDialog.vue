<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import type { UploadInstance, UploadRawFile } from 'element-plus'

interface DialogProps {
	visible: boolean;
	path: string
}

const props = defineProps<DialogProps>()

// 定义 emit 用于更新 visible
const emits = defineEmits<{
	'update:visible': [value: boolean];
	'refresh-table': []
}>()

const userStore = useUserStore()
const token = userStore.getToken

const header = {
	Authorization: `Bearer ${token}`
}

// 改为响应式对象
const data = reactive({
	path: props.path
})

// 监听 props.path 变化，同步到 data
watch(
	() => props.path,
	(newVal) => {
		data.path = newVal
	}
)

// 文件列表
const fileList = ref<UploadRawFile[]>([])
// 上传组件的 ref
const uploadRef = ref<UploadInstance | null>(null)

// 文件选择时的处理
const handleFileChange = (file: UploadRawFile, files: UploadRawFile[]) => {
	fileList.value = files // 更新文件列表
}

// 上传成功的回调
const handleUploadSuccess = (response: any) => {
	ElMessage.success('文件上传成功')
	fileList.value = [] // 清空文件列表
	uploadRef.value?.clearFiles() // 清空上传组件内部状态
	emits('refresh-table') // 通知父组件刷新表格
	closeDialog()
}

// 上传失败的回调
const handleUploadError = (error: any) => {
	ElMessage.error('文件上传失败')
	console.error(error)
}

// 点击确认上传
const submitUpload = () => {
	if (fileList.value.length === 0) {
		ElMessage.warning('请先选择文件')
		return
	}
	uploadRef.value?.submit() // 手动触发上传
}

// 关闭对话框的方法
const closeDialog = () => {
	emits('update:visible', false)
}

</script>

<template>
	<el-dialog
		title="提示"
		v-model="props.visible"
		width="30%"
		@update:model-value="emits('update:visible', $event)"
		@close="closeDialog"
	>
		<el-upload
			ref="uploadRef"
			class="upload-demo"
			drag
			:headers="header"
			:data="data"
			action="http://localhost:9201/s/file/upload/path"
			:auto-upload="false"
			:file-list="fileList"
			:on-change="handleFileChange"
			:on-success="handleUploadSuccess"
			:on-error="handleUploadError"
			multiple
		>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<template #tip>
				<div class="el-upload__tip">只能上传 csv/jpg/ 文件，且不超过 500kb</div>
			</template>
		</el-upload>
		<template #footer>
    <span class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitUpload">确 定</el-button>
    </span>
		</template>
	</el-dialog>
</template>

<style scoped lang="scss">

</style>