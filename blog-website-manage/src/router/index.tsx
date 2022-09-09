import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import Audit from '../views/SandBox/AuditManage/index'
import AuditList from '../views/SandBox/AuditManage/AuditList'
import Unpublished from '../views/SandBox/PublishManage/Unpublished'
import Published from '../views/SandBox/PublishManage/Published'
import Sunset from '../views/SandBox/PublishManage/Sunset'
const RequireAuth = () => { // 路由拦截
    return localStorage.getItem("token") ? <Navigate to={"/home"} replace /> : <Navigate to={"/login"} replace />
}
const LocalRouterMap = {
    "/home":Home,
    "/user-manage/list":UserList,
    "/right-manage/role/list":RoleList,
    "/right-manage/right/list":RightList,
    "/news-manage/add":NewsAdd,
    "/news-manage/draft":NewsDraft,
    "/news-manage/category":NewsCategory,
    "/audit-manage/audit":Audit,
    "/audit-manage/list":AuditList,
    "/publish-manage/unpublished":Unpublished,
    "/publish-manage/published":Published,
    "/publish-manage/sunset":Sunset
}
function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path="/" element={<RequireAuth></RequireAuth>}></Route>
                <Route path="/" element={<SandBox></SandBox>}> 
                    <Route path="/home" element={<Home></Home>}></Route>
                    <Route path="/user-manage/list" element={<UserList></UserList>}></Route>
                    <Route path="/right-manage/right/list" element={<RightList></RightList>}></Route>
                    <Route path="/right-manage/role/list" element={<RoleList></RoleList>}></Route>
                </Route>
                <Route path="/*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </HashRouter>
    )
}

export default Router