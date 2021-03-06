import {Form, Icon, Input, Button, Checkbox} from 'antd';
import * as React from "react";

import {login} from "../../../services/apiHTTP"
import {withRouter} from "react-router";


class LoginInput extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        login({
          username: values.username,
          password: values.password
        }).then(res => {
          if (res.success) {
            let local = window.localStorage;
            local.username = values.username;
            this.props.history.push('/allgames')
          } else {
            alert("账户名或密码错误")
          }
        })
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(
                <Input
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="Username"
                />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{required: true, message: 'Please input your Email!'}],
            })(
                <Input
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="email"
                    placeholder="Email"
                />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
                <Input
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="password"
                    placeholder="Password"
                />,
            )}
          </Form.Item>


          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
    );
  }
}

export default withRouter(Form.create()(LoginInput));



