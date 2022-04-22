/* eslint-disable no-restricted-globals */
import { Layout, Menu, Card, Button, Breadcrumb } from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  AimOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import "../assets/css/style.css";
import { BaseContext } from "../context/baseContext";
import logo from "../assets/img/logongoc1.png";

const { Header, Content, Footer, Sider } = Layout;

export default function Wrapper(props) {
  const navigate = useNavigate();

  const baseContext = useContext(BaseContext);

  // const user = authService.getCurrentUser();
  // const roleId = user.role.id;

  let key = 1;
  if (location.pathname === "/campaign") {
    key = "7";
  } else if (location.pathname === "/profile") {
    key = "8";
  }

  const handleClick = (e) => {
    switch (parseInt(e.key)) {
      case 7: {
        navigate("/campaign");
        break;
      }
      case 8: {
        navigate("/profile");
        break;
      }
      default: {
        authService.logout();
        navigate("/");
      }
    }
  };
  // <Menu
  //   onClick={handleClick}
  //   theme="dark"
  //   defaultSelectedKeys={[key]}
  //   mode="inline"
  // >
  //   <Menu.Item key="8" icon={<UserOutlined />}>
  //     Thông tin chung
  //   </Menu.Item>
  //   <Menu.Item key="9" icon={<LogoutOutlined />}>
  //     Đăng xuất
  //   </Menu.Item>
  // </Menu>;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      {!baseContext.collapsed && (
        <div className="logo">
         <img style={{ width: 120, height: 70, top: "7px" }} src={logo} alt=""/>
        </div>
      )}
        <Menu
          onClick={handleClick}
          theme="dark"
          defaultSelectedKeys={[key]}
          mode="horizontal"
        >
          <Menu.Item key="7" icon={<AimOutlined />}>
            Campaign
          </Menu.Item>
          <Menu.Item key="8" icon={<UserOutlined />}>
            Thông tin chung
          </Menu.Item>
          <Menu.Item key="9" icon={<LogoutOutlined />}>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home </Breadcrumb.Item>
          {key === "7" && <Breadcrumb.Item>Campaign</Breadcrumb.Item>}
          {key === "8" && (
            <Breadcrumb.Item>Thông tin người dùng</Breadcrumb.Item>
          )}

          {/* <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Design by SNA Center
      </Footer>
    </Layout>
  );
}
