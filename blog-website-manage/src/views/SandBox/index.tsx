import React from 'react'
import './sass/SandBox.scss'
import SideMenu from '../../components/SandBox/SideMenu'
import TopHeader from '../../components/SandBox/TopHeader'
import { Outlet } from "react-router-dom"; //
import { Layout } from 'antd'
const {  Content } = Layout;
function SandBox() {
    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                   <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    )
}
export default SandBox