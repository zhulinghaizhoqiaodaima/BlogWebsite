import http from './config'

const CreateNews = (params:any): Promise<any> => http.post('/news',params)
const UpdateNews = (id:any,params:any): Promise<any> => http.patch(`/news/${id}`,params)
const getSelfDraft = (author:any)=>http.get(`/news?author=${author}&auditState=0&_expand=category`)
const deletenewsOne = (id:any): Promise<any> => http.delete(`/news/${id}`)
const getNewsOne = (id:any): Promise<any> => http.get(`/news/${id}?_expand=category&expand=role`)
const UpdateAuditState = (id:any,params:any): Promise<any> => http.patch(`/news/${id}`,params)

export {CreateNews,getSelfDraft,deletenewsOne,getNewsOne,UpdateNews,UpdateAuditState}
