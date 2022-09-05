import axios from "axios";

const rightsRead = ()=>{
    return axios.get('http://localhost:5000/rights?_embed=children')
}
export {rightsRead}
