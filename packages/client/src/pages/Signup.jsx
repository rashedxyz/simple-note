import { useEffect } from "react";
import { Button, Form, Input, Card, Row, Col, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";

function SignUp() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const {
    successAlertMessage,
    setSuccessAlertMessage,
    errorAlertMessage,
    setErrorAlertMessage
  } = useAlert();

  const [form] = Form.useForm();

  useEffect(() => {
    if (auth?.accessToken) {
      navigate("/dashboard");
    }
  }, []);

  const handleSignupFormSubmit = async (values) => {
    try {
      const result = await axios.post("/api/register", values);
      setSuccessAlertMessage(result.data.message);
      setErrorAlertMessage("");
      form.resetFields();
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
              message={
                <>
                  {successAlertMessage} <Link to="/login">Login from here</Link>
                </>
              }
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
            form={form}
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
                  message: "Please enter your password!"
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
