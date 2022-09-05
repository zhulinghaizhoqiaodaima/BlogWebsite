import axios from "axios";

const getData = (params:string)=>{
    return axios.get('http://localhost:9090/'+params)
}

export {getData}
