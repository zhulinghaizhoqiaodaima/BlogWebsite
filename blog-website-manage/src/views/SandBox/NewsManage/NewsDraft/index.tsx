/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, Button,Modal,message, notification } from 'antd';
import { DeleteOutlined, EditOutlined, UploadOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { deletenewsOne, getSelfDraft, UpdateAuditState } from '../../../../api/newsCurd';
import { fromJS } from 'immutable';
import { useNavigate } from 'react-router-dom';
const { confirm } = Modal;
interface DataType {
  id: number;
  title: string;
  author: string,
  category: any,
}
const NewsDraft = () => {
  const [draftInfo, setdraftInfo] = useState([])
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return <h1>{id}</h1>
      }
    },
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
      title: '新闻分类',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        return category.title;
      }
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button
              type='primary'
              danger
              icon={<DeleteOutlined />}
              size='middle'
              shape="circle"
              onClick={() => {
                showPromiseConfirm(item)
              }}
            />
            {` `}

            <Button type='primary' icon={<EditOutlined />} onClick={() => {
                 navigate(`/news-manage/update/${item.id}`)
            }} size='middle' shape="circle" />
            {` `}
            <Button type='primary' icon={<UploadOutlined />} onClick={()=>UpdateAuditInfo(item)} size='middle' shape="circle" />
          </div>
        )
      }
    }
  ];

  const showPromiseConfirm = (item: any) => {
    confirm({
      title: '是否确认删除',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        console.log(item.id);
        deletenewsOne(item.id).then(async res => {
          await initDraftInfo()
          message.success('删除成功')
          
        }).catch(err => {
          message.error("删除失败" + err)
        })
      },
      onCancel() { },
    });
  };
  const UpdateAuditInfo = (item:any) => {
    UpdateAuditState(item.id,{auditState:1}).then((res:any)=>{
        console.log(res);
        initDraftInfo()
        message.success('提交审核成功',2)
        navigate('/audit-manage/list')
        notification.info(
         {
          message:"通知",
          description:"您可以在审核列表中查看文章",
          placement:"bottomRight"
        
         }
        )
    })
  }
  const initDraftInfo =async () => {
    const { username } = JSON.parse(localStorage.getItem("token") as any)
    getSelfDraft(username).then((res: any) => {
      let data = fromJS(res).toJS()
      setdraftInfo(data)
      console.log(res);
    })
  }
  useEffect(() => {
    initDraftInfo()
  
  }, [])

  return (
    <Table rowKey={'id'} columns={columns} dataSource={draftInfo} />
  )
};

export default NewsDraft;