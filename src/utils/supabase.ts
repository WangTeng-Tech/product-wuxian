import { submitInquiry as apiSubmitInquiry, InquiryForm } from './api'

// 切换至 SQLite 自建后台后，Supabase 客户端不再使用，设置为 null 以兼容旧引用
export const supabase = null

/**
 * 提交商务咨询（向新编写的自建后端提交）
 * @param formData 表单数据
 */
export const submitInquiry = async (formData: InquiryForm) => {
  return apiSubmitInquiry(formData)
}
