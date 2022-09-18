import { Button } from 'antd';
import NewsPublish from '../../../../components/PublishMange/NewsPublish'
import usePublish from '../../../../components/PublishMange/usePublish'
function Unpublished() {
  //1-已下线
  const {tableData,handleDelete} = usePublish(3)

  return (
    <div>
        <NewsPublish data= {tableData as any}  button={(id:any)=> 
          <Button type='primary' size='middle' danger onClick={() =>handleDelete(id)}> 删除 </Button>
        }></NewsPublish>
    </div>
  )
}

export default Unpublished