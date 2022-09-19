import React from 'react'
import './sass/SandBox.scss'
import SideMenu from '../../components/SandBox/SideMenu'
import TopHeader from '../../components/SandBox/TopHeader'
import { Outlet } from "react-router-dom"; //
import { Layout, Spin } from 'antd'
import { connect } from 'react-redux';

const { Content } = Layout;
function SandBox(props:any) {
    const {isLoading} = props;    
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
                    <Spin size="large" spinning={isLoading}>
                        <Outlet></Outlet>
                    </Spin>
                </Content>
            </Layout>
        </Layout>
    )
}

const mapToStateProps = (state:any)=>{
    return {
        isLoading:state.SpinReducer.isLoading,
    }
}

export default connect(mapToStateProps)(SandBox)