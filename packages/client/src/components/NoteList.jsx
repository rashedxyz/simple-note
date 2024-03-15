import { useEffect, useState } from "react";
import { Table, Button, Card, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const NoteList = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getNotes = async () => {
      try {
        const response = await axiosPrivate.get("/api/notes", {
          signal: controller.signal
        });
        if (isMounted) {
          const fetchedNotes = response.data.data.map((note) => {
            return {
              key: note._id,
              date: note.createdAt,
              noteTitle: note.title,
              noteContent: note.body
            };
          });

          // sort by date
          fetchedNotes.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          setNotes(fetchedNotes);
        }
      } catch (error) {
        console.error(error);

      }
    };

    getNotes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
      title: "Note Content",
      dataIndex: "noteContent",
      key: "noteContent"
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

  function handleCreateNoteBtnClick() {
    navigate("/notes/create");
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
      <Table columns={columns} dataSource={notes} />
    </Card>
  );
};

export default NoteList;
