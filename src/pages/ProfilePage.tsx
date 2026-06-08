import { Card, Flex, Spin, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { fetchUserProfileThunk } from "../store/auth/auth-actions";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfileThunk());
    }
  }, [profile, dispatch]);

  const isProfileLoading = useAppSelector(
    (state) => state.auth.isProfileLoading,
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
