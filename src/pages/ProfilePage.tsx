import { Card, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { getUserProfileThunk } from "../store/user/user-actions";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.user.profile);

  useEffect(() => {
    if (!profile) {
      dispatch(getUserProfileThunk());
    }
  }, [profile, dispatch]);

  if (!profile) {
    return <Typography.Paragraph>Загрузка профиля...</Typography.Paragraph>;
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
