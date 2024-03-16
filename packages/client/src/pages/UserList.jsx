import { Row, Col } from "antd";
import UserListElem from "../components/UserListElem";

function UserList() {

  return (
    <Row>
      <Col span={16} offset={4}>
        <UserListElem />
      </Col>
    </Row>
  );
}

export default UserList;
