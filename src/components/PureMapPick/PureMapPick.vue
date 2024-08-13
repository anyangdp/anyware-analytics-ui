<script setup lang="ts">
import { toNumber, toString } from 'lodash'
import type { MapPickPoint } from '@/components/PureMapPick/interfaces/pureMapPick.interface'
import { usePointGeocoder, useAddressGeocoder, type PointGeocoderResult, type Point } from 'vue3-baidu-map-gl'

/**
 * @description 使用解析坐标点
 */
const { get, result } = usePointGeocoder<PointGeocoderResult>()

/**
 * @description 使用解析地址
 */
const addressGeocoder = useAddressGeocoder<Point>()

/**
 * @description 定义点信息
 */
let point = ref({ lng: 0, lat: 0 })
let markerPoint = point

/**
 * @description 定义变量内容
 */
let state = reactive({
	isShowDialog: false
})

/**
 * @description 定义页面参数
 */
let addressInfo = reactive<MapPickPoint>({
	longitude: '',
	latitude: '',
	address: ''
})

/**
 * @description 定义事件传递
 */
const emits = defineEmits(['mapPick'])

/**
 * @description 地图点位初始化
 */
const handleInit = ({ map, BMapGL }: any) => {
	get(point.value)

	// 绑定输入框模态查询事件
	let ac = new BMapGL.Autocomplete({
		input: 'suggestId',
		location: map.value
	})

	// 监听模态查询点击确认事件
	ac.addEventListener('onconfirm', function (e: { item: { value: any } }) {
		//鼠标点击下拉列表后的事件
		let _value = e.item.value
		let myValue = _value.province + _value.city + _value.district + _value.street + _value.business

		// 根据地址解析经纬度
		addressGeocoder.get(myValue, _value.city)

		setTimeout(() => {
			point.value.lat = addressGeocoder.point.value?.lat ?? 0
			point.value.lng = addressGeocoder.point.value?.lng ?? 0
			get(point.value)

			addressInfo.address = myValue
			addressInfo.longitude = toString(point.value.lng)
			addressInfo.latitude = toString(point.value.lat)
		}, 200)
	})

	// 初始化搜索框值
	setTimeout(() => {
		addressInfo.address = result.value?.address + '' + (result.value?.surroundingPois[0]?.title || '')
	}, 500)
}

/**
 * @description 地图点击事件
 */
const handleClick = (e: any) => {
	markerPoint.value = e.latlng
	get(e.latlng)

	setTimeout(() => {
		addressInfo.address = result.value?.address + '' + (result.value?.surroundingPois[0]?.title || '')
		addressInfo.longitude = toString(result.value?.point.lng)
		addressInfo.latitude = toString(result.value?.point.lat)
	}, 200)
}

/**
 * @description打开弹窗
 */
const openDialog = (lng: string, lat: string) => {
	state.isShowDialog = true
	point.value.lat = toNumber(lat)
	point.value.lng = toNumber(lng)
	addressInfo.longitude = lng
	addressInfo.latitude = lat
}

/**
 * @description 确认选中坐标点
 */
const onSubmit = async () => {
	emits('mapPick', { longitude: addressInfo.longitude, latitude: addressInfo.latitude })
	closeDialog()
}

/**
 * @description 关闭弹窗
 */
const closeDialog = () => {
	state.isShowDialog = false
}

/**
 * @description 取消
 */
const onCancel = () => {
	closeDialog()
}

/**
 * @description 暴露打开弹框方法
 */
defineExpose({
	openDialog
})
</script>

<template>
	<el-dialog v-model="state.isShowDialog" width="1200px" :before-close="onCancel">
		<template #header>
			<div>
				<pure-icon name="pi-carbon:edit" style="display: inline-block; vertical-align: center"></pure-icon>
				<span>地图经纬度采集</span>
			</div>
		</template>
		<div>
			<el-form label-width="80px" style="margin-bottom: 10px !important">
				<el-row>
					<el-col :span="10">
						<el-form-item label="当前地点">
							<el-input size="small" type="text" id="suggestId" v-model="addressInfo.address" placeholder="请输入地点" />
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="位置经度">
							<el-input size="small" type="text" v-model="addressInfo.longitude" readonly />
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="位置纬度">
							<el-input size="small" type="text" v-model="addressInfo.latitude" readonly />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="map-wrapper">
			<BMap
				enableScrollWheelZoom
				:center="{ lng: 119.901264, lat: 31.816905 }"
				mapStyleId="ee66c61531e8df3c2fd0374e96e58e81"
				@initd="handleInit"
				@click="handleClick"
			>
				<BMarker :position="point"></BMarker>
				<BLabel
					style="color: #333; font-size: 9px"
					:position="result?.point"
					:content="`地址: ${result?.address} 所属商圈:${result?.business} 最匹配地点: ${result?.surroundingPois[0]?.title || '无'}`"
				/>
			</BMap>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="onCancel">取 消</el-button>
				<el-button type="primary" @click="onSubmit">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<style lang="scss">
.tangram-suggestion-main {
	z-index: 99999999;
}
</style>
