import { useLocation, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const Sidebar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	type MenuItem = Required<MenuProps>["items"][number];

	const items: MenuItem[] = [
		{
			key: "/",
			label: "Todo",
		},
		{
			key: "/profile",
			label: "Profile",
		},
	];

	const navigateHandler = (key: string) => {
		navigate(key);
	};

	return (
		<Menu
			mode="inline"
			selectedKeys={[location.pathname]}
			onClick={({ key }) => navigateHandler(key)}
			items={items}
		/>
	);
};

export default Sidebar;
