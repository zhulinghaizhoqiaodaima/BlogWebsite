import http from './config'

const CreateNews = (params:any): Promise<any> => http.post('/news',params)


export {CreateNews}
