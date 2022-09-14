import { BrowserRouter, useRoutes } from "react-router-dom";
import React from 'react'
import Login from '../views/Login'
import NotFound from '../views/NotFound'
import SandBox from '../views/SandBox'
import Home from '../views/SandBox/Home'
import RightList from '../views/SandBox/rightManage/RightList'
import RoleList from '../views/SandBox/rightManage/RoleList'
import UserList from '../views/SandBox/UserList'
import NewsAdd from '../views/SandBox/NewsManage/NewsAdd'
import NewsDraft from '../views/SandBox/NewsManage/NewsDraft'
import NewsCategory from '../views/SandBox/NewsManage/NewsCategory'
import NewsPreview from '../views/SandBox/NewsManage/NewsPreview'
import Audit from '../views/SandBox/AuditManage/index'
import AuditList from '../views/SandBox/AuditManage/AuditList'
import Unpublished from '../views/SandBox/PublishManage/Unpublished'
import Published from '../views/SandBox/PublishManage/Published'
import Sunset from '../views/SandBox/PublishManage/Sunset'
import NewsUpdate from "../views/SandBox/NewsManage/NewsUpdate";


// 路由配置
const GetRoutes = () => {
  let rightsList: string[] = [];
  if (JSON.parse(localStorage.getItem("token") as any)) {
    const { role: { rights } } = JSON.parse(localStorage.getItem("token") as any)
    rightsList = rights;
  }
  rightsList.push('/')
  rightsList.push('/login')
  rightsList.push('/*')

  const curroutes = [
    {
      path: '/',
      element: <SandBox></SandBox>,
      redirect: '/home',
      children: [
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/user-manage/list',
          element: <UserList />
        },
        {
          path: '/right-manage/right/list',
          element: <RightList />
        },
        {
          path: '/right-manage/role/list',
          element: <RoleList />
        },
        {
          path: '/news-manage/add',
          element: <NewsAdd />
        },
        {
          path: '/news-manage/draft',
          element: <NewsDraft />
        },
        {
          path: '/news-manage/category',
          element: <NewsCategory />
        },
        {
          path: '/news-manage/preview/:id', 
          element: <NewsPreview />
        },
        {
          path: '/news-manage/update/:id', 
          element: <NewsUpdate />
        },
        {
          path: '/audit-manage/audit',
          element: <Audit />
        },
        {
          path: '/audit-manage/list',
          element: <AuditList />
        },
        {
          path: '/publish-manage/unpublished',
          element: <Unpublished />
        },
        {
          path: '/publish-manage/published',
          element: <Published />
        },
        {
          path: '/publish-manage/sunset',
          element: <Sunset />
        },
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/*',
      element: <NotFound />
    },
  ]
  //内层调用外层变量，形成闭包,便于登录后更新路由
  const getNewRoutes = (list: any) => {
    let res = list.filter((item: any) => {
      if (item.children) item.children = getNewRoutes(item.children)
      return rightsList.includes(item.path)
    })
    return res;
  }
  const newRoutes = getNewRoutes(curroutes);

  const routes = useRoutes(newRoutes);
  return routes;
}


const SetRoutes = () => {
  return (
    <BrowserRouter>
      <GetRoutes />
    </BrowserRouter>
  )
}
export default SetRoutes

