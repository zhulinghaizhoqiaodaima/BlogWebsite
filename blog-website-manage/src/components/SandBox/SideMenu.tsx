import React, { useEffect, useState } from 'react';
import { fromJS } from 'immutable';
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'
import {
  UserOutlined,
  HomeOutlined,
  UsergroupDeleteOutlined,
  ContactsOutlined,
} from '@ant-design/icons';
import { getRightChildren } from '../../api/rigthsCurd'
import { connect } from 'react-redux';
const IconObj:any = {
   1: <HomeOutlined />, // 主页
   2:<UsergroupDeleteOutlined />, // 用户管理
   6:<UserOutlined />, // 用户管理
   7: <ContactsOutlined />,// 用户列表
}
const IconList =[
  <HomeOutlined />,
  <HomeOutlined />, // 主页
  <UserOutlined />, // 用户管理
  <UsergroupDeleteOutlined />, 
  <UsergroupDeleteOutlined />,
  <UsergroupDeleteOutlined />,
  <UsergroupDeleteOutlined />,
  <UsergroupDeleteOutlined />,// 用户列表
]
console.log(IconList);

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  id?:any,
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    id
  } as MenuItem;
}

const getMenuList = (List: any) => {
  if (List.length === 0) return;
  let res = [];
  res = List.map((item: any) => {
    if (item.children !== undefined) { // 只遍历了一层
      item.children = getMenuList(item.children)
    }
    return getItem(item.title || item.label, item.key, IconObj[item.id], item.children,item.id)
  })
  return res;
}

const getNewDataList = (List: any,rightsList:any) => {
  if (List.length === 0) return;
  let res = [];
  // eslint-disable-next-line array-callback-return
  res = List.filter((item: any) => {
    if (item.children !== undefined) {
      item.children = getNewDataList(item.children,rightsList)
    }
    if (item.pagepermisson === 1 && rightsList.includes(item.key)) return item;

  })
  return res
}

function SideMenu(props: any) {
  const navigate = useNavigate();
  const [menuList, setmenuList] = useState([])
  const {isCollpsed} = props;
  const dataList: MenuProps['items'] = getMenuList(menuList) || [];
  let curSelectedKeys: any = useLocation().pathname;
  let NewdefaultOpenKeys:string = '/'+ curSelectedKeys.split('/')[1];
  useEffect(() => {    
    const {role:{rights:rightsList}} = JSON.parse(localStorage.getItem("token") as any);
    getRightChildren().then((res: any) => {
      let newData = getNewDataList(res,rightsList) // 权限判定
      let data: any = fromJS(newData).toJS()
      console.log("🚀 ~ file: SideMenu.tsx ~ line 75 ~ getRightChildren ~ temp", data)
      setmenuList(data)
    })
    return () => {
    }
  }, [])
  return (
    <Sider trigger={null} collapsible collapsed={isCollpsed}>
      <div className="" style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
        <div className='logo' style={{
          color: "#fff",
          fontWeight: "bolder",
          textAlign: "center",
          lineHeight: "32px",
          fontSize: "16px"
        }}> 全球新闻发布管理系统</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            items={dataList}
            onClick={(data) => {
              console.log(data);
              navigate(data.key)
            }}
            selectedKeys={curSelectedKeys}
            defaultOpenKeys={[NewdefaultOpenKeys]}
          />
        </div>
      </div>
    </Sider>
  )
}

const mapStateToProps = (state:any)=>{
  return {
    isCollpsed: state.Collpsed.isCollapsed,
  }
}

export default connect(mapStateToProps)(SideMenu)