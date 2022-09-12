/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, Button, Modal, Switch, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState, useRef } from 'react';
import { getUsers, postUsers, deleteUsers, patchUsers } from '../../../api/userCurd'
import { fromJS } from 'immutable'
import UsersForm from '../../../components/UsersManage/UsersForm';
import { getRoles } from '../../../api/rolesCurd'
import { getRegions } from '../../../api/regions'
import UpdateForm from '../../../components/UsersManage/UpdateForm'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
const { confirm } = Modal;
interface DataType {
  default: boolean | undefined;
  region: string,
  id: number,
  role: any,
  username: string,
  roleState: boolean,
}

const Index = () => {
  const updateForm = useRef(null)
  const [dataTable, setdataTable] = useState([])
  const [RolesList, setRolesList] = useState([])
  const [RegionsList, setRegionsList] = useState([])
  const [isVisible, setisVisible] = useState(false)
  const [isUpdateDisabled, setisUpdateDisabled] = useState(false)
  const [currentItem, setcurrentItem] = useState(null)
  const columns: ColumnsType<DataType> = [
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
      filters: [
        ...RegionsList.map((item: any) => ({
          text: item.title,
          value: item.value,
        })),
        {
          text: "全球",
          value: "全球",
        }
      ],
      onFilter: (value: any, item) => {

        return value === item.region;
      },
      render: (region) => {
        return <b>{region === '' ? "全球" : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        return role.roleName
      }
    },
    {
      title: '用户名称',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      key: 'roleState',
      render: (roleState, item) => {
        return (<div style={{ textAlign: "center" }}>
          <Switch checked={roleState} disabled={item.default} onChange={() => {
            console.log(item);
            patchUsers(item.id, {
              roleState: !item.roleState
            }).then((res: any) => {
              initUserData()
              console.log(res);
              message.success("修改成功", 2)

            }).catch((err: any) => {
              message.error(`修改失败${err}`)
            })
          }}></Switch>
        </div>)
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
              disabled={item.default}
            />
            {` `}
            <Button type='primary' icon={<EditOutlined />} size='middle' shape="circle" disabled={item.default} onClick={() => {
              updatePromiseConfirm(item)
            }} />

          </div>
        )
      }
    }
  ];
  const showPromiseConfirm = (item: any) => {
    confirm({
      title: '是否要删除这个用户',
      icon: <ExclamationCircleOutlined />,
      // content: '单击“确定”按钮后,该对话框将在1秒后关闭',
      async onOk() {
        // console.log(item);
        deleteUsers(item.id).then(res => {
          initUserData()
          message.success("删除成功", 2)
        }).catch(err => {
          message.error(`删除失败${err}`)
        })
      },
      onCancel() { },
    });
  };
  const updatePromiseConfirm = async (item: any) => {
    setcurrentItem(item)
    await setisVisible(true) // 是有影响的
    if (item.roleId === 1) {
      //禁用
      setisUpdateDisabled(true)
    } else {
      //取消禁用
      setisUpdateDisabled(false)
    }
    let formValue: any = updateForm?.current
    formValue.setFieldsValue(item)
  }
  const initUserData = async () => {
    const { roleId, region,username } = JSON.parse(localStorage.getItem("token") as any)
    // 1:"super",
    // 2:"admin",
    // 3:"editor"
    const res = await getUsers();
    let data: any = fromJS(res).toJS();
    let newData = roleId === 1 ? data : [
      ...data.filter((child: any)=>child.username===username),
      ...data.filter((child: any)=>child.region===region&& child.roleId > roleId )
    ]
    console.log("🚀 ~ file: index.tsx ~ line 159 ~ initUserData ~ newData", newData)
    setdataTable(newData);
  }
  useEffect(() => {
    initUserData()
  }, [])
  useEffect(() => {
    getRoles().then((res: any) => {
      let data: any = fromJS(res).toJS();
      setRolesList(data)
    })
  }, [])
  useEffect(() => {
    getRegions().then((res: any) => {
      let data: any = fromJS(res).toJS();
      setRegionsList(data)
    })
  }, [])

  const updateOK = () => {
    let updateValue: any = updateForm?.current;
    updateValue.validateFields().then((res: any) => {

      patchUsers((currentItem as any)?.id, {
        ...res
      }).then((res: any) => {
        initUserData()
        console.log(res);
        setisVisible(false)
        message.success("修改成功", 2)

      }).catch((err: any) => {
        message.error(`修改失败${err}`)
      })
    })
  }
  const getSubmit = (data: any) => {
    const newData = {
      ...data,
      roleState: true,
      default: false,
    }
    if (newData.region === undefined) newData.region = "";
    postUsers(newData).then((res: any) => {
      initUserData()
      message.success("添加成功", 2)
    }).catch((err: any) => {
      message.error("添加失败" + err)
    })

  }
  return (
    <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
      {/* 新增表单 */}
      <UsersForm
        RolesList={RolesList}
        RegionsList={RegionsList}
        getSubmit={(data: any) => getSubmit(data)}

      ></UsersForm>

      {/* 更新表单 */}
      <Modal
        style={{textAlign:"center"}}
        open={isVisible}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setisVisible(false)
          setisUpdateDisabled(!isUpdateDisabled)
        }}
        onOk={() => updateOK()}
      >
        <UpdateForm RegionsList={RegionsList} RolesList={RolesList}
          ref={updateForm} isUpdateDisabled={isUpdateDisabled}
        ></UpdateForm>
      </Modal>
      {/* 用户列表 */}
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

export default Index;

