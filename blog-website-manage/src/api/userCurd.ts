import axios from "axios";

const getData = (params:string)=>{
    return axios.get('http://localhost:5000/'+params)
}

export {getData}
