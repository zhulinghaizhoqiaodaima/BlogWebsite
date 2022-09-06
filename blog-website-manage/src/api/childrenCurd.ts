import http from './config'

const deleteChildrenOne = (params:number): Promise<any> => http.delete('/children/'+params)
export {
    deleteChildrenOne 
}
