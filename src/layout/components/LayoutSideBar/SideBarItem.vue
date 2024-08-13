<script setup lang="ts">
import { useRouter } from 'vue-router'
import PureIcon from '@/components/PureIcon/PureIcon.vue'
import { HOME_URL } from '@/recursos/constantes/app.constant'
import type { AuthorMenuTree } from '@/api/system/interfaces/author.interface'

/**
 * @description 初始化对象
 */
const router = useRouter()

/**
 * @description 定义参数
 */
const props = defineProps({
	routerList: {
		type: Array as () => AuthorMenuTree[],
		required: true
	}
})

/**
 * @description 菜单点击事件
 */
const handleClickMenu = (item: AuthorMenuTree) => {
	if (item.meta?.isLink) return window.open(item.meta?.isLink, '_blank')
	router.push(item.path ?? HOME_URL)
}
</script>
<template>
	<template v-for="item in props.routerList" :key="item.path">
		<!-- 当该菜单项有子菜单时 -->
		<el-sub-menu :index="item.path ?? ''" v-if="item.children && item.children.length > 0">
			<template #title v-if="item.meta?.icon">
				<!-- 菜单项图标 -->
				<el-icon>
					<pure-icon :name="item.meta?.icon" />
				</el-icon>
				<!-- 菜单项名称，在路由中定义好 -->
				<span>{{ item.meta?.title }}</span>
			</template>
			<!-- 若路由中未定义菜单项icon，则仅展示名称 -->
			<template #title v-else>{{ item.meta.title }}</template>

			<!-- 递归遍历-自己调用自己（核心代码） -->
			<side-bar-item :router-list="item.children as AuthorMenuTree[]" />
		</el-sub-menu>

		<!-- 当前菜单项无子菜单 -->
		<el-menu-item :index="item.path" v-else @click="handleClickMenu(item)">
			<!-- 与上面注释大致相同，不多做额外注释 -->
			<template v-if="item.meta?.icon">
				<pure-icon :name="item.meta.icon" />
				<span>{{ item.meta?.title }}</span>
			</template>
			<template v-else>
				{{ item.meta?.title }}
			</template>
		</el-menu-item>
	</template>
</template>

<style scoped lang="scss"></style>
