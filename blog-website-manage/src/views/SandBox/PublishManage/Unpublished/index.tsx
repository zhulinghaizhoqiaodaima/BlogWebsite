import { Button } from 'antd'
import NewsPublish from '../../../../components/PublishMange/NewsPublish'
import usePublish from '../../../../components/PublishMange/usePublish'

function Unpublished() {
  //1-待发布
  const {tableData,handlePublish} = usePublish(1)

  return (
    <div>
      <NewsPublish data={tableData as any} button={(id:any)=> 
          <Button type='primary' size='middle' onClick={() =>handlePublish(id)}> 发布 </Button>
        }>
      </NewsPublish>
    </div>
  )
}

export default Unpublished