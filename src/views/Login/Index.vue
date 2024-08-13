<script setup lang="ts">
import { sm2 } from 'sm-crypto-v2'
import { useRouter } from 'vue-router'
import { useIcon } from '@/hooks/useIcon'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
import { useAuthorStore } from '@/stores/modules/author'
import { getCaptchaImg, login } from '@/api/system/author'
import type { LoginRes } from '@/api/system/interfaces/author.interface'

/**
 * @description 定义加载图标
 */
const loadIcon = useIcon({ name: 'pi-ep:loading' })

/**
 * @description 解析 route
 */
const route = useRoute()

/**
 * @description 解析 router
 */
const router = useRouter()

/**
 * @description 初始话按钮加载中对象
 */
const loading = ref(false)

/**
 * @description 定义用户存储
 */
const userStore = useUserStore()

/**
 * @description 授权
 */
const authorStore = useAuthorStore()

/**
 * @description 初始化登录表单对象
 */
const loginFormRef = ref<FormInstance>()

/**
 * @description 获取当前系统标题
 */
const title = import.meta.env.VITE_APP_TITLE

/**
 * @description 定义页面参数
 */
const loginModel = reactive({
	ruleForm: {
		account: 'superadmin',
		password: 'Ca@123456',
		code: '',
		codeId: ''
	},
	rules: {
		account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
		password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
		code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
	},
	captchaImage: ''
})

/**
 * @description 初始化
 */
onMounted(() => {
	getCaptcha()
})

/**
 * @description 获取验证码
 */
const getCaptcha = async () => {
	loginModel.ruleForm.code = ''
	let { result } = await getCaptchaImg()
	loginModel.captchaImage = 'data:text/html;base64,' + result.img
	loginModel.ruleForm.codeId = result.id
}

/**
 * @description 回车登录
 */
const handleSignIn = () => {
	onSubmit(loginFormRef.value)
}

/**
 * @description 定义提交方法
 */
const onSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate(async valid => {
		if (!valid) return
		try {
			loading.value = true

			// SM2加密密码
			const publicKey = import.meta.env.VITE_SM_PUBLIC_KEY
			const password = sm2.doEncrypt(loginModel.ruleForm.password, publicKey, 1)

			// 请求登录接口
			let { result } = await login({ ...loginModel.ruleForm, password })
			await saveTokenAndInitRoutes(result)
		} catch (e) {
			await getCaptcha() // 重新获取验证码
		} finally {
			loading.value = false
		}
	})
}

/**
 * @description token 保存并初始化路由
 */
const saveTokenAndInitRoutes = async (data: LoginRes) => {
	// 缓存 token
	userStore.setToken(data.accessToken)
	userStore.setTokenExpires(data.accessTokenExpires)
	userStore.setRefreshToken(data.refreshToken)

	// 请求基础用户信息
	await userStore.setUserAuthor()
	await userStore.setDictList()
	await authorStore.InitRouters()

	// 重定向路由
	await router.replace((route.query.redirect as string) || '/')
}
</script>

<template>
	<div class="login-container flex h-screen">
		<div class="logo">
			<img src="@/assets/logo.png" alt="" />
			<div class="logo-text">{{ title }}</div>
		</div>
		<div class="banner">
			<el-carousel :interval="3000" autoplay style="width: 100%" height="auto" arrow="always">
				<el-carousel-item style="height: 500px">
					<img src="@/assets/svg/login-bg.svg" alt="" />
				</el-carousel-item>
				<el-carousel-item style="height: 500px">
					<img src="@/assets/svg/login-bg1.svg" alt="" />
				</el-carousel-item>
				<el-carousel-item style="height: 500px">
					<img src="@/assets/svg/login-bg2.svg" alt="" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="content">
			<div class="content-inner">
				<div class="login-form-wrapper">
					<div class="login-form-title mb-4">登录 {{ title }}</div>
					<div class="login-form-sub-title">简单、完善的后台管理平台</div>
					<div class="login-form-error-msg"></div>
					<el-form ref="loginFormRef" :model="loginModel.ruleForm" :rules="loginModel.rules" size="large" style="max-width: 800px">
						<el-form-item prop="account">
							<el-input v-model="loginModel.ruleForm.account">
								<template #prefix>
									<pure-icon name="pi-ep:user"></pure-icon>
								</template>
							</el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input v-model="loginModel.ruleForm.password" type="password">
								<template #prefix>
									<pure-icon name="pi-ep:key"></pure-icon>
								</template>
							</el-input>
						</el-form-item>
						<el-form-item prop="code">
							<el-col :span="15">
								<el-input v-model="loginModel.ruleForm.code" @keyup.enter.native="handleSignIn" placeholder="请输入验证码" />
							</el-col>
							<el-col :span="1"></el-col>
							<el-col :span="8">
								<div class="login-content-code" style="line-height: 1px">
									<img
										class="login-content-code-img"
										@click="getCaptcha"
										width="130px"
										height="38px"
										:src="loginModel.captchaImage"
										style="cursor: pointer"
									/>
								</div>
							</el-col>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit(loginFormRef)" :loading-icon="loadIcon" :loading="loading" style="width: 100%">
								登录
							</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.login-container {
	.logo {
		position: fixed;
		top: 24px;
		left: 22px;
		z-index: 1;
		display: inline-flex;
		align-items: center;

		img {
			height: 33px;
			width: 33px;
		}

		.logo-text {
			margin-left: 10px;
			margin-right: 4px;
			color: #ffffff;
			font-size: 20px;
		}
	}

	.banner {
		background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;

		img {
			width: 85%;
			height: 85%;
			position: absolute;
			left: 10%;
			top: 50%;
			transform: translateY(-50%) translateZ(0);
		}
	}

	.content {
		position: relative;
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		padding-bottom: 40px;

		.login-form-wrapper {
			width: 400px;

			.login-form-title {
				font-weight: 500;
				font-size: 24px;
				line-height: 32px;
			}

			.login-form-sub-title {
				font-size: 16px;
				line-height: 24px;
				color: rgb(133 143 155);
			}

			.login-form-error-msg {
				height: 32px;
				color: red;
				line-height: 32px;
			}

			.el-form {
				display: flex;
				flex-direction: column;
				width: 100%;
			}
		}
	}
}
</style>
