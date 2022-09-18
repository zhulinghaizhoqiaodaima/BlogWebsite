/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, message, Table, Tag } from 'antd';
import { fromJS } from 'immutable';
import React, { useEffect, useState } from 'react'
import { getAuditManage, UpdateNews } from '../../../api/newsCurd';
import { ColumnsType } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';

interface DataType {
  id: string;
  title: string,
  author: string,
  auditState:number,
  category: any
}
const auditList = ["未审核", "审核中", "已通过", "未通过"]
function AuditManage() {
  const navigate = useNavigate();
  const [dataTable, setdataTable] = useState([])
  const columns: ColumnsType<DataType> = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      key: 'title',
      render:(title,item)=>{
        return (
           <a  onClick={
             ()=>{
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
      title: '审核状态',
      dataIndex: 'auditState',
      key: 'auditState',
      render: (auditState) => {
        const colorList = ['','orange','green','red']
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
      }
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
        return (
          <div>
         <Button type='primary'  size='middle' onClick={() => {
                handlePublic(item)
              }}
            > 通过 </Button>
            {` `}
          <Button type='primary' danger size='middle'
              onClick={()=>handleFail(item)}
            > 驳回 </Button>
          
          </div>
        )
      }
    }
  ];
  const handlePublic =(item:any) =>{
    UpdateNews(item.id,{
      publishState:1, // 待发布
      auditState:2, // 已通过
    }).then((res:any)=>{
      getInit()
      message.success('已通过',2)
    })
  }
  const handleFail =(item:any) =>{
    UpdateNews(item.id,{
      publishState:0, // 未发布
      auditState:3, // 未通过
    }).then((res:any)=>{
      getInit()
      message.success('已驳回',2)
    })
  }
  const getInit = () => {
    const { roleId, region, username } = JSON.parse(localStorage.getItem("token") as any)
    getAuditManage().then((res: any) => {
      console.log(res);
      let data = fromJS(res).toJS()
      let newData = roleId === 1 ? data : [
        ...data.filter((child: any) => child.author === username),
        ...data.filter((child: any) => child.region === region && child.roleId > roleId)
      ]
      setdataTable(newData)
    })
  }
  useEffect(() => {
    getInit()
  }, [])

  return (
    <div>

      <div style={{ flex: 1, overflow: "auto" }}>
        <Table columns={columns} dataSource={dataTable} rowKey={'id'} pagination={
          {
            pageSize: 5
          }
        } />
      </div>
    </div>
  )
}

export default AuditManage