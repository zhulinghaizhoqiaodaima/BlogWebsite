import React from 'react'
import { Layout,Menu } from 'antd'
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
const items = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Home',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'User',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'nav 3',
  },
]

function SideMenu() {
  return (
    <Sider>
       <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={items}
          />
    </Sider>
  )
}

export default SideMenu