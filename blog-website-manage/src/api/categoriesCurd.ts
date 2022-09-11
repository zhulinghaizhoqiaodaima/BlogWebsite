import http from './config'

const getCategories = (): Promise<any> => http.get('/categories')


export {getCategories}
