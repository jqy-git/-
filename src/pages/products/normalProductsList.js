import React, { Component } from 'react'
import { Button, Table, Popconfirm, notification } from 'antd'

import { delProduct, searchProduct } from '../../api/api'
import EditProduct from './editProduct'
import CreateProduct from './createProduct'
import { SearchForm } from '../../components/searchForm'

export default class normalProductsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: '',
      loading: true,
      pagination: {
        defaultPageSize: 4,
        currentPage: 1
      }
    }
  }

  componentDidMount() {
    this.getList()
  }

  getList = (product) => {
    this.setState({ loading: true })
    const postDate = { ...product, ...this.state.pagination }
    searchProduct(postDate).then(res => {
      this.setState({ dataSource: res.data, loading: false })
    })
  }

  openNotificationWithIcon = data => {
    notification[data.code]({
      description: data.msg
    });
  }

  confirm = (name) => {
    delProduct({ name })
      .then(this.getList())
      .then(res => this.openNotificationWithIcon(res.data))
  }

  render() {
    const { dataSource, loading, pagination } = this.state
    const element = <CreateProduct product={{}} getList={this.getList} />
    const columns = [
      {
        title: '序号',
        width: '80px',
        align: 'center',
        render: (product, content, index) => <span>{index + 1}</span>
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        align: 'center',
        render: (name) => <span style={{cursor:'pointer'}} onClick={()=>this.props.history.push(`/main/detials/${name}`)} >{name}</span>
      },
      {
        title: '商品价格',
        dataIndex: 'price',
        align: 'center',
      },
      {
        title: '商品图片',
        // dataIndex: 'picture',
        align: 'center',
        render: (product) => {
          const { picture } = product
          if (picture) return <img src={picture} alt='' style={{ width: '8vw', height: '10vh' }} />
        }
      },
      {
        title: '上架状态',
        dataIndex: 'up',
        align: 'center',
        render: (product) => {
          if (product === 1) return <span>已上架</span>
          else if (product === 0) return <span>未上架</span>
        }
      },
      {
        title: '操作',
        align: 'center',
        width: '240px',
        render: (product) => (
          <div>
            <EditProduct product={product} getList={this.getList} />
            <Popconfirm
              title="确定要删除这个商品吗?"
              onConfirm={() => this.confirm(product.name)}
              okText="删除"
              cancelText="取消"
            >
              <Button type="danger">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    ]

    return (
      <div>
        <SearchForm getList={this.getList} element={element} />
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey='name'
          loading={loading}
          pagination={pagination}
        />
      </div>
    )
  }
}
