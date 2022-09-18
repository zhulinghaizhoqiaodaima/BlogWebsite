/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Table  } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useNavigate } from 'react-router-dom';
interface DataType {
  id: string;
  title: string,
  author: string,
  auditState: number,
  category: any
}
function NewsPublish(props: any) {
  const navigate = useNavigate()
  const { data: dataTable,button } = props;
  const columns: ColumnsType<DataType> = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      key: 'title',
      render: (title, item) => {
        return (
          <a onClick={
            () => {
              navigate(`/news-manage/preview/${item.id}`)
            }
          }>{title}</a>
        )
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        return <div >{category.title}</div>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return button(item.id)
      }
    }
  ];
  return (
    <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <Table columns={columns} dataSource={dataTable} rowKey={item => item.id} pagination={
          {
            pageSize: 6
          }
        } />
      </div>
    </div>

  )
}

export default NewsPublish