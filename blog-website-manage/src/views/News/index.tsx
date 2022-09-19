/* eslint-disable jsx-a11y/anchor-is-valid */
import { PageHeader, Card, Col, Row, List } from 'antd'
import { fromJS } from 'immutable'
import React, { useEffect, useState } from 'react'
import { getNewsList } from '../../api/newsCurd'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
function News() {
  const [newsList, setnewsList] = useState([])
  const navigate = useNavigate()
  const getInit = () => {
    getNewsList().then((res: any) => {
      console.log(res);
      let data = fromJS(res).toJS()
      data = Object.entries(_.groupBy(data, item => item.category.title))
      console.log(data);

      setnewsList(data)
    })
  }

  useEffect(() => {
    getInit()
  }, [])

  return (
    <div style={{
      width: "95%",
      margin: "0 auto"
    }}>
      <PageHeader
        className="site-page-header"
        title="全球文章浏览"
        subTitle="查看新闻"
      />
      <div className="site-card-wrapper">
        <Row gutter={[16, 16]}>
          {
            newsList.map((item: any) => {
              return (
                <Col span={8}>
                  <Card title={item[0]} bordered={true} hoverable={true}>
                    <List
                      size="small"
                      // header={<div>Header</div>}
                      // footer={<div>Footer</div>}
                      bordered
                      dataSource={item[1]}
                      pagination={{
                        pageSize: 3
                      }}
                      renderItem={(v:any) => <List.Item><a onClick={()=>{
                        navigate(`detail/${v.id}`)
                      }}>{v.title}</a></List.Item>}
                    />
                  </Card>
                </Col>
              )
            })
          }
        </Row>
      </div>
    </div>
  )
}

export default News