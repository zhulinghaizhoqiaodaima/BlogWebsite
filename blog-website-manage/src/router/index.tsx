import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/Login'
import NotFound from '../views/NotFound'
import SandBox from '../views/SandBox'
import Home from '../views/SandBox/Home'
import RightList from '../views/SandBox/RightList'
import RoleList from '../views/SandBox/RoleList'
import UserList from '../views/SandBox/UserList'
const RequireAuth = () => { // 路由拦截
    // return localStorage.getItem("token") ? <SandBox></SandBox> : <Navigate to={"/login"} replace />
    return <Navigate to={"/sandbox/home"} replace />
}
function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<RequireAuth></RequireAuth>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
            
                <Route path="/sandbox" element={<SandBox></SandBox>}>
                    <Route path="/sandbox/home" element={<Home></Home>}></Route>
                    <Route path="/sandbox/user-manage/role/list" element={<UserList></UserList>}></Route>
                    <Route path="/sandbox/right-manage/right/list" element={<RightList></RightList>}></Route>
                    <Route path="/sandbox/right-manage/role/list" element={<RoleList></RoleList>}></Route>
                </Route>
                <Route path="/*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </HashRouter>
    )
}

export default Router