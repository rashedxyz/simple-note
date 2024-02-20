import { Row, Col, Card, Form, Input, Button } from "antd";

const CreateNote = () => {
  const { TextArea } = Input;

  function handleCreateNoteFormSubmit() {
    console.log("Create note form submitted");
  }

  return (
    <Row>
      <Col span={16} offset={4}>
        <Card title="Create Note" className="mt-[2rem]">
          <Form
            labelCol={{
              span: 3
            }}
            onFinish={handleCreateNoteFormSubmit}
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
