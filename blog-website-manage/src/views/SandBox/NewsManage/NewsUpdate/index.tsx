import { PageHeader, Steps, Button, message, Form, Input, Select } from 'antd';
import { fromJS } from 'immutable';
import React, { useEffect, useRef, useState } from 'react';
import { getCategories } from '../../../../api/categoriesCurd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// 引入本页面样式加载文件
import { UpdateNews, getNewsOne } from '../../../../api/newsCurd';
import { useNavigate, useParams } from 'react-router-dom';

const { Step } = Steps;
const { Option } = Select;
const steps = [
  {
    title: '基本信息',
    description: '新闻标题，新闻分类',
    content: '新闻标题，新闻分类',
  },
  {
    title: '新闻内容',
    description: '新闻主体内容',
    content: '新闻主体内容',
  },
  {
    title: '新闻提交',
    description: '保存草稿',
    content: '保存草稿',
  },
];

const NewsUpdate = () => {
  const navigate = useNavigate();
  let params = useParams();
//   const [newInfo, setnewInfo] = useState(null as any)
  const [current, setCurrent] = useState(0);
  const [categoryList, setcategoryList] = useState([])
  const [editorValue, seteditorValue] = useState('');
  const [formInfo, setformInfo] = useState({
    title: "",
    categoryId: null,
  })
  const newsForm: any = useRef(null)
  const next = () => {
    if (current === 0) {
      newsForm.current.validateFields().then((res: any) => {
        const { newsTitle, newsCategoryId } = res;
        setformInfo({
          title: newsTitle,
          categoryId: newsCategoryId,
        } as any)

        setCurrent(current + 1);
      }).catch((err: any) => {
        console.log(err);
      })
    } else {
      if (!editorValue) {
        message.error("新闻主体不能为空")
      } else {
        setCurrent(current + 1);
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onSubmit = async (publishState: number) => {
    
    const { id } = params;
    let data = {
      ...formInfo,
      content:editorValue,
      auditState:publishState,
    }
    UpdateNews(id,data).then((res:any)=>{
        console.log(res);
        message.success("保存成功",2)
        navigate('/news-manage/draft')
        
    }).catch((err:any)=>{
      message.error(err,2)
    })
  }

  useEffect(() => {
    const { id } = params;
    getNewsOne(id).then((res: any) => {
      let {title,categoryId}  = res;
      newsForm.current.setFieldsValue({
        newsTitle: title,
        newsCategoryId: categoryId,
      })
      seteditorValue(res.content)
    }).catch((err: any) => {
      console.log(err);
    })
  }, [params])
  useEffect(() => {
    getCategories().then((res: any) => {
      let data: any = fromJS(res).toJS();
      setcategoryList(data);
    })
  }, [])

  return (
    <>
      <PageHeader
        className="site-page-header"
        style={{ border: " 1px solid rgb(235, 237, 240)" }}
        title="编辑新闻"
        onBack={()=>{navigate(-1)}}
      />
      <div>
        <Steps current={0}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} description={item.description} />
          ))}
        </Steps>
        <div className="steps-content" style={{ marginTop: "50px", display: "grid", justifyItems: "center", alignItems: "center" }} hidden={false}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ width: "600px" }}
            ref={newsForm}
            hidden={current !== 0}
          >
            <Form.Item
              label="新闻标题"
              name="newsTitle"
              rules={[{ required: true, message: '请输入新闻标题' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="新闻分类"
              name="newsCategoryId"
              rules={[{ required: true, message: '请选择新闻分类' }]}
            >
              <Select>
                {
                  categoryList.map((item: any) => (<Option value={item.id} key={item.id}>
                    {item.title}
                  </Option>))
                }

              </Select>
            </Form.Item>
          </Form>

        </div>

        <div style={{ display: "flex", height: "40%", flexDirection: "column" }}>
          <div hidden={current !== 1} style={{ height: "auto" }} >
            <ReactQuill style={{ background: "#ffffff" }}
              theme="snow"
              value={editorValue}
              onChange={(value) => {
                console.log(value);
                seteditorValue(value)
              }} />
          </div>

        </div>
        <div className="steps-action" style={{ textAlign: "center",marginTop: "30px" }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <>
              <Button type="primary" danger onClick={() => onSubmit(0)}>
                保存草稿箱
              </Button>
            </>
          )}

          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              上一步
            </Button>
          )}
        </div>
      </div>
    </>
  )
};

export default NewsUpdate;