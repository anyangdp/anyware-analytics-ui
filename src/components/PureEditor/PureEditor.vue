<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { uploadImage } from '@/api/system/file'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { formContextKey, formItemContextKey } from 'element-plus'
import type { RichEditorProps } from '@/components/PureEditor/interfaces/pureEditor.interface'

/**
 * @description 富文本 DOM 元素
 */
const editorRef = shallowRef()

/**
 * @description 实列化编辑器
 */
const handleCreated = (editor: any) => {
	editorRef.value = editor
}

/**
 * @description 定义默认接收的数据
 */
const props = withDefaults(defineProps<RichEditorProps>(), {
	toolbarConfig: () => {
		return {
			excludeKeys: []
		}
	},
	editorConfig: () => {
		return {
			placeholder: '请输入内容...',
			MENU_CONF: {}
		}
	},
	height: '500px',
	mode: 'default',
	hideToolBar: false,
	disabled: false
})

/**
 * @description 获取 el-form 组件上下文
 */
const formContext = inject(formContextKey, void 0)

/**
 * @description 获取 el-form-item 组件上下文
 */
const formItemContext = inject(formItemContextKey, void 0)

/**
 * @description 判断是否禁用上传和删除
 */
const self_disabled = computed(() => {
	return props.disabled || formContext?.disabled
})

/**
 * @description 判断当前富文本编辑器是否禁用
 */
if (self_disabled.value) nextTick(() => editorRef.value.disable())

/**
 * @description 富文本的内容监听，触发父组件改变，实现双向数据绑定
 */
const emit = defineEmits<{
	'update:value': [value: string]
	'check-validate': []
}>()

/**
 * @description 获取副本框内容
 */
const valueHtml = computed({
	get() {
		return props.value ?? ''
	},
	set(val: string) {
		// 防止富文本内容为空时，校验失败
		if (editorRef.value.isEmpty()) val = ''
		emit('update:value', val)
	}
})

/**
 * @description 图片自定义上传
 * @param file 上传的文件
 * @param insertFn 上传成功后的回调函数（插入到富文本编辑器中）
 * */
type InsertFnTypeImg = (url: string, alt?: string, href?: string) => void
props.editorConfig.MENU_CONF!['uploadImage'] = {
	async customUpload(file: File, insertFn: InsertFnTypeImg) {
		if (!uploadImgValidate(file)) return
		try {
			const { result } = await uploadImage(file)
			insertFn(result.url ?? '')
		} catch (error) {
			console.log(error)
		}
	}
}

/**
 * @description 图片上传前判断
 */
const uploadImgValidate = (file: File): boolean => {
	return true
}

/**
 * @description 编辑框失去焦点时触发
 */
const handleBlur = () => {
	formItemContext?.prop && formContext?.validateField([formItemContext.prop as string])
}

/**
 * @description 组件销毁时，也及时销毁编辑器
 */
onBeforeUnmount(() => {
	if (!editorRef.value) return
	editorRef.value.destroy()
})

/**
 * @description 对外暴漏的方法
 */
defineExpose({
	editor: editorRef
})
</script>

<template>
	<div :class="['editor-box', self_disabled ? 'editor-disabled' : '']">
		<Toolbar v-if="!hideToolBar" class="editor-toolbar" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
		<Editor
			v-model="valueHtml"
			class="editor-content"
			:style="{ height }"
			:mode="mode"
			:default-config="editorConfig"
			@on-created="handleCreated"
			@on-blur="handleBlur"
		/>
	</div>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
