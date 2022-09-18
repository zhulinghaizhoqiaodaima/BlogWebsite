/* eslint-disable react-hooks/exhaustive-deps */
import { fromJS } from 'immutable'
import  { useEffect, useState } from 'react'
import { deletenewsOne, getNewPublish, UpdateNews } from '../../../api/newsCurd'
import { message, Modal } from 'antd';
const { confirm } = Modal;
function usePublish(publishState:any) {
  const [tableData, settableData] = useState([])
  const getInit = () => {
    const { username } = JSON.parse(localStorage.getItem("token") as any)
    getNewPublish(username, publishState).then((res: any) => {
      let data = fromJS(res).toJS();
      console.log(data);
      
      settableData(data);
    })
  }
  const handlePublish = (id: any) => {
    confirm({
      title: '确认发布?',
      // icon: <ExclamationCircleOutlined />,
      async onOk() {
        UpdateNews(id,{
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
  const handleOffline = (id: any) => {
    confirm({
      title: '确认下线?',
      async onOk() {
        UpdateNews(id,{
          publishState:3,
        }).then((res:any)=>{
          getInit()
          message.success("下线成功")
        })
      },
      onCancel() { },
    });
  };
  const handleDelete = (id: any) => {
    confirm({
      title: '确认删除?',
      // icon: <ExclamationCircleOutlined />,
      async onOk() {
        deletenewsOne(id).then((res:any)=>{
          getInit()
          message.success('删除成功',2)
        })
      },
      onCancel() { },
    });
  };
  useEffect(() => {
    getInit()
  },[])
  return {tableData,handlePublish,handleOffline,handleDelete}
}
export default usePublish;
