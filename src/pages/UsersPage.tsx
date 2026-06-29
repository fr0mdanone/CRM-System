import {
  Button,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  type TableProps,
} from "antd";
import { User } from "../types/auth";
import { Roles } from "../types/admin";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect, useState } from "react";
import {
  blockUserThunk,
  fetchAllUsersThunk,
  unblockUserThunk,
  deleteUserThunk,
  updateUserRolesThunk,
} from "../store/admin/admin-actions";

type FilterStatus = "all" | "blocked" | "active";

const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, isLoading, totalAmount } = useAppSelector(
    (state) => state.admin,
  );

  const { profile } = useAppSelector((state) => state.auth);
  const isAdmin = profile?.roles.includes(Roles.ADMIN);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const PAGE_LIMIT = 20;

  useEffect(() => {
    let isBlocked: boolean | undefined = undefined;
    if (filter === "blocked") {
      isBlocked = true;
    } else if (filter === "active") {
      isBlocked = false;
    }

    dispatch(
      fetchAllUsersThunk({
        page: currentPage,
        limit: PAGE_LIMIT,
        sortBy: sortBy,
        sortOrder: sortOrder,
        search: searchQuery || undefined,
        isBlocked: isBlocked,
      }),
    );
  }, [dispatch, currentPage, sortBy, sortOrder, searchQuery, filter]);

  const editHandler = (user: User) => {
    navigate(`/users/${user.id}`);
  };
  const blockHandler = (userId: number) => {
    dispatch(blockUserThunk(userId));
  };
  const unblockHandler = (userId: number) => {
    dispatch(unblockUserThunk(userId));
  };
  const deleteHandler = (userId: number) => {
    dispatch(deleteUserThunk(userId));
  };

  const userRolesChangeHandler = (id: number, newRoles: Roles[]) => {
    dispatch(updateUserRolesThunk({ id, roles: newRoles }));
  };

  const selectOptions = [
    { value: "all", label: "Все" },
    { value: "blocked", label: "Заблокированные" },
    { value: "active", label: "Активные" },
  ];

  const searchHandler = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const filterHandler = (value: FilterStatus) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      render: (roles: Roles[], record) => (
        <Space size="middle">
          <Select
            disabled={!isAdmin}
            mode="multiple"
            value={roles}
            options={Object.values(Roles).map((role) => ({
              value: role,
              label: role,
            }))}
            style={{ width: 200 }}
            onChange={(newRoles: Roles[]) => {
              userRolesChangeHandler(record.id, newRoles);
            }}
            tagRender={(props) => {
              const { label, value, closable, onClose } = props;
              let color = "blue";

              if (value === Roles.ADMIN) color = "red";
              if (value === Roles.MODERATOR) color = "gold";

              return (
                <Tag
                  color={color}
                  closable={closable}
                  onClose={onClose}
                  style={{ marginRight: 3 }}
                >
                  {label}
                </Tag>
              );
            }}
          />
        </Space>
      ),
    },
    {
      title: "Блокировка",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: boolean) => (isBlocked ? "+" : "-"),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => editHandler(record)} type="primary">
            Edit
          </Button>
          {!record.isBlocked && (
            <Popconfirm
              title="Заблокировать пользователя?"
              onConfirm={() => {
                blockHandler(record.id);
              }}
              okText="Да"
              cancelText="Нет"
            >
              <Button danger>Заблокировать</Button>
            </Popconfirm>
          )}
          {record.isBlocked && (
            <Button onClick={() => unblockHandler(record.id)}>
              Разблокировать
            </Button>
          )}
          {isAdmin && (
            <Popconfirm
              title="Удалить пользователя?"
              onConfirm={() => deleteHandler(record.id)}
              okText="Да"
              cancelText="Нет"
            >
              <Button danger>Удалить</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <Space>
        {isAdmin && (
          <Select
            value={filter}
            options={selectOptions}
            onChange={filterHandler}
          />
        )}
        <Input.Search
          placeholder="Поиск по имени или email"
          allowClear
          onSearch={searchHandler}
        />
      </Space>
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: currentPage,
          total: totalAmount,
          pageSize: PAGE_LIMIT,
        }}
        onChange={(pagination, filters, sorter: any) => {
          if (pagination.current) {
            setCurrentPage(pagination.current);
          }
          if (sorter && sorter.order) {
            setSortBy(sorter.field as string);
            setSortOrder(sorter.order === "ascend" ? "asc" : "desc");
          } else {
            setSortBy("id");
            setSortOrder("asc");
          }
        }}
      />
    </Space>
  );
};

export default UsersPage;
