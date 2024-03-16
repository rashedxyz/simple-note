import { Row, Col, Card, Form, Input, Button, Spin, Select } from "antd";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const USER_DATA = {
  name: "",
  email: "",
  role: ""
};

const options = [
  {
    value: "1001",
    label: "Admin"
  },
  {
    value: "1002",
    label: "User"
  }
];

const roleData = {
  1001: {
    id: "1001",
    name: "Admin",
    permissions: [
      "get:notes",
      "post:notes",
      "patch:notes",
      "delete:notes",
      "get:users",
      "post:users",
      "patch:users",
      "delete:users"
    ]
  },
  1002: {
    id: "1002",
    name: "User",
    permissions: ["get:notes", "post:notes", "patch:notes", "delete:notes"]
  }
};

const CreateUser = () => {
  const [userData, setUserData] = useState(USER_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  useEffect(() => {
    if (!userId) return;

    const getNote = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${userId}`);
        if (response) {
          const { name, email, role } = response.data.data;
          setUserData({ name, email, role: role.id });
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getNote();
  }, []);

  async function handleCreateUserFormSubmit(values) {
    if (userId) {
      const updatedNote = await axiosPrivate.patch(`/api/users/${userId}`, {
        name: values.name,
        email: values.email,
        role: roleData[values.role]
      });

      if (updatedNote) {
        navigate("/users");
      }
      return;
    }
  }

  const handleRoleChange = (value) => {
    setUserData((prev) => {
      return {
        ...prev,
        role: {
          ...prev.role,
          id: value
        }
      };
    });
  };

  return isLoading && userId ? (
    <Spin />
  ) : (
    <Row>
      <Col span={16} offset={4}>
        <Card title="Update User" className="mt-[2rem]">
          <Form
            labelCol={{
              span: 3
            }}
            onFinish={handleCreateUserFormSubmit}
            initialValues={userData}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
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
                  required: true,
                  message: "Please enter your email!"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Role" name="role">
              <Select
                onChange={handleRoleChange}
                style={{
                  width: 200
                }}
                options={options}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 3
              }}
            >
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateUser;
