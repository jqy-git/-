import React, { Component } from 'react'
import { Card, Col, Row, Statistic } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import LineEcharts from '../components/lineEcharts'

export default class home extends Component {

  constructor() {
    super()
    this.state = {
      userNum: 2548,
      userIncrease: 25,
      orderNum: 7854,
      orderIncrease: 984,
      currentIndex:'',
      echart:{
        xAxis:{
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis:{
          type: 'value'
        },
        series:[{
          name: '用户总数',
          type: 'line',
          // smooth: true,
          data: [25, 132, 198, 268, 320, 367, 485]
      },
      {
          name: '当日新增用户',
          type: 'line',
          // smooth: true,
          data: [25, 110, 66, 70, 52, 47, 118]
      },
      {
          name: '订单总数',
          type: 'line',
          // smooth: true,
          data: [15, 23, 28, 34, 45, 50, 65]
      },
      {
          name: '当日成交订单',
          type: 'line',
          // smooth: true,
          data: [15, 8, 5, 6, 11, 5, 15]
      }],
        type:'line'
      }
    }
  }

  render() {
    const { userNum, userIncrease, orderNum, orderIncrease, echart } = this.state
    return (
      <div>
        <h1 style={{ margin: '20px' }} ><b>数据汇总</b></h1>
        <hr style={{ margin: '20px 0', backgroundColor: '#F0F0F0', height: '1px', border: 'none' }} />
        <Row gutter={16} style={{ margin: '20px' }} >
          <Col span={12}>
            <Card title="用户统计">
              <Statistic
                style={{ float: 'left', marginRight: '3vw' }}
                title="用户总数"
                value={userNum}
                // precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              // suffix="%"
              />

              <Statistic
                style={{ float: 'left', marginRight: '3vw' }}
                title="今日新增"
                value={userIncrease}
                // precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              // suffix="%"
              />

              <Statistic
                style={{ float: 'left' }}
                title="同比增长"
                value='-15.23'
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12} >
            <Card title="订单统计" >
              <Statistic
                style={{ float: 'left', marginRight: '3vw' }}
                title="订单总数"
                value={orderNum}
                // precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              // suffix="%"
              />

              <Statistic
                style={{ float: 'left', marginRight: '3vw' }}
                title="今日成交"
                value={orderIncrease}
                // precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              // suffix="%"
              />

              <Statistic
                style={{ float: 'left' }}
                title="同比增长"
                value='-5.48'
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <h1 style={{ margin: '20px' }} ><b>图表统计</b></h1>
        <hr style={{ margin: '20px 0', backgroundColor: '#F0F0F0', height: '1px', border: 'none' }} />
        <LineEcharts echart={echart} />
      </div>
    )
  }
}
