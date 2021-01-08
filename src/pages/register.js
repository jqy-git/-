import { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'

import './login.css'
import { registerApi } from '../api/api'
import { removeUser } from '../utils/auth'

class Rigister extends Component {
  toLogin = (e) => {
    e.preventDefault();
    this.props.history.push('/login')
  }
  render() {
    const onFinish = (values) => {
      registerApi({
        username: values.username,
        password: values.password,
        email: values.email
      }).then(res => {
        alert(res.data.msg)
        if (res.data.code === '0000') {
          removeUser()
          this.props.history.push('/login')
        }
      })
    };

    return (
      <div className='whole'>
        <Form
          id="form"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <p style={{ fontSize: "30px", marginLeft: "130px" }}>注册</p>
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

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="E-mail"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button"
              style={{ marginLeft: "50px", width: "120px" }} onClick={this.toLogin}>
              Log in
          </Button>
            <Button type="primary" htmlType="submit" className="login-form-button"
              style={{ marginLeft: "20px", width: "120px" }}>
              Register
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
};

export default withRouter(Rigister)