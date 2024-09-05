import type { RouteRecordRaw } from 'vue-router'
import type { AuthorMenuTree } from '@/api/system/interfaces/author.interface'

/**
 * @description 用户权限存储
 * @param addRouters 动态添加的路由集合
 * @param routers 完整路由集合
 * @param isAddRouters 是否动态添加过路由
 */
export interface AuthorState {
  routers: RouteRecordRaw[]
  addRouters: RouteRecordRaw[]
  menuList: AuthorMenuTree[]
  isAddRouters: boolean
}
