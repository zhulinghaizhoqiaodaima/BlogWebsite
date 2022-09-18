/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { getAuditList, UpdateNews } from '../../../../api/newsCurd'
import { fromJS } from 'immutable';
import { useNavigate } from 'react-router-dom';
const { confirm } = Modal;
const auditList = ["未审核", "审核中", "已通过", "未通过"]
interface DataType {
  id: string;
  title: string,
  author: string,
  auditState:number,
  category: any
}
function AuditList() {
  const navigate = useNavigate();
  const [dataTable, setdataTable] = useState([])
  const getInit = ()=>{
    const { username } = JSON.parse(localStorage.getItem("token") as any)
    getAuditList(username).then((res:any)=>{
      console.log(res);
      let data = fromJS(res).toJS()
      setdataTable(data)
    })
  }
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
            {
              item.auditState===2 &&(<Button type='primary'  size='middle' onClick={() => {
                showPromiseConfirm(item)
              }}
            > 发布 </Button>)
            }
            { item.auditState === 1 &&<Button type='primary' danger size='middle'
              onClick={()=>handleRervert(item)}
            > 撤销 </Button>}
             {item.auditState === 3 &&<Button type='dashed' size='middle' 
              onClick={()=>{
                navigate(`/news-manage/update/${item.id}`)
              }}
             > 更新 </Button>}
          
          </div>
        )
      }
    }
  ];
  const showPromiseConfirm = (item: any) => {
    confirm({
      title: '确认发布?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        UpdateNews(item.id,{
          publishState:2,
          publishTime:Date.now()
        }).then((res:any)=>{
          getInit()
          message.success("发布成功")
        })
      },
      onCancel() { },
    });
  };
  const handleRervert=(item:any) =>{
    confirm({
      title: '确认撤销 ?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        UpdateNews(item.id,{
          auditState:0
        }).then((res:any)=>{
          getInit()
          message.success("撤销成功")
        })
      },
      onCancel() { },
    });
   
  }
  useEffect(() => {
    getInit()
  }, [])
  
  return (
    <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
    <div style={{ flex: 1, overflow: "auto" }}>
      <Table columns={columns} dataSource={dataTable} rowKey={item=>item.id} pagination={
        {
          pageSize: 6
        }
      } />
    </div>
  </div>

  )
}

export default AuditList