import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout: React.FC = () => {
	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<Sider width="15%">
					<MainNavigation />
				</Sider>
				<Content>
					<Outlet />
				</Content>
			</Layout>
		</>
	);
};

export default RootLayout;
