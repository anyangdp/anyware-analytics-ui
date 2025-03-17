<script setup lang="ts">
import 'vue-json-pretty/lib/styles.css'
import { Graph, Shape } from '@antv/x6'
import { Stencil } from '@antv/x6-plugin-stencil'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import insertCss from 'insert-css'
import type { DrawerProps } from '@/recursos/interfaces/app.interface'
import { DATA_SOURCE_TYPE_OBJ, ETL_COMPONENT, ETL_LOAD_MODE } from '@/recursos/constantes/bigdata.constant'
import DatasourceInputDrawer from '@/views/BigData/Etl/visualization/component/DatasourceInputDrawer.vue'
import DatasourceOutputDrawer from '@/views/BigData/Etl/visualization/component/DatasourceOutputDrawer.vue'
import { useRoute } from 'vue-router'
import { editEtlTaskInfo, retrieveEtlTaskInfo } from '@/api/bigData/etl/etl'
import FieldMappingDrawer from '@/views/BigData/Etl/visualization/component/FieldMappingDrawer.vue'
import FilterDrawer from '@/views/BigData/Etl/visualization/component/FilterDrawer.vue'
import CleanDrawer from '@/views/BigData/Etl/visualization/component/CleanDrawer.vue'
import ValidationDrawer from '@/views/BigData/Etl/visualization/component/validationDrawer.vue'
import { HTTP_METHOD } from '@/recursos/constantes/app.constant'
import HttpInputDrawer from '@/views/BigData/Etl/visualization/component/HttpInputDrawer.vue'
import HttpOutputDrawer from '@/views/BigData/Etl/visualization/component/HttpOutputDrawer.vue'
import CsvInputDrawer from '@/views/BigData/Etl/visualization/component/CsvInputDrawer.vue'

