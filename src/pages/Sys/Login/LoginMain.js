import React, { memo } from 'react';
import { Form, Input, Button } from 'antd';
import { QqOutlined, WechatOutlined, GithubOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';


const Item = Form.Item;

const LoginMain = (props) => {
  
  const { login,loading } = props;
  const [form] = useForm()
  const handleSubmit = (value) => {
    login(value)
  }

  return (
    <div className="login-layout-main">
      <div className="main-form">
        <h2>欢迎登录</h2>
        <Form
          form={form}
          className="main-form-box"
          onFinish={handleSubmit}
        >
          <Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
            <Input placeholder="请输入用户名" />
          </Item>
          <Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
            <Input type="password" placeholder="请输入密码" />
          </Item>
          <Item>
            <Button
              type="primary"
              className="login-button"
              htmlType="submit"
              loading={loading}
            >
              登录
            </Button>
          </Item>
          <Item>
            <div className="main-form-box-other">
              <p>其他登录方式</p>
            </div>
            <div className="login-item">
              <QqOutlined />
              <WechatOutlined />
              <GithubOutlined />
            </div>
          </Item>
        </Form>
      </div>
    </div>
  )
}

export default memo(LoginMain)