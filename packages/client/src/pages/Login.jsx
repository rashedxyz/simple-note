import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Card, Row, Col, Alert } from "antd";
import axios from "../api/axios";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { errorAlertMessage, setErrorAlertMessage } = useAlert();  

  useEffect(() => {
    if (auth?.accessToken) {
      navigate("/dashboard");
    }
  }, []);

  const handleLoginFormSubmit = async (values) => {
    try {
      const result = await axios.post("/api/auth", values);
      console.log("result", result);
      setAuth(result.data);
      navigate("/dashboard");

      setErrorAlertMessage("");
    } catch (error) {
      console.error("error", error);
      setErrorAlertMessage(
        error.response.data.message
          ? error.response.data.message
          : "Something went wrong"
      );
    }
  };

  return (
    <Row>
      <Col span={10} offset={7}>
        <Card className="mt-[4rem]" title="Login">
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
            onFinish={handleLoginFormSubmit}
          >
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
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