const route = useRoute()
let graph = null
const fileInput = ref(null); // 文件 input 组件
const submit = async() => {
	console.log("etlId", route.params.etlId)
	console.log(graph.toJSON())
	const jsonString = JSON.stringify(graph.toJSON())
	await editEtlTaskInfo({id: route.params.etlId, configuration: jsonString})
	ElMessage.success({ message: `etl修改完成！` })
}
const load = () => {
	fileInput.value.click();
}
// 读取 JSON 文件并加载到 graph
const handleFileChange = (event) => {
	const file = event.target.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = (e) => {
		try {
			const json = JSON.parse(e.target.result);
			updateGraph(json);
		} catch (error) {
			console.error("JSON 解析失败", error);
		}
	};
	reader.readAsText(file);
};
// 更新 graph
const updateGraph = (json) => {
	if (json) {
		graph.fromJSON(json);
	}
};
const exportJson = () => {
	console.log(graph.toJSON())
	// 创建 JSON 字符串
	const jsonString = JSON.stringify(graph.toJSON(), null, 2)

	// 创建 Blob 对象
	const blob = new Blob([jsonString], { type: 'application/json' })

	// 创建下载链接
	const link = document.createElement('a')
	link.href = URL.createObjectURL(blob)
	link.download = 'data.json' // 指定下载的文件名

	// 触发点击事件下载文件
	link.click()

	// 清理 URL 对象
	URL.revokeObjectURL(link.href)
	alert('导出json')
}
const handlerCellSubmit = (e: any) => {
	console.log('cell submit: ', e)
}
const drawerDatasourceInputRef = ref<any>(null)
const drawerDatasourceOutputRef = ref<any>(null)
const drawerFieldMappingRef = ref<any>(null)
const drawerFilterRef = ref<any>(null)
const drawerCleanRef = ref<any>(null)
const drawerValidationDrawer = ref<any>(null)
const drawerHttpInputDrawer = ref<any>(null)
const drawerHttpOutputDrawer = ref<any>(null)
const drawerCsvInputDrawer = ref<any>(null)
const openDrawer = (title: string, row: any) => {
	const params: DrawerProps<any> = {
		title,
		isView: title === '查看',
		row: { ...row }
	}
	if (row.type === ETL_COMPONENT.DATASOURCE_INPUT.value) {
		drawerDatasourceInputRef.value?.acceptParams(params)
	} else if (row.type === ETL_COMPONENT.DATASOURCE_OUTPUT.value){
		drawerDatasourceOutputRef.value?.acceptParams(params)
	} else if (row.type === ETL_COMPONENT.FIELD_MAPPING.value) {
		drawerFieldMappingRef.value?.acceptParams(params)
	} else if (row.type === ETL_COMPONENT.FILTER.value) {
		drawerFilterRef.value?.acceptParams(params)
	} else if (row.type === ETL_COMPONENT.CLEAN.value) {
		drawerCleanRef.value?.acceptParams(params)
	} else if (row.type === ETL_COMPONENT.VALIDATION.value) {
		drawerValidationDrawer.value?.acceptParams(params)
	} else if (row.type === ETL_COMPONENT.HTTP_INPUT.value) {
		drawerHttpInputDrawer.value?.acceptParams(params)
	} else if (row.type === ETL_COMPONENT.HTTP_OUTPUT.value) {
		drawerHttpOutputDrawer.value?.acceptParams(params)
	} else if (row.type === ETL_COMPONENT.CSV_INPUT.value) {
		drawerCsvInputDrawer.value?.acceptParams(params)
	}
}
console.log('init')
onMounted(() => {
	preWork()
	console.log('mounted')
	// 初始化画布
	graph = new Graph({
		container: document.getElementById('graph-container'),
		grid: true,
		mousewheel: {
			enabled: true,
			zoomAtMousePosition: true,
			modifiers: 'ctrl',
			minScale: 0.5,
			maxScale: 3
		},
		connecting: {
			router: 'manhattan',
			connector: {
				name: 'rounded',
				args: {
					radius: 8
				}
			},
			anchor: 'center',
			connectionPoint: 'anchor',
			allowBlank: false,
			snap: {
				radius: 20
			},
			createEdge() {
				return new Shape.Edge({
					attrs: {
						line: {
							stroke: '#A2B1C3',
							strokeWidth: 2,
							targetMarker: {
								name: 'block',
								width: 12,
								height: 8
							}
						}
					},
					zIndex: 0
				})
			},
			validateConnection({ targetMagnet }) {
				return !!targetMagnet
			}
		},
		highlighting: {
			magnetAdsorbed: {
				name: 'stroke',
				args: {
					attrs: {
						fill: '#5F95FF',
						stroke: '#5F95FF',
						strokeWidth: 3
					}
				}
			}
		}
	})

	// 使用插件
	graph
		.use(
			new Transform({
				resizing: true,
				rotating: true
			})
		)
		.use(
			new Selection({
				rubberband: true,
				showNodeSelectionBox: true
			})
		)
		.use(new Snapline())
		.use(new Keyboard())
		.use(new Clipboard())
		.use(new History())

	// 初始化 stencil
	const stencil = new Stencil({
		title: '流程设计器',
		target: graph,
		stencilGraphWidth: 250,
		stencilGraphHeight: 180,
		collapsable: true,
		groups: [
			{
				title: '输入',
				name: 'group1',
				graphHeight: 300
			},
			{
				title: '输出',
				name: 'group2',
				graphHeight: 250
			},
			{
				title: '转换',
				name: 'group3'
			},
			{
				title: '数据质量',
				name: 'group4'
			},
			{
				title: '公式计算',
				name: 'group5'
			},
			{
				title: '脚本',
				name: 'group6'
			}
		],
		layoutOptions: {
			columns: 2,
			columnWidth: 100,
			rowHeight: 55
		}
	})
	document.getElementById('stencil').appendChild(stencil.container)

	// 快捷键与事件
	graph.bindKey(['meta+c', 'ctrl+c'], () => {
		const cells = graph.getSelectedCells()
		if (cells.length) {
			graph.copy(cells)
		}
		return false
	})
	graph.bindKey(['meta+x', 'ctrl+x'], () => {
		const cells = graph.getSelectedCells()
		if (cells.length) {
			graph.cut(cells)
		}
		return false
	})
	graph.bindKey(['meta+v', 'ctrl+v'], () => {
		if (!graph.isClipboardEmpty()) {
			const cells = graph.paste({ offset: 32 })
			graph.cleanSelection()
			graph.select(cells)
		}
		return false
	})

	// undo redo
	graph.bindKey(['meta+z', 'ctrl+z'], () => {
		if (graph.canUndo()) {
			graph.undo()
		}
		return false
	})
	graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
		if (graph.canRedo()) {
			graph.redo()
		}
		return false
	})

	// select all
	graph.bindKey(['meta+a', 'ctrl+a'], () => {
		const nodes = graph.getNodes()
		if (nodes) {
			graph.select(nodes)
		}
	})

	// delete
	graph.bindKey('backspace', () => {
		const cells = graph.getSelectedCells()
		if (cells.length) {
			graph.removeCells(cells)
		}
	})

	// zoom
	graph.bindKey(['ctrl+1', 'meta+1'], () => {
		const zoom = graph.zoom()
		if (zoom < 1.5) {
			graph.zoom(0.1)
		}
	})
	graph.bindKey(['ctrl+2', 'meta+2'], () => {
		const zoom = graph.zoom()
		if (zoom > 0.5) {
			graph.zoom(-0.1)
		}
	})

	// 控制连接桩显示/隐藏
	const showPorts = (ports, show) => {
		for (let i = 0, len = ports.length; i < len; i += 1) {
			ports[i].style.visibility = show ? 'visible' : 'hidden'
		}
	}
	graph.on('node:mouseenter', () => {
		console.log('node:mouseenter')
		const container = document.getElementById('graph-container')
		const ports = container.querySelectorAll('.x6-port-body')
		showPorts(ports, true)
	})
	graph.on('node:mouseleave', () => {
		console.log('node:mouseleave')
		const container = document.getElementById('graph-container')
		const ports = container.querySelectorAll('.x6-port-body')
		showPorts(ports, false)
	})
	// 监听鼠标移入和移出连接线事件
	graph.on('edge:mouseenter', ({ edge }) => {
		edge.attr('line/stroke', '#1890FF');   // 鼠标悬停时改变颜色
		edge.attr('line/strokeWidth', 3);      // 鼠标悬停时改变线宽
	});

	graph.on('edge:mouseleave', ({ edge }) => {
		edge.attr('line/stroke', '#A2B1C3');   // 恢复默认颜色
		edge.attr('line/strokeWidth', 2);      // 恢复默认线宽
	});

	graph.on('node:click', ({ node, e }) => {
		console.log('node:click', node, e)
		console.log('node:click data: ', node.data)
		let data = {};
		data = node.data;
		data.id = node.id
		openDrawer(node.label, node.data)
	})

	// 初始化图形
	const ports = {
		groups: {
			top: {
				position: 'top',
				attrs: {
					circle: {
						r: 4,
						magnet: true,
						stroke: '#5F95FF',
						strokeWidth: 1,
						fill: '#fff',
						style: {
							visibility: 'hidden'
						}
					}
				}
			},
			right: {
				position: 'right',
				attrs: {
					circle: {
						r: 4,
						magnet: true,
						stroke: '#5F95FF',
						strokeWidth: 1,
						fill: '#fff',
						style: {
							visibility: 'hidden'
						}
					}
				}
			},
			bottom: {
				position: 'bottom',
				attrs: {
					circle: {
						r: 4,
						magnet: true,
						stroke: '#5F95FF',
						strokeWidth: 1,
						fill: '#fff',
						style: {
							visibility: 'hidden'
						}
					}
				}
			},
			left: {
				position: 'left',
				attrs: {
					circle: {
						r: 4,
						magnet: true,
						stroke: '#5F95FF',
						strokeWidth: 1,
						fill: '#fff',
						style: {
							visibility: 'hidden'
						}
					}
				}
			}
		},
		items: [
			{
				group: 'top'
			},
			{
				group: 'right'
			},
			{
				group: 'bottom'
			},
			{
				group: 'left'
			}
		]
	}

	Graph.registerNode(
		'custom-rect',
		{
			inherit: 'rect',
			width: 66,
			height: 36,
			attrs: {
				body: {
					strokeWidth: 1,
					stroke: '#5F95FF',
					fill: '#EFF4FF'
				},
				text: {
					fontSize: 12,
					fill: '#262626'
				}
			},
			ports: { ...ports }
		},
		true
	)

	Graph.registerNode(
		'custom-polygon',
		{
			inherit: 'polygon',
			width: 66,
			height: 36,
			attrs: {
				body: {
					strokeWidth: 1,
					stroke: '#5F95FF',
					fill: '#EFF4FF'
				},
				text: {
					fontSize: 12,
					fill: '#262626'
				}
			},
			ports: {
				...ports,
				items: [
					{
						group: 'top'
					},
					{
						group: 'bottom'
					}
				]
			}
		},
		true
	)

	Graph.registerNode(
		'custom-circle',
		{
			inherit: 'circle',
			width: 45,
			height: 45,
			attrs: {
				body: {
					strokeWidth: 1,
					stroke: '#5F95FF',
					fill: '#EFF4FF'
				},
				text: {
					fontSize: 12,
					fill: '#262626'
				}
			},
			ports: { ...ports }
		},
		true
	)

	Graph.registerNode(
		'custom-image',
		{
			inherit: 'rect',
			width: 52,
			height: 52,
			markup: [
				{
					tagName: 'rect',
					selector: 'body'
				},
				{
					tagName: 'image'
				},
				{
					tagName: 'text',
					selector: 'label'
				}
			],
			attrs: {
				body: {
					stroke: '#5F95FF',
					fill: '#5F95FF'
				},
				image: {
					width: 26,
					height: 26,
					refX: 13,
					refY: 16
				},
				label: {
					refX: 3,
					refY: 2,
					textAnchor: 'left',
					textVerticalAnchor: 'top',
					fontSize: 12,
					fill: '#fff'
				}
			},
			ports: { ...ports }
		},
		true
	)

	const datasourceInput = graph.createNode({
		shape: 'custom-rect',
		label: '数据源查询',
		width: 90,
		height: 30,
		data: {
			source: {
				resourceId: '',
				type: 'UNKNOWN',
				sql: '',
				name: '',
				columns: '',
				description: '数据源查询'
			},
			id: '',
			type: ETL_COMPONENT.DATASOURCE_INPUT.value,
		},
		tools: [
			{
				name: 'button-remove',
				args: { x: 5, y: 2 }
			}
		],
		attrs: {
			body: {
				fill: '#fff', // 纯白色背景
				stroke: '#5F95FF', // 细边框
				strokeWidth: 1,
				filter: {
					name: 'dropShadow',
					args: { dx: 3, dy: 3, blur: 8, color: 'rgba(0, 0, 0, 0.2)' } // 阴影
				},
				style: {
					transition: 'all 0.3s ease-in-out' // 动画效果
				}
			},
			label: {
				text: '🛢️数据源查询',
				fill: '#666', // 文字颜色
				fontSize: 12, // 字体大小
				fontWeight: '600', // 半粗体
				textAnchor: 'middle',
				refX: '50%',
				refY: '50%',
				opacity: 0.9 // 文字透明度
			}
		}
	})
	const csvInput = graph.createNode({
		shape: 'custom-rect',
		label: ETL_COMPONENT.CSV_INPUT.label,
		width: 90,
		height: 30,
		data: {
			csvConfig: {
				filePath: '',
				hasHeader: false,
				columnNames: [],
				delimiter: '',
				encoding: '',
				linesToSkip: 0,
				description: ETL_COMPONENT.CSV_INPUT.label,
			},
			id: '',
			type: ETL_COMPONENT.CSV_INPUT.value
		},
		tools: [
			{
				name: 'button-remove',
				args: { x: 5, y: 2 }
			}
		],
		attrs: {
			body: {
				fill: '#fff', // 纯白色背景
				stroke: '#5F95FF', // 细边框
				strokeWidth: 1,
				filter: {
					name: 'dropShadow',
					args: { dx: 3, dy: 3, blur: 8, color: 'rgba(0, 0, 0, 0.2)' } // 阴影
				},
				style: {
					transition: 'all 0.3s ease-in-out' // 动画效果
				}
			},
			label: {
				text: '📄'+ ETL_COMPONENT.CSV_INPUT.label,
				fill: '#666', // 文字颜色
				fontSize: 12, // 字体大小
				fontWeight: '600', // 半粗体
				textAnchor: 'middle',
				refX: '50%',
				refY: '50%',
				opacity: 0.9 // 文字透明度
			}
		}
	})
	const httpInput = graph.createNode({
		shape: 'custom-rect',
		label: 'http',
		width: 90,
		height: 30,
		data: {
			httpConfig: {
				url: '',
				method: 'POST',
				headers: {},
				queryParams: {},
				requestBody: '',
				description: ETL_COMPONENT.HTTP_INPUT.label
			},
			id: '',
			type: ETL_COMPONENT.HTTP_INPUT.value,
		},
		tools: [
			{
				name: 'button-remove',
				args: { x: 5, y: 2 }
			}
		],
		attrs: {
			body: {
				fill: '#fff', // 纯白色背景
				stroke: '#5F95FF', // 细边框
				strokeWidth: 1,
				filter: {
					name: 'dropShadow',
					args: { dx: 3, dy: 3, blur: 8, color: 'rgba(0, 0, 0, 0.2)' } // 阴影
				},
				style: {
					transition: 'all 0.3s ease-in-out' // 动画效果
				}
			},
			label: {
				text: '📄'+ETL_COMPONENT.HTTP_INPUT.label,
				fill: '#666', // 文字颜色
				fontSize: 12, // 字体大小
				fontWeight: '600', // 半粗体
				textAnchor: 'middle',
				refX: '50%',
				refY: '50%',
				opacity: 0.9 // 文字透明度
			}
		}
	})
	// const excelInput = graph.createNode({
	// 	shape: 'custom-rect',
	// 	label: 'excel 输入'
	// })
	// const csvInput = graph.createNode({
	// 	shape: 'custom-rect',
	// 	label: 'csv 输入'
	// })
	// const apiInput = graph.createNode({
	// 	shape: 'custom-rect',
	// 	label: 'http api'
	// })
	// const mqttClientInput = graph.createNode({
	// 	shape: 'custom-rect',
	// 	label: 'mqtt client'
	// })
	// const mqttServerInput = graph.createNode({
	// 	shape: 'custom-rect',
	// 	label: 'mqtt server'
	// })
	// const tcpServerInput = graph.createNode({
	// 	shape: 'custom-rect',
	// 	label: 'tcp server'
	// })
	// const tcpClientInput = graph.createNode({
	// 	shape: 'custom-rect',
	// 	label: 'tcp client'
	// })
	// stencil.load([datasourceInput, csvInput, excelInput, csvInput, apiInput, mqttServerInput, mqttClientInput, tcpServerInput, tcpClientInput], 'group1')
	stencil.load([datasourceInput, csvInput, httpInput], 'group1')

	const datasourceOutput = graph.createNode({
		shape: 'custom-rect',
		label: '数据源输出',
		width: 90,
		height: 30,
		data: {
			target: {
				resourceId: '',
				type: 'UNKNOWN',
				name: '',
				mode: ETL_LOAD_MODE[0].value,
				expands: {},
				description: '数据源输出'
			},
			id: '',
			type: ETL_COMPONENT.DATASOURCE_OUTPUT.value,
		},
		tools: [
			{
				name: 'button-remove',
				args: { x: 5, y: 2 }
			}
		],
		attrs: {
			body: {
				fill: '#fff', // 纯白色背景
				stroke: '#52C41A', // 细边框
				strokeWidth: 1,
				filter: {
					name: 'dropShadow',
					args: { dx: 3, dy: 3, blur: 8, color: 'rgba(0, 0, 0, 0.2)' } // 阴影
				},
				style: {
					transition: 'all 0.3s ease-in-out' // 动画效果
				}
			},
			label: {
				text: '🛢️数据源输出',
				fill: '#666', // 文字颜色
				fontSize: 12, // 字体大小
				fontWeight: '600', // 半粗体
				textAnchor: 'middle',
				refX: '50%',
				refY: '50%',
				opacity: 0.9 // 文字透明度
			}
		}
	})
	const httpOutput = graph.createNode({
		shape: 'custom-rect',
		label: ETL_COMPONENT.HTTP_OUTPUT.label,
		width: 90,
		height: 30,
		data: {
			httpConfig: {
				url: '',
				method: HTTP_METHOD[0].value,
				headers: {},
				queryParams: {},
				description: ETL_COMPONENT.HTTP_OUTPUT.label
			},
			id: '',
			type: ETL_COMPONENT.HTTP_OUTPUT.value,
		},
		tools: [
			{
				name: 'button-remove',
				args: { x: 5, y: 2 }
			}
		],
		attrs: {
			body: {
				fill: '#fff', // 纯白色背景
				stroke: '#52C41A', // 细边框
				strokeWidth: 1,
				filter: {
					name: 'dropShadow',
					args: { dx: 3, dy: 3, blur: 8, color: 'rgba(0, 0, 0, 0.2)' } // 阴影
				},
				style: {
					transition: 'all 0.3s ease-in-out' // 动画效果
				}
			},
			label: {
				text: '' + ETL_COMPONENT.HTTP_OUTPUT.label,
				fill: '#666', // 文字颜色
				fontSize: 12, // 字体大小
				fontWeight: '600', // 半粗体
				textAnchor: 'middle',
				refX: '50%',
				refY: '50%',
				opacity: 0.9 // 文字透明度
			}
		}
	})
	stencil.load([datasourceOutput, httpOutput], 'group2')

	const fieldMappingProcess = graph.createNode({
		shape: 'custom-rect',
		label:  ETL_COMPONENT.FIELD_MAPPING.label,
		width: 90,
		height: 30,
		data: {
			description: ETL_COMPONENT.FIELD_MAPPING.label,
			mapping: {},
			type: ETL_COMPONENT.FIELD_MAPPING.value,
			id: ''
		},
		tools: [
			{
				name: 'button-remove',
				args: { x: 5, y: 2 }
			}
		],
		attrs: {
			body: {
				fill: '#fff', // 纯白色背景
				stroke: '#ddd', // 细边框
				strokeWidth: 1,
				filter: {
					name: 'dropShadow',
					args: { dx: 3, dy: 3, blur: 8, color: 'rgba(0, 0, 0, 0.2)' } // 阴影
				},
				style: {
					transition: 'all 0.3s ease-in-out' // 动画效果
				}
			},
			label: {
				text: '映射值',
				fill: '#666', // 文字颜色
				fontSize: 12, // 字体大小
				fontWeight: '600', // 半粗体
				textAnchor: 'middle',
				refX: '50%',
				refY: '50%',
				opacity: 0.9 // 文字透明度
			}
		}
	})
	const filterProcess = graph.createNode({
		shape: 'custom-rect',
		label: '数据过滤',
		width: 90,
		height: 30,
		data: {
			description: '数据过滤',
			filterRules: [],
			id: '',
			type: ETL_COMPONENT.FILTER.value
		},
		tools: [
			{
				name: 'button-remove',
				args: { x: 5, y: 2 }
			}
		],
		attrs: {
			body: {
				fill: '#fff', // 纯白色背景
				stroke: '#ddd', // 细边框
				strokeWidth: 1,
				filter: {
					name: 'dropShadow',
					args: { dx: 3, dy: 3, blur: 8, color: 'rgba(0, 0, 0, 0.2)' } // 阴影
				},
				style: {
					transition: 'all 0.3s ease-in-out' // 动画效果
				}
			},
			label: {
				text: '数据过滤',
				fill: '#666', // 文字颜色
				fontSize: 12, // 字体大小
				fontWeight: '600', // 半粗体
				textAnchor: 'middle',
				refX: '50%',
				refY: '50%',
				opacity: 0.9 // 文字透明度
			}
		}
	})
	const cleanProcess = graph.createNode({
		shape: 'custom-rect',
		label: ETL_COMPONENT.CLEAN.label,
		width: 90,
		height: 30,
		data: {
			description: ETL_COMPONENT.CLEAN.label,
			cleanRules: [],
			id: '',
			type: ETL_COMPONENT.CLEAN.value
		},
		tools: [
			{
				name: 'button-remove',
				args: { x: 5, y: 2 }
			}
		],
		attrs: {
			body: {
				fill: '#fff', // 纯白色背景
				stroke: '#ddd', // 细边框
				strokeWidth: 1,
				filter: {
					name: 'dropShadow',
					args: { dx: 3, dy: 3, blur: 8, color: 'rgba(0, 0, 0, 0.2)' } // 阴影
				},
				style: {
					transition: 'all 0.3s ease-in-out' // 动画效果
				}
			},
			label: {
				text: ETL_COMPONENT.CLEAN.label,
				fill: '#666', // 文字颜色
				fontSize: 12, // 字体大小
				fontWeight: '600', // 半粗体
				textAnchor: 'middle',
				refX: '50%',
				refY: '50%',
				opacity: 0.9 // 文字透明度
			}
		}
	})
	// const rowColumn = graph.createNode({
	// 	shape: 'custom-rect',
	// 	label: '行列转换'
	// })
	// const columnRow = graph.createNode({
	// 	shape: 'custom-rect',
	// 	label: '列行转换'
	// })
	stencil.load([fieldMappingProcess, filterProcess, cleanProcess], 'group3')
	const validationProcess = graph.createNode({
		shape: 'custom-rect',
		label: ETL_COMPONENT.VALIDATION.label,
		width: 90,
		height: 30,
		data: {
			description: ETL_COMPONENT.VALIDATION.label,
			validationRules: [],
			id: '',
			type: ETL_COMPONENT.VALIDATION.value
		},
		tools: [
			{
				name: 'button-remove',
				args: { x: 5, y: 2 }
			}
		],
		attrs: {
			body: {
				fill: '#fff', // 纯白色背景
				stroke: '#ddd', // 细边框
				strokeWidth: 1,
				filter: {
					name: 'dropShadow',
					args: { dx: 3, dy: 3, blur: 8, color: 'rgba(0, 0, 0, 0.2)' } // 阴影
				},
				style: {
					transition: 'all 0.3s ease-in-out' // 动画效果
				}
			},
			label: {
				text: ETL_COMPONENT.VALIDATION.label,
				fill: '#666', // 文字颜色
				fontSize: 12, // 字体大小
				fontWeight: '600', // 半粗体
				textAnchor: 'middle',
				refX: '50%',
				refY: '50%',
				opacity: 0.9 // 文字透明度
			}
		}
	})
	stencil.load([validationProcess], 'group4')
	nextTick(async () => {
		let json = await getEtlDetail()
		updateGraph(json)
	}).then()
})
const getEtlDetail = async() => {
	let detail = await retrieveEtlTaskInfo(route.params.etlId);
	return JSON.parse(detail.configuration);
}

