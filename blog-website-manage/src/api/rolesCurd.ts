import http from './config'

const getRoles = (): Promise<any> => http.get('/roles')
const deleteRoles = (params:any): Promise<any> => http.delete('/roles/'+params)
const patchRoles = (id:number,params:any): Promise<any> => http.patch(`/roles/${id}`,params)
export {
    getRoles,
    deleteRoles,
    patchRoles 
}
