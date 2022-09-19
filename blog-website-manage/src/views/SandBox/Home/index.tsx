/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card, Col, Row, List, Avatar, Drawer } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { getNewsList, getNewsStart, getNewsViews } from '../../../api/newsCurd';
import { fromJS } from 'immutable';
import _ from 'lodash'
import * as echarts from 'echarts';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
const Home = () => {
  const navigate = useNavigate()
  const [userLooks, setuserLooks] = useState([])
  const [starList, setstarList] = useState([])
  const [newsList, setnewsList] = useState([])
  const [pieChart, setpieChart] = useState(null)
  const barRef = useRef()
  const pieRef = useRef()
  const [open, setOpen] = useState(false);

  const showDrawer =async () => {
   await setOpen(true);
    renderPieView(newsList)
  };

  const onClose = () => {
    setOpen(false);
  };
  const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem("token") as any)
  const getInit = () => {
    getNewsViews().then((res: any) => {
      let data: any = fromJS(res).toJS();
      setuserLooks(data)
    })
    getNewsStart().then((res: any) => {
      let data: any = fromJS(res).toJS();
      setstarList(data)
    })
    getNewsList().then((res: any) => {
      let data: any = fromJS(res).toJS();
      setnewsList(data)
      data = _.groupBy(data, item => item.category.title)
      // console.log(data);
      renderBarView(data)
    })
  }
  const renderBarView = (data: any) => {
    var myChart = echarts.init(barRef.current as any);
    let option = {
      title: {
        text: '文章分类'
      },
      legend: {
        data: ['数量']
      },
      xAxis: {
        type: 'category',
        data: Object.keys(data)
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        width: "50%",
        containLabel: true
      },
      series: [
        {
          name: "数量",
          itemStyle: {
            normal: { color: "#1890FF" }
          },
          data: Object.values(data).map((item: any) => item.length),
          type: 'bar'
        }
      ]
    };
    option && myChart.setOption(option);
    window.onresize = () => { // 监听自适应
      myChart.resize()
    }
  }
  const renderPieView = (data: any) => {
    var myChart;
    const groupObj = _.groupBy(data, item => item.category.title)
    let list = [];
    for (const key in groupObj) {
      list.push({
        name:key,
        value:groupObj[key].length
      })
    }
    if(!pieChart) { // 禁止重复创建dom
      myChart =  echarts.init(pieRef.current as any)
      setpieChart(myChart as any)
    }
    let option = {
      title: {
        // text: '嘿嘿嘿',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    option && myChart?.setOption(option);
  }
  useEffect(() => {
    getInit()
    return () => {
      window.onresize = null;
    }
  }, [])
  
  return ( 
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true}>
            <List
              size="small"
              bordered
              dataSource={userLooks}
              renderItem={(item: any) => <List.Item><a onClick={() => {
                navigate(`/news-manage/preview/${item.id}`)
              }}>{item.title}</a></List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="文章热度" bordered={true}>
            <List
              size="small"
              bordered
              dataSource={starList}
              renderItem={(item: any) => <List.Item><a onClick={() => {
                navigate(`/news-manage/preview/${item.id}`)
              }}>{item.title}</a></List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={showDrawer} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={username}
              description={
                <div>
                  <b>{region || "全球"}</b>
                  <span style={{ paddingLeft: "30px" }}>
                    {roleName}
                  </span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
      <Drawer title="个人文章分类"
        width="500px"
        placement="right"
        onClose={onClose}
        open={open}>
        <div ref={pieRef as any} style={{
          width: "100%",
          height: "400px",
          marginTop: 50,
        }}>
        </div>
      </Drawer>
      <div ref={barRef as any} style={{
        width: "100%",
        height: "400px",
        marginTop: 50,
      }}>
      </div>
    </div>
  );
}

export default Home;