import http from './config'

const getRightChildren = (): Promise<any> => http.get('/rights?_embed=children')
const getRight = (): Promise<any> => http.get('/rights')
const deleteRightOne = (params:number): Promise<any> => http.delete('/rights/'+params)
export {
    getRightChildren, 
    getRight,
    deleteRightOne 
}
