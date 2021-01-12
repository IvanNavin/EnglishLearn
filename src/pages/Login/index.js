import React, {Component} from 'react';
import {Layout, Form, Input, Button} from 'antd';

import s from './Login.module.scss';
import FirebaseContext from "../../context/firebaseContext";

const {Content} = Layout;

class LoginPage extends Component {
    onFinish = ({email, password}) => {
        const {signWithEmail} = this.context;
        const {history} = this.props;

        signWithEmail(email, password)
            .then(res => {
                console.log('onFinish res: ', res);
                localStorage.setItem('user', res.user.uid)
                history.push('/');
            })
    }
    onFinishFailed = (errorMsg) => {
        console.log('onFinishFailed values: ', errorMsg)
    }

    renderForm = () => {
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };

        const tailLayout = {
            wrapperCol: { offset: 6, span: 18 },
        };

        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        )
    }

    render() {
        return (
            <Layout>
                <Content>
                    <div className={s.root}>
                        <div className={s.form_wrap}>
                            {this.renderForm()}
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}
LoginPage.contextType = FirebaseContext;

export default LoginPage;