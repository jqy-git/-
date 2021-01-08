import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, HomeOutlined, AppstoreOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { Switch, Route, Redirect } from 'react-router-dom'

import { removeToken } from '../utils/auth'
import './componentStyles/myLayout.css'
import logo from '../pics/logo.jpg'
import { mainRoutes } from '../routes/routers'
import { getIndex, setIndex, getDefaultOpenKeys, setDefaultOpenKeys, removeDefaultOpenKeys, removeIndex } from '../utils/history'

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu

class MyLayOut extends Component {

	constructor(props) {
		super(props)
		this.state = {
			userName: localStorage.getItem('username'),
			nowTime: new Date().toLocaleTimeString(),
			setTime: '',
			currentIndex: getIndex() || '1',
			defaultOpenKeys: getDefaultOpenKeys(),
		}
	}

	componentDidMount() {
		var setTime = setInterval(() => {
			this.setState({
				nowTime: new Date().toLocaleTimeString(),
				setTime
			})
		}, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.state.setTime)
	}

	exit = (e) => {
		removeToken()
		removeDefaultOpenKeys()
		removeIndex()
		e.preventDefault();
		this.props.history.push('/login')
	}

	gotoPages = (currentIndex) => {
		switch (currentIndex) {
			case '1': {
				this.props.history.push('/main/home'); break;
			}
			case '2': {
				this.props.history.push('/main/normalList'); break;
			}
			case '3': {
				this.props.history.push('/main/specialList'); break;
			}
			case '4': {
				this.props.history.push('/main/vipList'); break;
			}
			default: this.props.history.push('/404')
		}
	}

	clickItem = ({ item, key, keyPath, domEvent }) => {

		setIndex(key)

		if (keyPath.length === 2) {
			setDefaultOpenKeys(keyPath[1])
		} else {
			removeDefaultOpenKeys()
		}

		this.gotoPages(key)
	}

	render() {
		const { userName, nowTime, currentIndex, defaultOpenKeys } = this.state
		return (
			<Layout style={{ height: "780px" }}>
				<Sider
					breakpoint="lg"
					collapsedWidth="0"
				>
					<div className="logo" />
					<Menu theme="dark" mode="inline"
						defaultOpenKeys={[defaultOpenKeys]}
						defaultSelectedKeys={[currentIndex]}
						onClick={this.clickItem}
					>
						<Menu.Item key="1" icon={<HomeOutlined />}>
							首页
                </Menu.Item>
						<SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
							<Menu.Item key="2" >一般商品</Menu.Item>
							<Menu.Item key="3" >特价商品</Menu.Item>
							<Menu.Item key="4" >会员商品</Menu.Item>
						</SubMenu>
						<Menu.Item key="5" icon={<UserOutlined />}>
							用户管理
                </Menu.Item>
						<Menu.Item key="6" icon={<CheckSquareOutlined />}>
							订单管理
                </Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Header className="site-layout-sub-header-background"
						style={{ padding: 0, lineHeight: "35px", height: "90px" }}>
						<img src={logo} alt='' style={{ width: "100px", height: "80px", margin: "10px 20px 0px 20px" }} />
						<span style={{ fontSize: "30px" }} >商业管理平台</span>
						<span style={{ float: "right", marginRight: "30px" }}>欢迎您，{userName}
							<a href="login" onClick={this.exit} style={{ marginLeft: "30px" }} >退出</a>
							<br /><hr />{nowTime}</span>
					</Header>
					<Content style={{ margin: '24px 16px 0' }}>
						<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
							<Switch>
								{mainRoutes.map(route => {
									return <Route key={route.path} path={route.path} exact
										render={routeProps => <route.component {...routeProps} />} ></Route>
								})}
								<Redirect to='/main/home' from='/main' />
								<Redirect to='/404' />
							</Switch>
						</div>
					</Content>
				</Layout>
			</Layout>
		)
	}
}

export default MyLayOut