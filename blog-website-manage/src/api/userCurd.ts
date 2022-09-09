import http from './config'

const getUsers = (): Promise<any> => http.get('/users?_expand=role')
const deleteUsers = (id:any): Promise<any> => http.delete(`/users/${id}`)
const postUsers = (params:any): Promise<any> => http.post('/users',params)
const patchUsers = (id:any,params:any): Promise<any> => http.patch(`/users/${id}`,params)
const loginApi = (username:string,password:string): Promise<any> => http.get(`/users?username=${username}&password=${password}&_expand=role`)


export {getUsers,patchUsers,deleteUsers,postUsers,loginApi}
