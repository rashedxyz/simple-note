import { Button, Form, Input, Card, Row, Col } from "antd";

function SignUp() {
  return (
    <Row>
      <Col span={12} offset={6}>
        <Card className="mt-[4rem]" title="Sign up">
          <Form
            labelCol={{
              span: 3,
            }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  type: "name",
                  required: true,
                  message: "Please enter your name!"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please enter your email!"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 3
              
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default SignUp;
