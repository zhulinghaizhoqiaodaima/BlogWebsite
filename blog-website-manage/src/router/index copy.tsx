import {useRoutes} from "react-router-dom";
import { Suspense, lazy } from 'react'
const routes = [
  { 
    path: '/',
    auth:false,
    component:lazy(() => import('../views/SandBox')),
    children: [
        { 
          path: '/home',
          auth:true,
          component:lazy(() => import('../views/SandBox/Home'))
        },
        { 
            path: '/user-manage/list',
            auth:true,
            component:lazy(() => import('../views/SandBox/UserList'))
        },
        { 
            path: '/right-manage/right/list',
            auth:true,
            component:lazy(() => import('../views/SandBox/rightManage/RightList'))
        },
        { 
            path: '/right-manage/role/list',
            auth:true,
            component:lazy(() => import('../views/SandBox/rightManage/RoleList'))
        },
      ]
  },
  {
    path: '/login',
    auth:false,
    component:lazy(() => import('../views/Login'))
  },
  {
    path: '/*',
    auth:true,
    component:lazy(() => import('../views/NotFound')),
  },
]

//根据路径获取路由
// const checkAuth = (routers:any, path:String)=>{
//   for (const data of routers) {
//     if (data.path==path) return data
//     if (data.children) {
//       const res:any = checkAuth(data.children, path)
//       if (res) return res
//     }
//   }
//   return null
// }

// 路由处理方式
// const generateRouter = (routers:any) => {
//   return routers.map((item:any) => {
//     if (item.children) {
//       item.children = generateRouter(item.children)
//     }
//     item.element = <Suspense fallback={
//       <div>加载中...</div>
//     }>
//       {/* 把懒加载的异步路由变成组件装载进去 */}
//       <item.component />
//     </Suspense>
//     return item
//   })
// }

// const Router = () => useRoutes(generateRouter(routes))
// console.log("🚀 ~ file: index.tsx ~ line 72 ~ Router", Router)
// const checkRouterAuth = (path:String)=>{
//   let auth = null
//   auth = checkAuth(routes,path)
//   return auth
// }

const Router = () => useRoutes(routes)

export default  Router
