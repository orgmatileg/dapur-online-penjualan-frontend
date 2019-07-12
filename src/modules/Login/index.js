import React from "react";
import { useStoreActions } from "easy-peasy";

// CSS FRAMEWORK
import { Row, Col, Card, Icon, Form, Input, Button } from "antd";

const WrappedLogin = Form.create({ name: "normal_login" })(Login);

function Login(props) {
  const login = useStoreActions(actions => actions.auth.login);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const success = await login(values);
        if (success === true) {
          return props.history.push("/admin");
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Row
      style={{ height: "100vh" }}
      type="flex"
      justify="center"
      align="middle"
    >
      <Col>
        <Card style={{ padding: 10, width: 350, height: "100%" }}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Please input your email!" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default WrappedLogin;
