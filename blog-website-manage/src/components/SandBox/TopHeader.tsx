/* eslint-disable jsx-a11y/anchor-is-valid */

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styles from './sass/TopHeader.module.css'
import { Layout, Dropdown, Menu, Space, Avatar } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const { Header } = Layout;
function TopHeader(props: any) {
  const { isCollpsed, changeCollapsed } = props
  // const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  let { role: { roleName }, username } = JSON.parse(localStorage.getItem("token") as any);

  const menu = (
    <Menu
      onClick={(item: any) => {
        if (item.key === '2') {
          localStorage.removeItem("token")
          navigate('/login')
        }
      }}
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" >
              {roleName}
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
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
      }}
    >
      {React.createElement(isCollpsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: () => {
          changeCollapsed(isCollpsed)
        },
      })}
      <div style={{ float: "right", marginRight: "20px" }}>
        <span style={{ marginRight: "10px" }}>欢迎<span style={{ color: "#1890ff" }}>{username}</span>回来</span>
        <Dropdown overlay={menu}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              <Avatar size={40} icon={<UserOutlined />} />

            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isCollpsed: state.Collpsed.isCollapsed,
  }
}
const mapDispatchToProps = {
  changeCollapsed: (collapsed: any) => {
    return {
      type: 'collapsed/changeCollapsed', // 调用方式reducers名/方法
      payload: {
        collapsed: collapsed,
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)