const preWork = () => {
	const container = document.getElementById('container')
	const stencilContainer = document.createElement('div')
	stencilContainer.id = 'stencil'
	const graphContainer = document.createElement('div')
	graphContainer.id = 'graph-container'
	container.appendChild(stencilContainer)
	container.appendChild(graphContainer)

	insertCss(`
        #container {
          display: flex;
          border: 1px solid #dfe3e8;
        }
        #stencil {
          width: 250px;
          height: 100%;
          position: relative;
          border-right: 1px solid #dfe3e8;
        }
        #graph-container {
          width: calc(100% - 250px);
          height: 100%;
        }
        .x6-widget-stencil  {
          background-color: #fff;
        }
        .x6-widget-stencil-title {
          background-color: #fff;
        }
        .x6-widget-stencil-group-title {
          background-color: #fff !important;
        }
        .x6-widget-transform {
          margin: -1px 0 0 -1px;
          padding: 0px;
          border: 1px solid #239edd;
        }
        .x6-widget-transform > div {
          border: 1px solid #239edd;
        }
        .x6-widget-transform > div:hover {
          background-color: #3dafe4;
        }
        .x6-widget-transform-active-handle {
          background-color: #3dafe4;
        }
        .x6-widget-transform-resize {
          border-radius: 0;
        }
        .x6-widget-selection-inner {
          border: 1px solid #239edd;
        }
        .x6-widget-selection-box {
          opacity: 0;
        }
      `)
}


