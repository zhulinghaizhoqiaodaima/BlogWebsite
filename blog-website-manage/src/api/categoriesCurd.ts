import http from './config'

const getCategories = (): Promise<any> => http.get('/categories')
const deleteCategory = (id:any): Promise<any> => http.delete(`/categories/${id}`)
const updateCategory = (id:any,params:any): Promise<any> => http.patch(`/categories/${id}`,params)



export {
    getCategories,
    deleteCategory,
    updateCategory
}
