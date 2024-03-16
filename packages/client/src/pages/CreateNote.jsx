import { Row, Col, Card, Form, Input, Button } from "antd";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const NOTE_DATA = {
  noteTitle: "",
  noteContent: ""
};

const CreateNote = () => {
  const [noteData, setNoteData] = useState(NOTE_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const { TextArea } = Input;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const params = useParams();
  const noteId = params.id;

  useEffect(() => {
    if (!noteId) return;

    const getNote = async () => {
      try {
        const response = await axiosPrivate.get(`/api/notes/${noteId}`);
        if (response) {
          const { title, body } = response.data.data;
          setNoteData({ noteTitle: title, noteContent: body });
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getNote();
  }, []);

  async function handleCreateNoteFormSubmit(values) {

    if(noteId) {
      const updatedNote = await axiosPrivate.patch(`/api/notes/${noteId}`, {
        title: values.noteTitle,
        body: values.noteContent
      });

      if(updatedNote) {
        navigate("/notes");
      }
      return;
    } 

    const createdNote = await axiosPrivate.post("/api/notes", {
      title: values.noteTitle,
      body: values.noteContent
    });

    if (createdNote) {
      navigate("/dashboard");
    }
  }

  return isLoading && noteId ? (
    <Spin />
  ) : (
    <Row>
      <Col span={16} offset={4}>
        <Card title="Create Note" className="mt-[2rem]">
          <Form
            labelCol={{
              span: 3
            }}
            onFinish={handleCreateNoteFormSubmit}
            initialValues={noteData}
          >
            <Form.Item
              label="Note Title"
              name="noteTitle"
              rules={[
                {
                  required: true,
                  message: "Please enter your note title!"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Note Content" name="noteContent">
              <TextArea rows={4} />
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

export default CreateNote;
