
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import styles from './sass/TopHeader.module.css'
import { Layout } from 'antd';
import React, { useState } from 'react';
const { Header } = Layout;

function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: () => setCollapsed(!collapsed),
      })}
      {/* {
        collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined />
      } */}
    </Header>
  )
}

export default TopHeader