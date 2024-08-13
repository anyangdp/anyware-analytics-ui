/**
 * @description 本文件用于程序全局接口定义
 */

/**
 * @description 页面抽屉接收数据基类
 * @param title {string} 名称
 * @param isView {boolean} 是否显示
 * @param row {Partial<T>} 当前行
 * @param api {(params: any) => Promise<any>} 请求方法
 * @param getTableList {() => void} 刷新列表方法
 */
export interface DrawerProps<T> {
  title: string
  isView: boolean
  row: Partial<T>
  api?: (params: any) => Promise<any>
  getTableList?: () => void
  data?: T[] | null | undefined

  [key: string]: any
}
