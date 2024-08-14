import http from '@/plugins/axios/http'
import type { UploadAvatarRes, UploadFileRes, UploadImageRes } from '@/api/system/interfaces/file.interface'

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
export const uploadImage = (file: Blob, id: number = 0) => {
	const formData = new FormData()
	formData.append('file', file)
	formData.append('id', id.toString())
	return http.post<UploadImageRes>('/api/sys/file/upload-image', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

/**
 * @description 上传文件
 */
export const uploadFile = (file: Blob, id: number = 0) => {
	const formData = new FormData()
	formData.append('file', file)
	formData.append('id', id.toString())
	return http.post<UploadFileRes>('/api/sys/file/upload-file', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

/**
 * @description 删除文件
 */
export const delFile = (id: number) => {
	return http.post('/api/sys/file/upload-delete', { id: id })
}
