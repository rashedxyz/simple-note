import { Row, Col } from "antd";
import useAuth from "../hooks/useAuth";
import NoteList from "../components/NoteList";

function Dashboard() {
  const { auth } = useAuth();
  console.log(auth);

  return (
    <Row>
      <Col span={16} offset={4}>
        <NoteList />
      </Col>
    </Row>
  );
}

export default Dashboard;
