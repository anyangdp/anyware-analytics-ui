import http from '@/plugins/axios/http'
import type { UploadFileRes } from '@/api/system/interfaces/file.interface'
import type { FileRequestDTO } from '@/api/file/file.interface'


/**
 * @description 文件上传
 */
export const upload = (file: Blob) => {
	/**
	 * @description 上传文件
	 */
	const formData = new FormData()
	formData.append('file', file)
	return http.post<UploadFileRes>('/s/file/upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

/**
 * @description 检查重名文件
 */
export const checkDuplicate = (filename: string, path: string) => {
	const formData = new FormData()
	formData.append('filename', filename)
	formData.append('path', path)
	return http.post<UploadFileRes>('/s/file/check/duplicate', formData, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

/**
 * @description 文件上传到指定目录
 */
export const uploadDirectory = (file: Blob, path: string) => {
	/**
	 * @description 上传文件
	 */
	const formData = new FormData()
	formData.append('file', file)
	formData.append('path', path)
	return http.post<UploadFileRes>('/s/file/upload/path', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

/**
 * @description 文件系统
 */
export const directoryAllList = (fileRequestDTO: FileRequestDTO) => {
	return http.post('/s/file/directory/all', fileRequestDTO)
}
/**
 * @description 文件夹列表
 */
export const directoryList = (fileRequestDTO: FileRequestDTO) => {
	return http.post('/s/file/directory', fileRequestDTO)
}

/**
 * @description 文件资源列表
 */
export const resourceList = (fileRequestDTO: FileRequestDTO) => {
	return http.post('/s/file/list', fileRequestDTO)
}

/**
 * @description 删除
 * @param id {number} 主键 id
 */
export const delFile = (path: string) => {
	const formData = new FormData()
	formData.append('path', path)
	return http.delete('/s/file/delete', formData, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}
