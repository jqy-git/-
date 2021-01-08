import React, { Component, } from 'react'
import { Form, Input, Select } from 'antd'

import MyUpLoad from '../../components/myUpLoad'
import { searchProduct } from '../../api/api'

const { Item } = Form
const { Option } = Select
const { TextArea } = Input

class Detial extends Component {
  state = {
    name: '',
    price: '',
    up: '',
    picture: '',
    detial: ''
  }

  onFinish = (value) => {
    console.log(value);
  }

  componentDidMount() {
    this.getList()
  }

  getList = () => {
    const {
      match: { params },
    } = this.props;

    searchProduct(params).then(res => {
      this.setState({
        name: res.data[0].name,
        price: res.data[0].price,
        up: res.data[0].up,
        picture: res.data[0].picture,
        detial: res.data[0].detial,
      })
    })
  }

  render() {
    const { name, price, up, picture, detial } = this.state

    return (
      <div>
        <h1 style={{ marginBottom: '25px' }} >
          <span
            onClick={() => this.props.history.push('/main/normalList')}
            style={{ cursor: 'pointer' }} >
            商品
          </span>
          <span> / </span>
          <span>商品详情</span>
        </h1>
        <hr style={{ backgroundColor: '#F0F0F0', height: '1px', border: 'none' }} />
        <Form
          onFinish={this.onFinish}
          initialValues={{
            name,
            price,
            up,
            picture,
            detial
          }}
        >

          <div style={{ display: 'flex', marginLeft: '27vw' }} >
            <div style={{ width: '300px' }}>
              <Item name='name' label='商品名称'>
                <Input style={{ width: '200px' }} />
              </Item>
              <Item name='price' label='商品价格'>
                <Input style={{ width: '200px' }} />
              </Item>
              <Item name='up' label='上架情况'>
                <Select style={{ width: '200px' }} >
                  <Option value="0">未上架</Option>
                  <Option value="1">已上架</Option>
                </Select>
              </Item>
            </div>

            <Item name='picture' style={{ margin: '25px' }} >
              <MyUpLoad picture={picture} />
            </Item>
          </div>
          <Item name='detial' >
            <TextArea style={{ width: '480px', marginLeft: '25vw' }} rows='6' />
          </Item>
          {/* <Item>
            <Button type='primary' htmlType='submit' style={{ marginLeft: '37vw' }} >提交</Button>
          </Item> */}
        </Form>
      </div>
    );
  }
}

export default Detial;