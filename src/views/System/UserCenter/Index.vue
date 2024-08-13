<script setup lang="ts">
import { sm2 } from 'sm-crypto-v2'
import { useIcon } from '@/hooks/useIcon'
import { useRoute, useRouter } from 'vue-router'
import { uploadAvatar } from '@/api/system/file'
import { useUserStore } from '@/stores/modules/user'
import { useHandleData } from '@/hooks/useHandleData'
import { LOGIN_URL } from '@/recursos/constantes/app.constant'
import PureCropper from '@/components/PureCropper/PureCropper.vue'
import { changePwd, editUser, getCurrentUserInfo } from '@/api/system/user'
import type { UploadAvatarRes } from '@/api/system/interfaces/file.interface'
import type { ChangePwdReq, UserInfoRes } from '@/api/system/interfaces/user.interface'

const route = useRoute()
const router = useRouter()
const stores = useUserStore()
const ruleFormPasswordRef = ref()
const { userInfo } = storeToRefs(stores)
const cropperDialogRef = ref<InstanceType<typeof PureCropper>>()
const checkmarkIcon = useIcon({ name: 'pi-carbon:checkmark-filled' })

/**
 * @description 基础数据
 */
const state = reactive({
	loading: false,
	avatarLoading: false,
	signDialogVisible: false,
	ruleFormBase: {} as UserInfoRes,
	ruleFormPassword: {} as ChangePwdReq,
	passwordNew2: '',
	cropperTitle: ''
})

/**
 * @description 页面初始化
 */
onMounted(async () => {
	state.loading = true
	let res = await getCurrentUserInfo()
	state.ruleFormBase = res.result ?? { account: '' }
	state.loading = false
})

/**
 * @description 密码验证
 */
const validatePassword = (_rule: any, value: any, callback: any) => {
	if (state.passwordNew2 != state.ruleFormPassword.passwordNew) {
		callback(new Error('两次密码不一致！'))
	} else {
		callback()
	}
}

/**
 * @description 打开裁剪弹窗
 */
const openCropperDialog = () => {
	state.cropperTitle = '更换头像'
	cropperDialogRef.value?.openDialog(userInfo.value?.avatar!)
}

/**
 * @description 鼠标进入头像时
 */
const mouseEnterAvatar = () => {
	state.avatarLoading = true
}

/**
 * @description 鼠标离开头像时
 */
const mouseLeaveAvatar = () => {
	state.avatarLoading = false
}

/**
 * @description 保存基本信息
 */
const submitUserBase = async () => {
	await useHandleData(editUser, state.ruleFormBase, `修改【${state.ruleFormBase.realName}】信息`)
}

/**
 * @description 密码重置
 */
const resetPassword = () => {
	state.ruleFormPassword.passwordOld = ''
	state.ruleFormPassword.passwordNew = ''
	state.passwordNew2 = ''
}

/**
 * @description 密码提交
 */
