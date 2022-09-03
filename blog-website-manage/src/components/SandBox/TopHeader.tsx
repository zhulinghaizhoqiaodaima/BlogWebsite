/* eslint-disable jsx-a11y/anchor-is-valid */

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styles from './sass/TopHeader.module.css'
import { Layout, Dropdown, Menu, Space, Avatar } from 'antd';
import React, { useState } from 'react';


const { Header } = Layout;
const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" >
            超级管理员
          </a>
        ),

      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer">
            退出登录
          </a>
        ),

      }
    ]}
  />
);
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
        onClick: () => {
          setCollapsed(!collapsed)
        },
      })}
      <div style={{ float: "right", marginRight: "20px" }}>
        <span style={{ marginRight: "10px" }}>欢迎admin回来</span>
        <Dropdown overlay={menu}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              <Avatar size={40} icon={<UserOutlined />} />

            </Space>
          </a>
        </Dropdown>
      </div>

      {/* {
        collapsed ? <MenuUnfoldOutlined className={styles.trigger} onClick={() => {
          setCollapsed(!collapsed)
        }}/> : <MenuFoldOutlined className={styles.trigger}  onClick={() => {
          setCollapsed(!collapsed)
        }}/>
      } */}
    </Header>
  )
}

export default TopHeader