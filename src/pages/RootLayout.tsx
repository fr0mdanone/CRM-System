import { Button, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAppDispatch } from "../store";
import { logout } from "../store/auth/auth-slice";

const RootLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width="15%">
        <Sidebar />
        <Button
          type="primary"
          color="red"
          style={{ margin: "20px" }}
          onClick={logoutHandler}
        >
          Выйти
        </Button>
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default RootLayout;
