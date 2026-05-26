import { Button, Form, Input, Result, Typography } from "antd";
import { UserRegistration } from "../types/auth";
import { useAppDispatch, useAppSelector } from "../store";
import { registerThunk } from "../store/auth/auth-actions";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

const SignupPage: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const isRegisterLoading = useAppSelector(
    (state) => state.user.isRegisterLoading,
  );

  function signupHandler(values: UserRegistration) {
    dispatch(
      registerThunk({
        data: values,
        onSuccess: () => {
          setIsSuccess(true);
          form.resetFields();
        },
      }),
    );
  }

  const validatePasswordMatch = () => {
    const password = form.getFieldValue("password");
    const confirmPassword = form.getFieldValue("confirmPassword");

    if (confirmPassword && password !== confirmPassword) {
      return Promise.reject(new Error("Пароли не совпадают!"));
    }
    return Promise.resolve();
  };

  function confirmSuccessHandler() {
    setIsSuccess(false);
    navigate("/login");
  }

  if (isSuccess) {
    return (
      <>
        <Result
          status="success"
          title="Регистрация прошла успешно!"
          extra={
            <Button type="primary" onClick={confirmSuccessHandler}>
              Авторизоваться
            </Button>
          }
        />
      </>
    );
  }

  return (
    <>
      <Form form={form} layout="vertical" onFinish={signupHandler}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите Email!",
            },
            {
              type: "email",
              message: "Введите корректный Email адрес!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Login"
          name="login"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите логин!",
            },
            {
              transform: (value) =>
                typeof value === "string" ? value.trim() : value,
              min: 2,
              message: "Логин должен состоять минимум из 2 символов",
            },
            {
              transform: (value) =>
                typeof value === "string" ? value.trim() : value,
              max: 60,
              message: "Логин не должен превышать 60 символов",
            },
            {
              pattern: /^(?=.*[a-zA-Z])[a-zA-Z\-]+$/,
              message: "Разрешены только латинские буквы!",
            },
          ]}
        >
          <Input placeholder="Login" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Пожалуйста, введите пароль!",
            },
            {
              transform: (value) =>
                typeof value === "string" ? value.trim() : value,
              min: 6,
              message: "Пароль должен состоять минимум из 6 символов",
            },
            {
              transform: (value) =>
                typeof value === "string" ? value.trim() : value,
              max: 60,
              message: "Пароль не должен превышать 60 символов",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Введите подтверждение пароля",
            },
            { validator: validatePasswordMatch },
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            {
              pattern: /^\+[1-9]\d{9,14}$/,
              message:
                "Формат телефона должен быть +xxx (содержать до 15-ти цифр и начинаться с плюса) без пробелов",
            },
          ]}
        >
          <Input placeholder="Phone number" />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите имя пользователя!",
            },
            {
              transform: (value) =>
                typeof value === "string" ? value.trim() : value,
              min: 1,
              message: "Имя пользователя должно составлять хотя бы 1 букву",
            },
            {
              transform: (value) =>
                typeof value === "string" ? value.trim() : value,
              max: 60,
              message: "Имя пользователя не должно превышать 60 символов",
            },
            {
              pattern: /^(?=.*[a-zA-Zа-яА-ЯёЁ])[a-zA-Zа-яА-ЯёЁ\s\-]+$/,
              message: "Разрешены только латинские и русские буквы!",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#7F265B", borderColor: "#7F265B" }}
            loading={isRegisterLoading}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
      <Typography.Paragraph>
        Already have an account? <Link to="/login">Login here</Link>
      </Typography.Paragraph>
    </>
  );
};

export default SignupPage;
