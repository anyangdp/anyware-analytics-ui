import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss'

export default defineConfig({
	shortcuts: [],
	theme: {
		colors: {}
	},
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			collections: {
				ep: () => import('@iconify-json/ep/icons.json').then(i => i.default),
				carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
				tdesign: () => import('@iconify-json/tdesign/icons.json').then(i => i.default),
				antDesign: () => import('@iconify-json/ant-design/icons.json').then(i => i.default)
			},
			prefix: 'pi-'
		}),
		presetTypography(),
		presetWebFonts({
			fonts: {}
		})
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	content: {
		pipeline: {
			include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|ts)($|\?)/, 'src/router/index.ts']
		}
	}
})
