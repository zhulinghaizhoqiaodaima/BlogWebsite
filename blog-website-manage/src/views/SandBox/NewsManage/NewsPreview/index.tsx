/* eslint-disable jsx-a11y/anchor-is-valid */
import { Descriptions, PageHeader, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsOne } from '../../../../api/newsCurd';
function NewsPreview(props: any) {
  let params = useParams();
  const [newInfo, setnewInfo] = useState(null as any)
  useEffect(() => {
    const { id } = params;
    getNewsOne(id).then((res: any) => {
      console.log(res);
      setnewInfo(res)
    }).catch((err: any) => {
      console.log(err);
    })
  }, [params])
  const auditList = ["未审核", "审核中", "已通过", "未通过"]
  const publicList = ["未发布", "待发布", "已上线", "已下线"]
  const publicColor = ['', 'orange', 'green', 'red']
  return (
    <>
      <div className="site-page-header-ghost-wrapper" style={{
        padding: "24px",
        backgroundColor: " #f5f5f5"
      }}>
        {
          newInfo && (
            <PageHeader
              ghost={false}
              onBack={() => window.history.back()}
              title={newInfo.title}
              subTitle={newInfo.category.title}
            // extra={[
            //   <Button key="1" type="primary">
            //     Primary
            //   </Button>,
            // ]}
            >
              <Descriptions size="small" column={3}>
                <Descriptions.Item label="创建者">{newInfo.author}</Descriptions.Item>
                <Descriptions.Item label="创建时间"> {moment(newInfo.createTime).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
                <Descriptions.Item label="发布时间">-</Descriptions.Item>
                <Descriptions.Item label="区域">{newInfo.region === "" ? "全球" : newInfo.region}</Descriptions.Item>
                <Descriptions.Item label="审核状态">
                  <Tag color={publicColor[newInfo.auditState]}>{auditList[newInfo.auditState]}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="发布状态">
                  <Tag color={publicColor[newInfo.auditState]}>{publicList[newInfo.auditState]}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="访问数量" style={{color:"red"}}>{newInfo.view}</Descriptions.Item>
                <Descriptions.Item label="点赞数量">{newInfo.star || 0 }</Descriptions.Item>
                <Descriptions.Item label="评论数量">{ 0 }</Descriptions.Item>
              </Descriptions>
            </PageHeader>
          )
        }
      </div>

      <div style={{ display: "flex", height: "340px", flexDirection: "column" }}>
        <div style={{ flex: 1, overflow: "auto" }}>
          {
            newInfo && (
              <div dangerouslySetInnerHTML={{
                __html: newInfo.content
              }} style={{ marginTop: "50px", height: "400px" }}>

              </div>
            )
          }
        </div>
      </div>

    </>
  )
}

export default NewsPreview