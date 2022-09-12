/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Descriptions, message, PageHeader } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsOne } from '../../../../api/newsCurd';

function NewsPreview(props: any) {
  let params = useParams();
  const [newInfo, setnewInfo] = useState({} as any)
  useEffect(() => {
    const { id } = params;
    getNewsOne(id).then((res: any) => {
      console.log(res);
      setnewInfo(res)
    }).catch((err: any) => {
      console.log(err);
    })
  }, [params])

  return (
    <div className="site-page-header-ghost-wrapper" style={{
      padding: "24px",
      backgroundColor: " #f5f5f5"
    }}>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="文章预览"
        extra={[
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="创建者">{newInfo.author}</Descriptions.Item>
          <Descriptions.Item label="创建时间"> {newInfo.createTime}</Descriptions.Item>
          <Descriptions.Item label="发布时间">{newInfo.publishTime}</Descriptions.Item>
          <Descriptions.Item label="区域">{newInfo.region === "" ? "全球" : newInfo.region}</Descriptions.Item>
          <Descriptions.Item label="审核状态">{ }</Descriptions.Item>
          <Descriptions.Item label="发布状态">{newInfo.publishState}</Descriptions.Item>
          <Descriptions.Item label="访问数量">{newInfo.view}</Descriptions.Item>
          <Descriptions.Item label="点赞数量">{newInfo.start}</Descriptions.Item>
          <Descriptions.Item label="评论数量">{newInfo.start}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>
  )
}

export default NewsPreview