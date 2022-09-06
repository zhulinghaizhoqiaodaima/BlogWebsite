import React, { useEffect, useState } from 'react';
import { fromJS } from 'immutable';
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'
import {
  UserOutlined,
} from '@ant-design/icons';
import { getRightChildren } from '../../api/rigthsCurd'
import { MenuInfo } from 'rc-menu/lib/interface';


const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  disabled?: boolean,
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    disabled
  } as MenuItem;
}

const getMenuList = (List: any) => {
  if (List.length === 0) return;
  let res = [];
  res = List.map((item: any) => {
    if (item.children !== undefined) { // 只遍历了一层
      item.children = getMenuList(item.children)
    }
    return getItem(item.title || item.label, item.key, item.icon || <UserOutlined />, item.children)
  })
  return res;
}

const getNewDataList = (List: any) => {
  if (List.length === 0) return;
  let res = [];
  // eslint-disable-next-line array-callback-return
  res = List.filter((item: any) => {
    if (item.children !== undefined) {
      item.children = getNewDataList(item.children)
    }
    if (item.pagepermisson === 1) return item;

  })
  return res
}

function goNavigate(data: MenuInfo) {
  return data.key
}

function SideMenu(props: any) {
  const navigate = useNavigate();
  const [menuList, setmenuList] = useState([])
  const dataList: MenuProps['items'] = getMenuList(menuList) || [];
  let curSelectedKeys: any = useLocation().pathname;
  let NewdefaultOpenKeys:string = '/'+ curSelectedKeys.split('/')[1];

  useEffect(() => {
    getRightChildren().then((res: any) => {
      let newData = getNewDataList(res)
      let temp: any = fromJS(newData).toJS()
      setmenuList(temp)
    })
    return () => {
    }
  }, [])
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="" style={{ display: "flex", height: "100%", flexDirection: "column" }}>
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
              navigate(goNavigate(data))
            }}
            selectedKeys={curSelectedKeys}
            defaultOpenKeys={[NewdefaultOpenKeys]}
          />
        </div>
      </div>
    </Sider>
  )
}

export default SideMenu