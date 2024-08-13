import http from '@/plugins/axios/http'
import type { UploadAvatarRes, UploadImageRes } from '@/api/system/interfaces/file.interface'

/**
 * @description 上传头像
 */
export const uploadAvatar = (file: Blob) => {
	const formData = new FormData()
	formData.append('file', file)
	return http.post<UploadAvatarRes>('/api/sys/file/upload-avatar', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

/**
 * @description 上传图片
 */
export const uploadImage = (file: Blob) => {
	const formData = new FormData()
	formData.append('file', file)
	return http.post<UploadImageRes>('/api/sys/file/upload-image', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}
