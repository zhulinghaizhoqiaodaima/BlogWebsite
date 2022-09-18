/* eslint-disable jsx-a11y/anchor-is-valid */
import { InputRef, message } from 'antd';
import { Button, Form, Input, Modal, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ExclamationCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { deleteCategory, getCategories, updateCategory } from '../../../../api/categoriesCurd';
import { fromJS } from 'immutable';
const { confirm } = Modal;

const EditableContext = React.createContext<FormInstance<any> | null>(null);
interface Item {
  value: string;
  key: string;
  id: string;
  title: string;
}
interface EditableRowProps {
  index: number;
}
interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;
  const [titleValue, settitleValue] = useState('')
  const toggleEdit = () => {
    setEditing(!editing);
    if(!editing) {
      settitleValue(record[dataIndex])
    }
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };
  const save = async () => {
    try {      
      toggleEdit();
      record.title = titleValue
      record.value = titleValue
      handleSave({ ...record});
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        id={dataIndex}
      >
        <Input ref={inputRef} value={titleValue} onPressEnter={save} onBlur={save} onChange={(evt)=>{
          settitleValue(evt.target.value)
        }} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};


const NewsCategory = () => {
  const [dataSource, setDataSource] = useState([]);
  const defaultColumns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '30%',
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      onCell: (record: any) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: '栏目名称',
        handleSave: handleSave,
      }),
    },
    {
      title: '操作',
      render: (item: any) => {
        return (
          <div>
            <Button
              type='primary'
              danger
              icon={<DeleteOutlined />}
              size='middle'
              shape="circle"
              onClick={() => {
                handleDeleteCategory(item)
              }}
            />
          </div>
        )
      }

    },
  ];

  const handleDeleteCategory = (item: any) => {
    confirm({
      title: '确认发布?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        deleteCategory(item.id).then((res: any) => {
          getInit()
          message.success("删除成功")
        })
      },
      onCancel() { },
    });
  }
  const getInit = () => {
    // const { roleId, region, username } = JSON.parse(localStorage.getItem("token") as any)
    getCategories().then((res: any) => {
      console.log(res);
      
      let data = fromJS(res).toJS()
      setDataSource(data)
    })
  }
  useEffect(() => {
    getInit()
  }, [])
  const handleSave = (row: any) => {
    updateCategory(row.id,row).then((res:any)=>{
        getInit()
        message.success("修改成功",2)
    })
  };
  const handleAdd = () => {

  }
  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        添加分类
      </Button>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          }
        }}
        dataSource={dataSource}
        columns={defaultColumns}
        rowKey={(item:any)=>item.id}
      />
    </div>
  );
};

export default NewsCategory;
