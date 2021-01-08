import React from 'react';
import { Card } from 'antd';
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class LineEcharts extends React.Component {
	state = {
		echart: this.props.echart
	}

	getOption = () => {
		const { xAxis, yAxis, series } = this.state.echart
		let option = {
			// title: {
			//     text: ''
			// },
			//提示框
			tooltip: {
				trigger: 'axis'
			},
			//图例
			legend: {
				data: ['用户总数', '当日新增用户', '订单总数', '当日成交订单']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			xAxis,
			yAxis,
			series
		};

		return option
	}

	render() {
		return (
			<Card title="">
				<ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: '400px' }} />
			</Card>
		)
	}
}