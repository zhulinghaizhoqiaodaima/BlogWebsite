import http from './config'

const deleteChildrenOne = (params:number): Promise<any> => http.delete('/children/'+params)
const updateChildren = (id:any,params:any): Promise<any> => http.patch(`/children/${id}`,params)

export {
    deleteChildrenOne,
    updateChildren 
}
