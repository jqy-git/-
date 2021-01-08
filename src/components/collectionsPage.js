import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, notification } from 'antd';

const { Option } = Select;

const CollectionCreateForm = ({ visible, onCreate, onCancel, product, getList, action }) => {
  const [form] = Form.useForm();

  const title = `${action}商品信息`
  const okText = `确认${action}`
  const cancelText = `取消${action}`

  return (
    <Modal
      visible={visible}
      title={title}
      okText={okText}
      cancelText={cancelText}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields() //表单校验
          .then((values) => {
            form.resetFields();
            onCreate(values, getList, form);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        // initialValues={{
        //   modifier: 'public',
        // }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        initialValues={{
          name: product.name,
          price: product.price,
          up: product.up === 1 ? '已上架' : '未上架'
        }}
      >
        <Form.Item name='name' label='商品名称' >
          <Input type="textarea" />
        </Form.Item>

        <Form.Item name='price' label='商品价格'>
          <Input type="textarea" />
        </Form.Item>

        <Form.Item name='up' label='上架情况'>
          <Select>
            <Option value="0">未上架</Option>
            <Option value="1">已上架</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const CollectionsPage = (props) => {
  const getList = props.getList
  const action = props.action
  const actionApi = props.actionApi
  const product = props.product
  const [visible, setVisible] = useState(false);

  //操作是否成功的通知框
  const openNotificationWithIcon = data => {
    notification[data.code]({
      description: data.msg
    });
  };

  //确认按钮事件
  const onCreate = (product, getList, form) => {
    actionApi({ product })
      .then(res => {
        openNotificationWithIcon(res.data)
        form.setFieldsValue({...product})
      })
    setVisible(false);
    getList()
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        {action}
      </Button>
      <CollectionCreateForm
        visible={visible}
        getList={getList}
        product={product}
        action={action}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};