</script>

<template>
	<div>
		<div class="header">
			<div id="title">etl设计器</div>
			<div id="submit">
				<el-button @click="load">加载json</el-button>
				<el-button @click="submit">保存</el-button>
				<el-button @click="exportJson">导出json</el-button>
			</div>
			<!-- 隐藏的文件选择框 -->
			<input
				type="file"
				ref="fileInput"
				style="display: none"
				@change="handleFileChange"
				accept=".json"
			/>
		</div>
		<div id="container">
			<DatasourceInputDrawer ref="drawerDatasourceInputRef" @submit="handlerCellSubmit"></DatasourceInputDrawer>
			<DatasourceOutputDrawer ref="drawerDatasourceOutputRef" @submit="handlerCellSubmit"></DatasourceOutputDrawer>
			<FieldMappingDrawer ref="drawerFieldMappingRef" @submit="handlerCellSubmit"></FieldMappingDrawer>
			<FilterDrawer ref="drawerFilterRef" @submit="handlerCellSubmit"></FilterDrawer>
			<CleanDrawer ref="drawerCleanRef" @submit="handlerCellSubmit"></CleanDrawer>
			<ValidationDrawer ref="drawerValidationDrawer" @submit="handlerCellSubmit"></ValidationDrawer>
			<HttpInputDrawer ref="drawerHttpInputDrawer" @submit="handlerCellSubmit"></HttpInputDrawer>
			<HttpOutputDrawer ref="drawerHttpOutputDrawer" @submit="handlerCellSubmit"></HttpOutputDrawer>
			<CsvInputDrawer ref="drawerCsvInputDrawer" @submit="handlerCellSubmit"></CsvInputDrawer>
		</div>
	</div>
</template>

<style scoped lang="scss">
#container {
	width: 100%;
	height: 800px;
}

.header {
	display: flex;
	justify-items: center;
	justify-content: space-between;
	padding: 10px;
}

.header #title {
	font-weight: bold;
}
</style>
