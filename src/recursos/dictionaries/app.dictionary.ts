/**
 * @description 全局状态
 */
export const appActiveDic = [
	{ label: '启用', value: true, tagType: 'success' },
	{ label: '禁用', value: false, tagType: 'danger' }
]

/**
 * @description 全局是否状态
 */
export const appTrueFalseDic = [
	{ label: '是', value: 1, tagType: 'success' },
	{ label: '否', value: 0, tagType: 'danger' }
]

/**
 * @description 角色数据范围权限
 */
export const roleDataScopeDic = [
	{ label: '全部数据', value: 1, tagType: 'primary' },
	{ label: '本部门及以下数据', value: 2, tagType: 'primary' },
	{ label: '本部门数据', value: 3, tagType: 'primary' },
	{ label: '仅本人数据', value: 4, tagType: 'primary' },
	{ label: '自定义数据', value: 5, tagType: 'primary' }
]

/**
 * @description 用户账号类型
 */
export const userAccountTypeDic = [
	{ label: '其它', value: 0, tagType: 'primary' },
	{ label: '普通账号', value: 777, tagType: 'primary' },
	{ label: '系统管理员', value: 888, tagType: 'primary' },
	{ label: '超级管理员', value: 999, tagType: 'primary' }
]

/**
 * @description 菜单类型
 */
export const menuTypeDic = [
	{ label: '目录', value: 1, tagType: 'warning' },
	{ label: '菜单', value: 2, tagType: 'primary' },
	{ label: '按钮', value: 3, tagType: 'info' }
]

/**
 * @description 系统配置内置参数类型
 */
export const configSysFlagDic = [
	{ label: '是', value: 1, tagType: 'primary' },
	{ label: '否', value: 2, tagType: 'danger' }
]

/**
 * @description 系统配置内置参数类型
 */
export const configSysTrueFalseDic = [
	{ label: '是', value: true, tagType: 'primary' },
	{ label: '否', value: false, tagType: 'info' }
]

/**
 * @description 菜单类型
 */
export const logLevelDic = [
	{ label: '调试', value: 1, tagType: 'info' },
	{ label: '消息', value: 2, tagType: 'primary' },
	{ label: '警告', value: 3, tagType: 'warning' },
	{ label: '错误', value: 4, tagType: 'danger' }
]

/**
 * @description 系统配置内置参数类型
 */
export const codeGenerateTypeDic = [
	{ label: '生成到本项目(前端)', value: '211', tagType: 'danger' },
	{ label: '生成到本项目(后端)', value: '221', tagType: 'danger' },
	{ label: '生成到本项目', value: '200', tagType: 'danger' }
]

/**
 * @description App 版本发布记录 App 类型
 */
export const AppReleaseRecordAppTypeDic = [
	{ label: 'IOS', value: '1', tagType: 'primary' },
	{ label: 'Android', value: '2', tagType: 'danger' }
]

/**
 * @description App 版本发布记录更新类型
 */
export const AppReleaseRecordUpdateTypeDic = [
	{ label: '选择更新', value: '1', tagType: 'primary' },
	{ label: '强制更新', value: '2', tagType: 'danger' }
]

/**
 * @description App 版本发布记录版本类型
 */
export const AppReleaseRecordVersionTypeDic = [
	{ label: '未发布', value: '1', tagType: 'primary' },
	{ label: '已发布', value: '2', tagType: 'danger' }
]

/**
 * @description 监控现场类型 1：站点 2：企业 3：污水厂 4：管线  5：管点  6：排口
 */
export const MonitorSiteTypeTypeDic = [
	{ label: '站点', value: 1, tagType: 'primary' },
	{ label: '企业', value: 2, tagType: 'primary' },
	{ label: '污水厂', value: 3, tagType: 'primary' },
	{ label: '管线', value: 4, tagType: 'primary' },
	{ label: '管点', value: 5, tagType: 'primary' },
	{ label: '排口', value: 6, tagType: 'primary' }
]
