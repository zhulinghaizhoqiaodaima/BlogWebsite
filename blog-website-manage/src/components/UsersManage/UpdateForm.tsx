import  { forwardRef,useEffect,useState } from 'react'
import {Form,Input,Select} from 'antd'
const {Option}  = Select
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
const UserForm = forwardRef((props:any,ref:any) => {
      // 1:"super",
    // 2:"admin",
    // 3:"editor"
    const { roleId,region  } = JSON.parse(localStorage.getItem("token") as any)
    const [isDisabled, setisDisabled] = useState(false)
    const {RegionsList = [],RolesList =[],isUpdateDisabled} = props || {}
    let newRoleList = filterRoles(RolesList,roleId)
    let newRegionsList = filterRegions(RegionsList,roleId,region)
    useEffect(()=>{
        setisDisabled(isUpdateDisabled)
    },[isUpdateDisabled])

    return (
        <Form
            ref={ref}
            layout="vertical"
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={isDisabled?[]:[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Select disabled={isDisabled}>
                    {
                       newRegionsList.map((item:any) =>
                            <Option value={item.value} key={item.id}>{item.title}</Option>
                        )
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Select onChange={(value)=>{
                    // console.log(value)
                    if(value === 1){
                        setisDisabled(true)
                        ref.current.setFieldsValue({
                            region:""
                        })
                    }else{
                        setisDisabled(false)
                    }
                }}>
                    {
                       newRoleList.map((item:any) =>
                            <Option value={item.id} key={item.id}>{item.roleName}</Option>
                        )
                    }
                </Select>
            </Form.Item>
        </Form>
    )
})
export default UserForm