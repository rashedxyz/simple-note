import { Button, Form, Input, Card, Row, Col, Alert } from "antd";
import axios from "axios";
import useAlert from "../hooks/useAlert";

function SignUp() {
  const {
    successAlertMessage,
    setSuccessAlertMessage,
    errorAlertMessage,
    setErrorAlertMessage
  } = useAlert();

  const handleSignupFormSubmit = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const result = await axios.post("/api/register", values);
      setSuccessAlertMessage(result.data.message);
      setErrorAlertMessage("");
    } catch (error) {
      console.error("error", error);
      setErrorAlertMessage(
        error.response.data.message
          ? error.response.data.message
          : "Something went wrong"
      );
      setSuccessAlertMessage("");
    }
  };

  return (
    <Row>
      <Col span={10} offset={7}>
        <Card className="mt-[4rem]" title="Sign up">
          {successAlertMessage && (
            <Alert
              message={successAlertMessage}
              type="success"
              className="mb-[1rem]"
            />
          )}
          {errorAlertMessage && (
            <Alert
              message={errorAlertMessage}
              type="error"
              className="mb-[1rem]"
            />
          )}
          <Form
            labelCol={{
              span: 4
            }}
            onFinish={handleSignupFormSubmit}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  type: "name"
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
                offset: 4
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
