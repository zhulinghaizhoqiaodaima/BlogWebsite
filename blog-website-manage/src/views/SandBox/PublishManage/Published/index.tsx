import { Button } from 'antd';
import NewsPublish from '../../../../components/PublishMange/NewsPublish'
import usePublish from '../../../../components/PublishMange/usePublish'

function Published() {
  const {tableData,handleOffline} = usePublish(2)
  return (
    <div>
        <NewsPublish data= {tableData as any}  button={(id:any)=> 
          <Button type='primary' size='middle' danger onClick={() =>handleOffline(id)}> 下线 </Button>
        }></NewsPublish>
    </div>
  )
}

export default Published