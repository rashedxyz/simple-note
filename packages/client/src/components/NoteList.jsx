import { Table, Button, Card, Flex } from "antd";
import {useNavigate} from "react-router-dom";

const NoteList = () => {
  const navigate = useNavigate();

  const dataSource = [
    {
      key: "1",
      date: "2024-10-10",
      noteTitle: "Note 1"
    },
    {
      key: "2",
      date: "2024-10-11",
      noteTitle: "Note 2"
    },
    {
      key: "3",
      date: "2024-10-12",
      noteTitle: "Note 3"
    }
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Note Title",
      dataIndex: "noteTitle",
      key: "noteTitle"
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Flex wrap="wrap" gap="small">
            <Button type="primary" ghost onClick={() => editBtnClickHandler(record.key)}>
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

  function handleCreateNoteBtnClick() {
    navigate("/create-note");
  }

  function deleteBtnClickHandler(id) {
    console.log("Delete button clicked", id);
  }

  function editBtnClickHandler(id) {
    console.log("Edit button clicked", id);
  }

  return (
    <Card
      title="Note List"
      className="mt-[2rem]"
      extra={
        <Button type="primary" onClick={handleCreateNoteBtnClick}>
          Create new note
        </Button>
      }
    >
      <Table columns={columns} dataSource={dataSource} />
    </Card>
  );
};

export default NoteList;
