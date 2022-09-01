import axios from "axios";
const getData = ()=>{
    return axios.get('/api/mmdb/movie/v3/list/hot.json?ct=%E6%A1%82%E6%9E%97&ci=93&channelId=4')
}
export {getData}
