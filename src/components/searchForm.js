import React, { useState } from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

export const UpSelect = ({ value = {}, onChange }) => {
  const [up, setup] = useState('');

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        up,
        ...value,
        ...changedValue,
      });
    }
  };

  const onupChange = (newup) => {
    if (!('up' in value)) {
      setup(newup);
    }

    triggerChange(
      { up: newup }
    );

  };

  return (
    <span>
      <Select
        value={value.up || up}
        style={{
          width: 80,
          margin: '0 8px',
        }}
        onChange={onupChange}
      >
        <Option value="0">未上架</Option>
        <Option value="1">已上架</Option>
      </Select>
    </span>
  );
};

export const SearchForm = (props) => {
  let product = {}
  const getList = props.getList
  let element = ''
  if(props.element) element = props.element

  const onFinish = (values) => {
    Object.keys(values).forEach(function (key) {
      if (typeof (values[key]) !== 'object') {
        product = { ...product, [key]: values[key] }
      } else {
        //将values中对象取出
        let newValue = values[key]
        Object.keys(newValue).forEach(function (key) {
          product = { ...product, [key]: newValue[key] }
        })
      }
    })
    getList(product)
  };

  return (
      <Form
        name="customized_form_controls"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="商品名称"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="商品价格"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="up"
          label="上架状态"
        >
          <UpSelect />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
        </Button>
        </Form.Item>
        <Form.Item>
          <Button type="danger" onClick={()=>getList()}>
            重置
        </Button>
        </Form.Item>
        <Form.Item style={{marginLeft:'20vw'}} >
        {element}
        </Form.Item>
      </Form>
  );
};