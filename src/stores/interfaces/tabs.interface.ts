/**
 * @description tabsStore 参数
 */
export interface TabsState {
  tabsMenuList: TabsMenuProps[]
}

/**
 * @description tabs 参数
 * @param icon 图标
 * @param title 标题
 * @param path 路径
 * @param name 名称
 * @param close 关闭
 * @param isKeepAlive 是否保持
 */
export interface TabsMenuProps {
  icon: string
  title: string
  path: string
  name: string
  close: boolean
  isKeepAlive: boolean
}
