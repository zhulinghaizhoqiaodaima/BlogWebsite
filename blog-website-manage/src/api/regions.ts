import http from './config'

const getRegions = (): Promise<any> => http.get('/regions')


export {getRegions}
