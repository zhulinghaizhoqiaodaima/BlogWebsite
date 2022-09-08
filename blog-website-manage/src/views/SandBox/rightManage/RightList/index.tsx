/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, Tag, Button, Modal, message, Popover, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getRightChildren, deleteRightOne } from '../../../../api/rigthsCurd'
import { deleteChildrenOne } from '../../../../api/childrenCurd'
import { fromJS } from 'immutable'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

interface DataType {
  id: number;
  key: string;
  title: string;
  children?: DataType[];
}
const getNewDataList = (List: any) => {
  if (List.length === 0) return;
  let res = [];

  res = List.map((item: any) => {
    if (item.children !== undefined) {
      item.children = getNewDataList(item.children)
    }
    return item;
  })

  return res
}
const getNewTables = (List: any, target: any) => {
  if (List.length === 0) return;
  let res = [];

  res = List.filter((item: any) => {
    if (item.children) {
      item.children = getNewTables(item.children, target)
    }
    return item.id !== target.id
  })

  return res
}

const Index = () => {
  const [dataTable, setdataTable] = useState([])
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render:(id)=>{
        return <h1>{id}</h1>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      key: 'key',
      render: (key) => {
        return <Tag color='cyan'>{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        const contentConfig = (<div style={{ textAlign: "center" }}>
          <Switch checked={item.pagepermisson}></Switch>
        </div>)
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
            <Popover title="页面权限" content={contentConfig} trigger={item.pagepermisson === undefined ? '' : 'click'} >
              <Button type='primary' icon={<EditOutlined />} disabled={item.pagepermisson === undefined ? true : false} size='middle' shape="circle" />
            </Popover>
          </div>
        )
      }
    }
  ];
  const showPromiseConfirm = (item: any) => {
    confirm({
      title: '是否要删除这个权限',
      icon: <ExclamationCircleOutlined />,
      // content: '单击“确定”按钮后,该对话框将在1秒后关闭',
      async onOk() {
        setdataTable(getNewTables(dataTable, item)) // 前端修改数据,回调更舒服
        console.log(item);
        try {
          await item.grade === 1 ? deleteRightOne(item.id) : deleteChildrenOne(item.id);
          message.success('删除成功', 2)
        } catch (error) {
          message.error('删除失败' + error)
        }

      },
      onCancel() { },
    });
  };
  useEffect(() => {
    getRightChildren().then((res: any) => {
      let data: any = fromJS(res).toJS();
      let newData = getNewDataList(data);
      console.log(newData);
      setdataTable(newData)
    })
  }, [])

  return (
    <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <Table columns={columns} dataSource={dataTable} pagination={
          {
            pageSize: 5
          }
        } />
      </div>
    </div>


  )
}

export default Index;