import { Button, Form, Input, Image, Flex, Typography } from "antd";
import decoration from "../assets/decoraction.svg";
import { AuthData } from "../types/auth";
import { useAppDispatch, useAppSelector } from "../store";
import { loginThunk } from "../store/auth/auth-actions";
import { Link, useNavigate } from "react-router";

const AuthPage: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoginLoading = useAppSelector((state) => state.user.isLoginLoading);

  const loginHandler = (values: AuthData) => {
    dispatch(loginThunk({ authData: values, onSuccess: () => navigate("/") }));
  };

  return (
    <>
      <Image src={decoration} alt="decoration" width={72} preview={false} />
      <Flex vertical justify="center">
        <Typography.Title level={2}>Login to your account</Typography.Title>
        <Typography.Paragraph>
          See what is going on with your business
        </Typography.Paragraph>
        <Form form={form} layout="vertical" onFinish={loginHandler}>
          <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: "Пожалуйста, введите логин!" }]}
          >
            <Input placeholder="Login" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              style={{ backgroundColor: "#7F265B", borderColor: "#7F265B" }}
              htmlType="submit"
              loading={isLoginLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph>
          Not registered yet? <Link to="/signup">Create an account</Link>
        </Typography.Paragraph>
      </Flex>
    </>
  );
};

export default AuthPage;
