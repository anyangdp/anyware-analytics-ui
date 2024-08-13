/**
 * @description svg 图标参数
 * @param name {string} 图标的名称 ==> 必传
 * @param prefix {string} 图标的前缀 ==> 非必传（默认为"icon"）
 * @param iconStyle {CSSProperties} 图标的样式 ==> 非必传
 */
export interface PureIconProps {
  name: string
  color?: string
  size?: number
}
