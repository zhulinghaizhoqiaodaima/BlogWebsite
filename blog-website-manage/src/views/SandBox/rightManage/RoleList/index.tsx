import { Table, Button, Modal, Tree, message } from 'antd';
import { DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import type { TreeProps } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import { getRoles, deleteRoles,patchRoles} from '../../../../api/rolesCurd'
import { getRightChildren } from '../../../../api/rigthsCurd'
import { fromJS } from 'immutable'
interface DataType {
  id: number;
  roleName: string;
}
const Role = () => {
  const [roleData, setroleData] = useState([])
  const [isOpenModal, setisOpenModal] = useState(false)
  const [rightList, setrightList] = useState([])
  const [myCheckedKeys, setmyCheckedKeys] = useState([])
  const [rolesId, setrolesId] = useState(0)
  const showModal = (item:any) => {
    console.log(item);
    setmyCheckedKeys(item.rights)
    setrolesId(item.id)
    setisOpenModal(true);
  };

  const handleOk = () => {
    let newData:any = [...roleData];
    setroleData(newData.map((item:any)=>{
      if(item.id === rolesId) {
        return {
          ...item,
          rights:myCheckedKeys,
        }
      }
      return item;
    }))
    patchRoles(rolesId,{rights:myCheckedKeys}).then(res=>{
      message.success("修改成功")
    }).catch(err=>{
      message.error("修改失败")
    })
    setisOpenModal(false);
  };

  const handleCancel = () => {
    setisOpenModal(false);
  };
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys:any, info:any) => {
    setmyCheckedKeys(checkedKeys?.checked)
  };
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
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
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
                // console.log(item.id);

                deleteRoles(item.id).then(res => {
                  message.success('删除成功')
                  getRoles().then((res: any) => {
                    let newData: any = fromJS(res).toJS();
                    setroleData(newData)
                  })
                }).catch(err => {
                  message.error("删除失败" + err)
                })
              }}
            />
            {` `}

            <Button type='primary' icon={<UnorderedListOutlined />} onClick={()=>{
              showModal(item)
            }} size='middle' shape="circle" />
            <Modal title="权限管理" open={isOpenModal} onOk={handleOk} onCancel={handleCancel} >
              <Tree
                checkable
                onSelect={onSelect}
                onCheck={onCheck}
                treeData={rightList}
                checkedKeys={ myCheckedKeys }
                checkStrictly = {true} // 父子节点不在关联，完全受控状态
              />
            </Modal>
          </div>
        )
      }
    }
  ];
  useEffect(() => {
    //请求roles数据
    getRoles().then((res: any) => {
      let newData: any = fromJS(res).toJS();
      setroleData(newData)
    })
  }, [])
  useEffect(() => {
    getRightChildren().then((res: any) => {
      let newData: any = fromJS(res).toJS();
      setrightList(newData)
    })
  }, [])

  return (
    <Table rowKey={'id'} columns={columns} dataSource={roleData} />
  )
};

export default Role;