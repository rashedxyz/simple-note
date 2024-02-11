import { Outlet, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {UserAddOutlined, UserOutlined, DashboardOutlined } from "@ant-design/icons";

const { Header } = Layout;

function LayoutComponent() {

  const menuItems = [
    {key: "1", icon: <UserAddOutlined />, label: <Link to="/signup">Sign up</Link>},
    {key: "2", icon: <UserOutlined />, label: <Link to="/login">Login</Link>},
    {key: "3", icon: <DashboardOutlined />, label: <Link to="/dashboard">Dashboard</Link>}
  ]
  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
        />
      </Header>
      <Outlet />
    </Layout>
  );
}

export default LayoutComponent;
