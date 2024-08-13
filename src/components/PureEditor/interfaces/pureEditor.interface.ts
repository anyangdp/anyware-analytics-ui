import type { IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

/**
 * @description 接收父组件参数，并设置默认值
 * @param value {string} 富文本值
 * @param toolbarConfig {Partial<IToolbarConfig>} 工具栏配置
 * @param editorConfig {Partial<IEditorConfig>} 编辑器配置
 * @param height {string} 富文本高度，默认 500px
 * @param mode {'default' | 'simple'} 富文本模式
 * @param hideToolBar {boolean} 是否隐藏工具栏
 * @param disabled {boolean} 是否禁用编辑器
 */
export interface RichEditorProps {
	value?: string
	toolbarConfig?: Partial<IToolbarConfig>
	editorConfig?: Partial<IEditorConfig>
	height?: string
	mode?: 'default' | 'simple'
	hideToolBar?: boolean
	disabled?: boolean
}
