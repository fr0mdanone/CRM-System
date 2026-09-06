import { useLocation, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Roles } from "../types/admin";
import { useAppSelector } from "../store";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { profile } = useAppSelector((state) => state.auth);

  type MenuItem = Required<MenuProps>["items"][number] & {
    allowedRoles?: Roles[];
  };

  const items: MenuItem[] = [
    {
      key: "/",
      label: "Todo",
    },
    {
      key: "/profile",
      label: "Profile",
    },
    {
      key: "/users",
      label: "Users",
      allowedRoles: [Roles.ADMIN, Roles.MODERATOR],
    },
  ];

  const filteredItems = items.filter((item) => {
    if (!item.allowedRoles) {
      return true;
    }
    return profile?.roles.some((userRole) =>
      item.allowedRoles?.includes(userRole),
    );
  });

  const visibleItems = filteredItems.map((item) => {
    const { allowedRoles, ...cleanItem } = item;
    return cleanItem;
  });

  const navigateHandler = (key: string) => {
    navigate(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => navigateHandler(key)}
      items={visibleItems}
    />
  );
};

export default Sidebar;
