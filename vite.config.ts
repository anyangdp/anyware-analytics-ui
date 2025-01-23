import path from 'path'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/**
 * @description vite 配置
 */
export default defineConfig(config => {
	// 获取环境变量
	const env = loadEnv(config.mode, process.cwd())

	return {
		define: {
			global: {},
		},
		plugins: [
			vue(),
			vueJsx(),
			UnoCSS({
				configFile: 'src/plugins/unocss/uno.config.ts'
			}),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
				// 指定symbolId格式
				symbolId: 'icon-[dir]-[name]'
			}),
			AutoImport({
				// 配置自动导入路径
				dts: 'src/types/auto-imports.d.ts',
				// 配置自动导出系统集合
				imports: ['vue', 'vue-router', 'pinia'],
				// Element Plus 解析器
				resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
			}),
			Components({
				// 配置自动导入路径
				dts: 'src/types/components.d.ts',
				// dirs 指定组件所在位置，默认为 src/components
				dirs: ['src/components/'],
				// 配置需要将哪些后缀类型的文件进行自动按需引入
				extensions: ['vue'],
				resolvers: [
					// 自动导入 Element Plus 组件
					ElementPlusResolver({ importStyle: 'sass' })
				]
			})
		],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/styles/base/var.scss" as *;`
				}
			}
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		},
		base: env.VITE_PUBLIC_PATH,
		server: {
			// 使用 IP 能访问
			host: '0.0.0.0',
			// 端口号
			port: Number(env.VITE_APP_PORT),
			// 是否热更新
			hmr: true,
			// 设为 true 时若端口已被占用会直接退出
			strictPort: true,
			// 自定义代理规则
			proxy: {
				// api 接口访问
				'/api': {
					// 1 目标路径 这里相当于公共地址
					target: env.VITE_APP_BASE_API,
					// 2 允许跨域
					changeOrigin: true,
					// 3 重写路径
					rewrite: (path: string) => path.replace(/^\/api/, '')
				},
				// 上传路径访问
				'^/[Uu]pload': {
					target: env.VITE_APP_BASE_API,
					changeOrigin: true
				}
			}
		},
		build: {
			outDir: 'dist',
			minify: 'esbuild',
			// esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			sourcemap: false,
			// 禁用 gzip 压缩大小报告，可略微减少打包时间
			reportCompressedSize: false,
			// 规定触发警告的 chunk 大小
			chunkSizeWarningLimit: 2000,
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			}
		}
	}
})
