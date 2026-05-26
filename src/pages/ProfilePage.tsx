import { Card, Flex, Spin, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { getUserProfileThunk } from "../store/auth/auth-actions";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.user.profile);

  useEffect(() => {
    if (!profile) {
      dispatch(getUserProfileThunk());
    }
  }, [profile, dispatch]);

  const isProfileLoading = useAppSelector(
    (state) => state.user.isProfileLoading,
  );

  if (isProfileLoading || !profile) {
    return (
      <Flex align="center" justify="center" style={{ height: "100vh" }}>
        <Spin tip="Загрузка профиля" size="large" />
      </Flex>
    );
  }

  const { username, email, phoneNumber } = profile;

  return (
    <>
      <Card>
        <Typography.Paragraph>Username: {username}</Typography.Paragraph>
      </Card>
      <Card>
        <Typography.Paragraph>Email: {email}</Typography.Paragraph>
      </Card>
      <Card>
        <Typography.Paragraph>Phone: {phoneNumber}</Typography.Paragraph>
      </Card>
    </>
  );
};

export default ProfilePage;