const submitPassword = () => {
	ruleFormPasswordRef.value?.validate(async (valid: boolean) => {
		if (!valid) return

		// SM2加密密码
		const publicKey = import.meta.env.VITE_SM_PUBLIC_KEY
		const pwdReq: ChangePwdReq = { passwordOld: '', passwordNew: '' }
		pwdReq.passwordOld = sm2.doEncrypt(state.ruleFormPassword.passwordOld, publicKey, 1)
		pwdReq.passwordNew = sm2.doEncrypt(state.ruleFormPassword.passwordNew, publicKey, 1)
		await changePwd(pwdReq)

		// 退出系统
		ElMessageBox.confirm('密码已修改，是否重新登录系统？', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(async () => {
			await stores.logout()
			await router.push({ path: LOGIN_URL, query: { redirect: route.fullPath } })
			ElMessage.success('退出登录成功！')
		})
	})
}

/**
 * @description 上传图片
 */
const uploadCropperImg = async (e: any) => {
	let res = await uploadAvatar(e.img)
	if (userInfo.value) userInfo.value.avatar = getFileUrl(res.result!)
}

/**
 * @description 获取文件地址
 */
const getFileUrl = (row: UploadAvatarRes): string => {
	if (row.bucketName == 'Local') {
		return `/${row.filePath}/${row.id}${row.suffix}`
	} else {
		return row.url!
	}
}
</script>

<template>
	<div class="sys-userCenter-container">
		<el-row :gutter="5" style="width: 100%">
			<el-col :span="8" :xs="24">
				<el-card shadow="hover">
					<div class="account-center-avatarHolder">
						<el-avatar
							:size="100"
							:src="userInfo?.avatar"
							@click="openCropperDialog"
							v-loading="state.avatarLoading"
							element-loading-spinner="el-icon-Upload"
							element-loading-background="rgba(0, 0, 0, 0.2)"
							@mouseenter="mouseEnterAvatar"
							@mouseleave="mouseLeaveAvatar"
						/>
						<div class="username">{{ userInfo?.name }}</div>
					</div>
					<div class="account-center-org">
						<p>
							<pure-icon name="pi-carbon:building"></pure-icon>
							<span>组织机构：{{ state.ruleFormBase.orgName ?? '-' }}</span>
						</p>
						<p>
							<pure-icon name="pi-carbon:user-certification"></pure-icon>
							<span>角色：{{ state.ruleFormBase.roleName ?? '-' }}</span>
						</p>
						<p>
							<pure-icon name="pi-carbon:kubernetes-ip-address"></pure-icon>
							<span>家庭地址：{{ state.ruleFormBase.address ?? '-' }}</span>
						</p>
					</div>
				</el-card>
			</el-col>

			<el-col :span="16" :xs="24">
				<el-card shadow="hover">
					<el-tabs>
						<el-tab-pane label="基础信息" v-loading="state.loading">
							<el-form :model="state.ruleFormBase" ref="ruleFormBaseRef">
								<el-row :gutter="35">
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
										<el-form-item label="真实姓名" prop="realName" :rules="[{ required: true, message: '真实姓名不能为空', trigger: 'blur' }]">
											<el-input v-model="state.ruleFormBase.realName" placeholder="真实姓名" clearable />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
										<el-form-item label="昵称">
											<el-input v-model="state.ruleFormBase.nickName" placeholder="昵称" clearable />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
										<el-form-item label="手机号码" prop="phone" :rules="[{ required: true, message: '手机号码不能为空', trigger: 'blur' }]">
											<el-input v-model="state.ruleFormBase.phone" placeholder="手机号码" clearable />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
										<el-form-item label="邮箱">
											<el-input v-model="state.ruleFormBase.email" placeholder="邮箱" clearable />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
										<el-form-item label="出生日期" prop="birthday" :rules="[{ required: true, message: '出生日期不能为空', trigger: 'blur' }]">
											<el-date-picker
												v-model="state.ruleFormBase.birthday"
												type="date"
												placeholder="出生日期"
												format="YYYY-MM-DD"
												value-format="YYYY-MM-DD"
												class="w100"
											/>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
										<el-form-item label="性别">
											<el-radio-group v-model="state.ruleFormBase.sex">
												<el-radio :value="1">男</el-radio>
												<el-radio :value="2">女</el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
										<el-form-item label="地址">
											<el-input v-model="state.ruleFormBase.address" placeholder="地址" clearable type="textarea" />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
										<el-form-item label="备注">
											<el-input v-model="state.ruleFormBase.remark" placeholder="备注" clearable type="textarea" />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
										<el-form-item>
											<el-button type="primary" :icon="checkmarkIcon" @click="submitUserBase"> 保存基本信息 </el-button>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="修改密码">
							<el-form ref="ruleFormPasswordRef" :model="state.ruleFormPassword">
								<el-form-item label="当前密码" prop="passwordOld" :rules="[{ required: true, message: '当前密码不能为空', trigger: 'blur' }]">
									<el-input v-model="state.ruleFormPassword.passwordOld" type="password" autocomplete="off" />
								</el-form-item>
								<el-form-item label="新的密码" prop="passwordNew" :rules="[{ required: true, message: '新密码不能为空', trigger: 'blur' }]">
									<el-input v-model="state.ruleFormPassword.passwordNew" type="password" autocomplete="off" />
								</el-form-item>
								<el-form-item label="确认密码" prop="passwordNew2" :rules="[{ validator: validatePassword, required: true, trigger: 'blur' }]">
									<el-input v-model="state.passwordNew2" type="password" autocomplete="off" />
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="resetPassword">
										<template #icon> <pure-icon name="pi-carbon:rotate-360" /> </template>重 置
									</el-button>
									<el-button type="primary" @click="submitPassword">
										<template #icon> <pure-icon name="pi-carbon:checkmark-filled" /> </template>确 定
									</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</el-col>
		</el-row>

		<PureCropper ref="cropperDialogRef" :title="state.cropperTitle" @uploadCropperImg="uploadCropperImg" />
	</div>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
