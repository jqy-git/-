import { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'

import { setToken, getUser, setUser, removeUser } from '../utils/auth'
// import { getUserNameAction } from '../store/actionCreators'
// import store from '../store'
import { loginApi } from '../api/api'

import './login.css'

class Login extends Component {
  toRegister = (e) => {
    e.preventDefault();
    this.props.history.push('/register')
  }
  render() {
    const onFinish = (values) => {
      const { username, password, remember } = values
      loginApi({
        username,
        password
      }).then(res => {
        if (res.data.code !== '0000') {
          alert(res.data.msg)
          return
        }
        // const action = getUserNameAction(values.username)
        // store.dispatch(action)
        if(remember) setUser(username, password, remember)
        else removeUser()
        setToken(res.data.token);
        this.props.history.push('/main')
      })
    };

    return (
      <div className='whole'>
        <Form
          id="form"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: getUser().remember,
            username:getUser().username,
            password: getUser().password
          }}
          onFinish={onFinish}
        >
          <p style={{ fontSize: "30px", marginLeft: "130px" }}>登录</p>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button"
              style={{ marginLeft: "50px", width: "120px" }}>
              Log in
          </Button>
            <Button type="primary" htmlType="submit" className="login-form-button"
              style={{ marginLeft: "20px", width: "120px" }} onClick={this.toRegister}>
              Register
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
};

export default withRouter(Login)