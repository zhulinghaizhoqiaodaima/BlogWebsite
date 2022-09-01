import React,{useEffect} from 'react'

import {getData} from '../../api/HomeModel'

function Index() {
    useEffect(() => {
      getData().then(res=>{
            console.log(res);
            
        })
    }, [])
    
  return (
    <div>Index</div>
  )
}

export default Index