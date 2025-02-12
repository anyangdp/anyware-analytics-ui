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

let graph = null;
const submit = () => {
	alert("提交");

}
const load = () => {
	graph.fromJSON([
		{
			"shape": "edge",
			"attrs": {
				"line": {
					"stroke": "#A2B1C3",
					"targetMarker": {
						"name": "block",
						"width": 12,
						"height": 8
					}
				}
			},
			"id": "c3e50499-1a54-4168-a0f7-e5b64ee24816",
			"zIndex": 0,
			"source": {
				"cell": "3703a24b-e30b-4095-a189-b877c36ecd4e",
				"port": "e865973a-2d6e-4ee7-ba79-70f9449e56e1"
			},
			"target": {
				"cell": "9b291606-7ddb-4112-b4fc-b17d82629077",
				"port": "237bed3e-c27d-4c47-a67f-36edb584e341"
			}
		},
		{
			"shape": "edge",
			"attrs": {
				"line": {
					"stroke": "#A2B1C3",
					"targetMarker": {
						"name": "block",
						"width": 12,
						"height": 8
					}
				}
			},
			"id": "d0ab0d6a-095d-48fa-b302-e142595ace51",
			"zIndex": 0,
			"source": {
				"cell": "9b291606-7ddb-4112-b4fc-b17d82629077",
				"port": "558854ce-7425-4515-abfd-24583fc33e92"
			},
			"target": {
				"cell": "dd86aa26-43b5-4754-8ff4-7db32948d66e",
				"port": "866d4f60-79d5-4973-97b3-6ed2aff91079"
			}
		},
		{
			"position": {
				"x": 320,
				"y": 180
			},
			"size": {
				"width": 66,
				"height": 36
			},
			"attrs": {
				"text": {
					"text": "mysql"
				}
			},
			"visible": true,
			"shape": "custom-rect",
			"ports": {
				"groups": {
					"top": {
						"position": "top",
						"attrs": {
							"circle": {
								"r": 4,
								"magnet": true,
								"stroke": "#5F95FF",
								"strokeWidth": 1,
								"fill": "#fff",
								"style": {
									"visibility": "hidden"
								}
							}
						}
					},
					"right": {
						"position": "right",
						"attrs": {
							"circle": {
								"r": 4,
								"magnet": true,
								"stroke": "#5F95FF",
								"strokeWidth": 1,
								"fill": "#fff",
								"style": {
									"visibility": "hidden"
								}
							}
						}
					},
					"bottom": {
						"position": "bottom",
						"attrs": {
							"circle": {
								"r": 4,
								"magnet": true,
								"stroke": "#5F95FF",
								"strokeWidth": 1,
								"fill": "#fff",
								"style": {
									"visibility": "hidden"
								}
							}
						}
					},
					"left": {
						"position": "left",
						"attrs": {
							"circle": {
								"r": 4,
								"magnet": true,
								"stroke": "#5F95FF",
								"strokeWidth": 1,
								"fill": "#fff",
								"style": {
									"visibility": "hidden"
								}
							}
						}
					}
				},
				"items": [
					{
						"group": "top",
						"id": "a9eedcaf-4dae-4b86-a875-309544eb8cb0"
					},
					{
						"group": "right",
						"id": "c6b64747-f802-465c-ad97-4cc0b712135e"
					},
					{
						"group": "bottom",
						"id": "e865973a-2d6e-4ee7-ba79-70f9449e56e1"
					},
					{
						"group": "left",
						"id": "dbf74d09-bc90-44ef-af46-4fbf43c46b29"
					}
				]
			},
			"id": "3703a24b-e30b-4095-a189-b877c36ecd4e",
			"zIndex": 1
		},
		{
			"position": {
				"x": 318,
				"y": 276
			},
			"size": {
				"width": 70,
				"height": 40
			},
			"attrs": {
				"text": {
					"text": "映射值"
				}
			},
			"visible": true,
			"shape": "custom-rect",
			"ports": {
				"groups": {
					"top": {
						"position": "top",
						"attrs": {
							"circle": {
								"r": 4,
								"magnet": true,
								"stroke": "#5F95FF",
								"strokeWidth": 1,
								"fill": "#fff",
								"style": {
									"visibility": "hidden"
								}
							}
						}
					},
					"right": {
						"position": "right",
						"attrs": {
							"circle": {
								"r": 4,
								"magnet": true,
								"stroke": "#5F95FF",
								"strokeWidth": 1,
								"fill": "#fff",
								"style": {
									"visibility": "hidden"
								}
							}
						}
					},
					"bottom": {
						"position": "bottom",
						"attrs": {
							"circle": {
								"r": 4,
								"magnet": true,
								"stroke": "#5F95FF",
								"strokeWidth": 1,
								"fill": "#fff",
								"style": {
									"visibility": "hidden"
								}
							}
						}
					},
					"left": {
						"position": "left",
						"attrs": {
							"circle": {
								"r": 4,
								"magnet": true,
								"stroke": "#5F95FF",
								"strokeWidth": 1,
								"fill": "#fff",
								"style": {
									"visibility": "hidden"
								}
							}
						}
					}
				},
				"items": [
					{
						"group": "top",
						"id": "237bed3e-c27d-4c47-a67f-36edb584e341"
					},
					{
						"group": "right",
						"id": "d13097c1-acd0-4869-8cc2-becdf84cf2dd"
					},
					{
						"group": "bottom",
						"id": "558854ce-7425-4515-abfd-24583fc33e92"
					},
					{
						"group": "left",
						"id": "1675b774-882c-4c9a-8d59-56dab3f395e8"
					}
				]
			},
			"id": "9b291606-7ddb-4112-b4fc-b17d82629077",
			"zIndex": 2
		},
		{
			"position": {
				"x": 320,
				"y": 368
			},
			"size": {
				"width": 66,
				"height": 36
			},
			"attrs": {
				"text": {
					"text": "mysql"
				}
			},
			"visible": true,
			"shape": "custom-rect",
			"ports": {
				"groups": {
					"top": {
						"position": "top",
						"attrs": {
							"circle": {
								"r": 4,
								"magnet": true,
								"stroke": "#5F95FF",
								"strokeWidth": 1,
								"fill": "#fff",
								"style": {
									"visibility": "hidden"
								}
							}
						}
					},
					"right": {
						"position": "right",
						"attrs": {
							"circle": {
								"r": 4,
								"magnet": true,
								"stroke": "#5F95FF",
								"strokeWidth": 1,
								"fill": "#fff",
								"style": {
									"visibility": "hidden"
								}
							}
						}
					},
					"bottom": {
						"position": "bottom",
						"attrs": {
							"circle": {
								"r": 4,
								"magnet": true,
								"stroke": "#5F95FF",
								"strokeWidth": 1,
								"fill": "#fff",
								"style": {
									"visibility": "hidden"
								}
							}
						}
					},
					"left": {
						"position": "left",
						"attrs": {
							"circle": {
								"r": 4,
								"magnet": true,
								"stroke": "#5F95FF",
								"strokeWidth": 1,
								"fill": "#fff",
								"style": {
									"visibility": "hidden"
								}
							}
						}
					}
				},
				"items": [
					{
						"group": "top",
						"id": "866d4f60-79d5-4973-97b3-6ed2aff91079"
					},
					{
						"group": "right",
						"id": "fde5b563-9fa4-4637-aa36-8af2fd4f1257"
					},
					{
						"group": "bottom",
						"id": "c6775c0a-8769-41b0-bbc8-e3569977e936"
					},
					{
						"group": "left",
						"id": "a6d9640e-c80e-45cb-b482-f59b08feee37"
					}
				]
			},
			"id": "dd86aa26-43b5-4754-8ff4-7db32948d66e",
			"zIndex": 3
		}
	]);
}
const exportJson = () => {
	console.log(graph.toJSON());
	alert("导出json")
}
console.log("init")
onMounted(() => {
	preWork()
	console.log("mounted")
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
						stroke: '#5F95FF'
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
		stencilGraphWidth: 200,
		stencilGraphHeight: 180,
		collapsable: true,
		groups: [
			{
				title: '输入',
				name: 'group1',
				graphHeight: 300,
			},
			{
				title: '输出',
				name: 'group2',
				graphHeight: 300,
				layoutOptions: {
					rowHeight: 70
				}
			},
			{
				title: '转换',
				name: 'group3'
			},
			{
				title: '流程',
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
			columnWidth: 80,
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
		const container = document.getElementById('graph-container')
		const ports = container.querySelectorAll('.x6-port-body')
		showPorts(ports, true)
	})
	graph.on('node:mouseleave', () => {
		const container = document.getElementById('graph-container')
		const ports = container.querySelectorAll('.x6-port-body')
		showPorts(ports, false)
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

	const mysqlInput = graph.createNode({
		shape: 'custom-rect',
		label: 'mysql',
	})
	const postgresqlInput = graph.createNode({
		shape: 'custom-rect',
		label: 'postgresql'
	})
	const excelInput = graph.createNode({
		shape: 'custom-rect',
		label: 'excel 输入'
	})
	const csvInput = graph.createNode({
		shape: 'custom-rect',
		label: 'csv 输入'
	})
	const apiInput = graph.createNode({
		shape: 'custom-rect',
		label: 'http api'
	})
	const mqttClientInput = graph.createNode({
		shape: 'custom-rect',
		label: 'mqtt client'
	})
	const mqttServerInput = graph.createNode({
		shape: 'custom-rect',
		label: 'mqtt server'
	})
	const tcpServerInput = graph.createNode({
		shape: 'custom-rect',
		label: 'tcp server'
	})
	const tcpClientInput = graph.createNode({
		shape: 'custom-rect',
		label: 'tcp client'
	})
	stencil.load([mysqlInput, postgresqlInput, excelInput, csvInput, apiInput, mqttServerInput, mqttClientInput, tcpServerInput, tcpClientInput], 'group1')

	const imageShapes = [
		{
			label: 'mysql',
		},
		{
			label: 'postgresql',
		},
		{
			label: 'csv 写入',
		},
		{
			label: 'http api',
		},
		{
			label: 'mqtt server',
		},
		{
			label: 'mqtt client',
		},
		{
			label: 'tcp server'
		},
		{
			label: 'tcp client'
		}
	]
	const imageNodes = imageShapes.map((item) =>
		graph.createNode({
			shape: 'custom-rect',
			label: item.label
		})
	)
	stencil.load(imageNodes, 'group2')

	const keyValueMapping = graph.createNode({
		shape: 'custom-rect',
		label: '映射值'
	})
	const rowColumn = graph.createNode({
		shape: 'custom-rect',
		label: '行列转换'
	});
	const columnRow = graph.createNode({
		shape: 'custom-rect',
		label: '列行转换'
	});
	stencil.load([keyValueMapping, rowColumn], 'group3')
})

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
          width: 200px;
          height: 100%;
          position: relative;
          border-right: 1px solid #dfe3e8;
        }
        #graph-container {
          width: calc(100% - 200px);
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
			<div id="submit"><el-button @click="load">加载json</el-button><el-button @click="submit">保存</el-button><el-button @click="exportJson">导出json</el-button></div>
		</div>
		<div id="container">
		</div>
	</div>
</template>

<style scoped lang="scss">
#container {
	width: 100%;
	height: 800px;
}
.header{
	display: flex;
	justify-items: center;
	justify-content: space-between;
	padding: 10px;
}
.header #title{
	font-weight: bold;
}
</style>
