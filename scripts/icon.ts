import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import inquirer from 'inquirer'
import pkg from '../package.json'

/**
 * @description 生成图标库
 */
async function generateIcon() {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'iconSet',
				message: '请输入图标集合名称：',
				default: ''
			}
		])
		.then(async answers => {
			// 获取输入的图标集合名称
			const { iconSet } = answers
			console.log(`✨ ${chalk.cyan(`[${pkg.name}]`)}` + ' - Icon 开始生成:' + `[${iconSet}]`)

			// 设置读取目录以及生成目录
			const prefixSet: string[] = []
			const dir = path.resolve(process.cwd(), 'node_modules/@iconify-json/' + `${iconSet}`)
			const outputDir = path.resolve(process.cwd(), 'src/components/IconPicker/src/data')
			fs.ensureDir(outputDir)

			// 读取对应 iconify json 集合
			fs.readJSON(path.join(dir, 'icons.json'))
				.then(async data => {
					if (data) {
						const { prefix } = data
						const prefixName = `pi-${prefix}`
						const icons = Object.keys(data.icons).map(item => `${prefixName}:${item}`)
						await fs.writeFileSync(
							path.join('src/plugins/unocss/icons', `icons.${prefix}.ts`),
							`export default ${JSON.stringify({ name: prefix, prefix: prefixName, icons })}`
						)
						// ↓分类处理完成，push类型名称
						prefixSet.push(prefix)
					}
					console.log(`✨ ${chalk.cyan(`[${pkg.name}]`)}` + ' - Icon 生成成功:' + `[${prefixSet}]`)
				})
				.catch(err => {
					console.log(`✨ ${chalk.cyan(`[${pkg.name}]`)}` + ' - Icon 生成失败:' + `[${err}]，请先安装对应的图标库！`)
				})
		})
}

generateIcon()
