import { Button, Form, Input, Space, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchUserByIdThunk,
  updateUserProfileThunk,
} from "../store/admin/admin-actions";
import { UserRequest } from "../types/admin";

const UserDetailsPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { isLoading, currentUser } = useAppSelector((state) => state.admin);

  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserByIdThunk(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue(currentUser);
    }
  }, [currentUser, form]);

  const editHandler = () => {
    setIsEditing(true);
  };

  const cancelHandler = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const submitHandler = async (values: UserRequest) => {
    const payload: Partial<UserRequest> = { ...values };

    if (currentUser && values.email === currentUser.email) {
      delete payload.email;
    }

    try {
      await dispatch(
        updateUserProfileThunk({ id: userId, data: payload as UserRequest }),
      ).unwrap();
      setIsEditing(false);
    } catch (error) {
      form.resetFields();
      setIsEditing(false);
    }
  };

  const goBackHandler = () => {
    navigate("/users");
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Form
      form={form}
      onFinish={submitHandler}
      layout="vertical"
      style={{ marginLeft: "10px" }}
      initialValues={currentUser || undefined}
    >
      <Form.Item label="Имя пользователя" name="username">
        <Input disabled={!isEditing} />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input disabled={!isEditing} />
      </Form.Item>
      <Form.Item label="Телефон" name="phoneNumber">
        <Input disabled={!isEditing} />
      </Form.Item>
      <Form.Item label="Роли">
        {currentUser?.roles.map((role) => {
          let color = "blue";
          if (role === "ADMIN") color = "red";
          if (role === "MODERATOR") color = "gold";

          return (
            <Tag color={color} key={role}>
              {role}
            </Tag>
          );
        })}
      </Form.Item>
      <Form.Item label="Статус">
        {currentUser?.isBlocked ? (
          <Tag color="error">Заблокирован</Tag>
        ) : (
          <Tag color="success">Активен</Tag>
        )}
      </Form.Item>
      <Form.Item label="Дата регистрации">
        <span>{currentUser?.date}</span>
      </Form.Item>
      {!isEditing && (
        <Space>
          <Button type="primary" onClick={editHandler}>
            Редактировать
          </Button>
          <Button onClick={goBackHandler}>Назад</Button>
        </Space>
      )}
      {isEditing && (
        <Space>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Сохранить
          </Button>
          <Button onClick={cancelHandler}>Отмена</Button>
        </Space>
      )}
    </Form>
  );
};

export default UserDetailsPage;
