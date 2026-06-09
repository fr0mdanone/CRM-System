import { Card, Col, Flex, Image, Row } from "antd";
import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import illustration from "../../assets/illustration.svg";

const AuthLayout: React.FC = () => {
  return (
    <Flex align="center" justify="center" className={styles.container}>
      <Card className={styles.card}>
        <Row>
          <Col span={15}>
            <Image
              preview={false}
              alt="skelet with laptop"
              src={illustration}
            />
          </Col>
          <Col span={9}>
            <Flex vertical justify="space-between">
              <Outlet />
            </Flex>
          </Col>
        </Row>
      </Card>
    </Flex>
  );
};

export default AuthLayout;
