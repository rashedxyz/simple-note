import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserAddOutlined,
  UserOutlined,
  DashboardOutlined
} from "@ant-design/icons";

const { Header } = Layout;

function LayoutComponent() {
  const menuItems = [
    {
      key: "/signup",
      icon: <UserAddOutlined />,
      label: <Link to="/signup">Sign up</Link>
    },
    {
      key: "/login",
      icon: <UserOutlined />,
      label: <Link to="/login">Login</Link>
    }
  ];

  const location = useLocation();

  return (
    <Layout>
      <Header className="flex items-center">
        <div className="w-[120px]">
          <h3 className="text-white">
            <Link to="/">Simple Note</Link>
          </h3>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          selectedKeys={
            location.pathname === "/" ? [] : [location.pathname]
          }
          className="grow"
        />
      </Header>
      <Outlet />
    </Layout>
  );
}

export default LayoutComponent;
