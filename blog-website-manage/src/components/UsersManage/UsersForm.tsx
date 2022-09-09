import React, { useState } from 'react';
import { Form, Input, Select, Button, Modal } from 'antd';

const { Option } = Select;

interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}
interface Values {
    title: string;
    description: string;
    modifier: string;
}

const filterRoles = (RolesList:any [],id:number):any=>{
    if(RolesList.length === 0 || id ===1) return RolesList; 
    if(id ===2) return RolesList.slice(1)
    if(id ===3) return RolesList.slice(2)
}
const filterRegions = (RegionsList:any [],id:number,region:any):any=>{
    if(RegionsList.length === 0 || id ===1) return RegionsList; 
    return RegionsList.filter((item:any)=>{
        return item.value === region
    })
}
function UsersForm(props: any) {
     // 1:"super",
    // 2:"admin",
    // 3:"editor"
    const { roleId,region  } = JSON.parse(localStorage.getItem("token") as any)
    const [open, setOpen] = useState(false);
    const [isDisable, setisDisable] = useState(false)
    const { RolesList = [], RegionsList = [], getSubmit } = props || {}
    let newRoleList = filterRoles(RolesList,roleId)
    let newRegionsList = filterRegions(RegionsList,roleId,region)

    const onCreate = (values: any) => {
        getSubmit(values)
        console.log('Received values of form: ', values);
        setOpen(false);
    };
    const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
        open,
        onCreate,
        onCancel,
    }) => {
        const [form] = Form.useForm();
        return (
            <Modal
            style={{textAlign:"center"}}
                open={open}
                title="添加用户"
                okText="确定"
                cancelText="取消"
                onCancel={onCancel}
                onOk={() => {
                    form.validateFields()
                        .then(values => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="region"
                        label="区域"
                        rules={isDisable ? [] : [{ required: true, message: '请输入区域' }]}
                    >
                        <Select
                            placeholder="选择区域"
                            // onChange={}
                            allowClear
                            disabled={isDisable}
                        >

                            {
                                newRegionsList.map((item: any) => {
                                    return (
                                        <Option key={item.id} value={item.value}>{item.title}</Option>
                                    )
                                })
                            }

                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="roleId"
                        label="角色"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="选择角色"
                            onChange={(data) => {
                                console.log(data);
                                if (data === 1) {
                                    setisDisable(true)
                                } else {
                                    setisDisable(false)
                                }

                            }}
                            allowClear
                        >

                            {
                                newRoleList.map((item: any) => {
                                    return (
                                        <Option key={item.id} value={item.id}>{item.roleName}</Option>
                                    )
                                })
                            }

                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        );
    };
    return (
        <div>
            <Button type='primary' style={{ width: "15%", borderRadius: "2px", marginBottom: "5px" }}
                onClick={() => {
                    setOpen(true);
                }}
            >添加用户</Button>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    )
}

export default UsersForm