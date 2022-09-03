import React, { useState } from 'react';

import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom'

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const menuData = [
  {
    label: "首页",
    key: "/sandbox/home",
    icon: <UserOutlined />,
    children: [
      {
        label: "首页-child",
        key: "/sandbox/user-manage/role/list",
        icon: <UserOutlined />,
      }
    ]

  },
  {
    label: "用户管理",
    key: "/login",
    icon: <UploadOutlined />,
    children: [
      {
        label: "用户管理-child-1",
        key: "22",
        icon: <UploadOutlined />,
        children: [
          {
            label: "用户管理-child-2",
            key: "222",
            icon: <UploadOutlined />,
          }
        ]
      }
    ]

  },
  {
    label: "视频页",
    key: "/sandbox/user-manage/role/list",
    icon: <VideoCameraOutlined />,
    children: [
      {
        label: "主页-child",
        key: "33",
        icon: <VideoCameraOutlined />,
      }
    ]

  },
]

const getMenuList = (List: any) => {
  let res = [];
  res = List.map((item: any) => {
    if (item.children) { // 只遍历了一层
      item.children = getMenuList(item.children)
    }
    return getItem(item.label, item.key, item.icon, item.children, item.type)
  })
  return res;
}

const MenuList: MenuProps['items'] = getMenuList(menuData)
const rootSubmenuKeys = ['/sandbox/home', '/login', '/sandbox/user-manage/role/list'];
function SideMenu(props: any) {
  const navigate = useNavigate();

  const [openKeys, setOpenKeys] = useState(['/sandbox/home']);

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    console.log(keys);
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className='logo' style={{
        color: "#fff",
        fontWeight: "bolder",
        textAlign: "center",
        lineHeight: "32px",
        fontSize: "16px"
      }}> 全球新闻发布管理系统</div>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={MenuList}
      />
    </Sider>
  )
}

export default SideMenu