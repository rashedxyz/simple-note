import { useEffect, useState } from "react";
import { Table, Button, Card, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UserListElem = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/api/users");

        const fetchedUsers = response.data.data.map((user) => {
          return {
            key: user._id,
            date: user.createdAt,
            name: user.name,
            email: user.email,
            role: user.role.name
          };
        });

        // sort by date
        fetchedUsers.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        isMounted && setUsers(fetchedUsers);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role"
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Flex wrap="wrap" gap="small">
            <Button
              type="primary"
              ghost
              onClick={() => editBtnClickHandler(record.key)}
            >
              Edit
            </Button>
            <Button danger onClick={() => deleteBtnClickHandler(record.key)}>
              Delete
            </Button>
          </Flex>
        );
      }
    }
  ];

  function deleteBtnClickHandler(id) {
    try {
      axiosPrivate.delete(`/api/users/${id}`);
      const updatedUsers = users.filter((user) => user.key !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  }

  function editBtnClickHandler(id) {
    navigate(`/users/${id}`);
  }

  return (
    <Card
      title="User List"
      className="mt-[2rem]"
    >
      <Table columns={columns} dataSource={users} />
    </Card>
  );
};

export default UserListElem;
