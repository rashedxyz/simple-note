import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import {
  UserAddOutlined,
  UserOutlined,
  DashboardOutlined,
  FormOutlined,
  UsergroupAddOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;

function LayoutComponent() {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const navMenuItems = [
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

  const sideMenuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>
    },
    {
      key: "/notes",
      icon: <FormOutlined />,
      label: <Link to="/notes">Notes</Link>
    },
    {
      key: "/users",
      icon: <UsergroupAddOutlined />,
      label: <Link to="/users">Users</Link>
    },
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Logout"
    }
  ];

  const location = useLocation();

  const menuItemClickHandler = async (e) => {
    const isLogoutClicked = e.key === "/logout";

    if (isLogoutClicked) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <Layout className="h-[100vh]">
      <Header className="flex items-center">
        <div className="w-[150px]">
          <h3 className="text-white">
            <Link to="/">Simple Note</Link>
          </h3>
        </div>
        {!auth?.accessToken && (
          <Menu
            theme="dark"
            mode="horizontal"
            items={navMenuItems}
            selectedKeys={location.pathname === "/" ? [] : [location.pathname]}
            className="grow"
          />
        )}
      </Header>
      <Layout>
        {auth?.accessToken && (
          <Sider width={200}>
            <Menu
              theme="dark"
              mode="inline"
              items={sideMenuItems}
              onClick={menuItemClickHandler}
            />
          </Sider>
        )}
        <Layout>
          <Content className="p-4">
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Simple Note ©{new Date().getFullYear()} Created by Rashed Mahmud
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default LayoutComponent;
