import React, { Component, } from 'react'

import { searchProduct } from '../../api/api'
import MyLabel from '../../components/myLabel'

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
      const { name, price, up, picture, detial } = res.data[0]
      this.setState({
        name,
        price,
        up,
        picture,
        detial
      })
    })
  }

  render() {
    const { name, price, up, picture, detial } = this.state
    return (
      <>
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
        <MyLabel label='商品名称'>{name}</MyLabel>
        <MyLabel label='商品价格'>{price}</MyLabel>
        <MyLabel label='上架情况'>{up === 1 ? '已上架' : '未上架'}</MyLabel>
        <MyLabel label='商品信息'>{detial}</MyLabel>
        <img src={picture} alt='' style={{ width: '200px', height: '200px' }} />
      </>
    );
  }
}

export default Detial;