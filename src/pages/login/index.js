/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card } from "antd";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logongoc.png";
import videobackground from "../../assets/video/videobackground.mp4";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // const currentUser = AuthService.getCurrentUser();
    // if (currentUser) {
    //   if (currentUser.role.id === 2) {
    //     navigate("/sale-app-list");
    //   } else if (currentUser.role.id === 1) {
    //     navigate("/package-alert");
    //   }
    // }
  }, []);

  // Khi người dùng submit form
  const onFinish = async (value) => {
    console.log(value);
    navigate("/campaign");
    // try {
    //   const response = await AuthService.login(value);
    //   if (response) {
    //     // eslint-disable-next-line default-case
    //     switch (response.role.id) {
    //       case 2:
    //         navigate("/sale-app-list");
    //         break;
    //       case 1:
    //         navigate("/package-alert");
    //         break;
    //     }
    //   }
    // } catch (error) {
    //   const resMessage =
    //     (error.response &&
    //       error.response.data &&
    //       error.response.data.message) ||
    //     error.message ||
    //     error.toString();
    //   setMessage(resMessage);
    // }
  };

  return (
    <>
      { <video autoPlay muted loop id="myVideo">
        <source src={videobackground} type="video/mp4" />
      </video> }
      <div
        style={{
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundSize: "cover",
          overflow: "auto",
        }}
      >
        <Card
          title="Đăng nhập"
          style={{
            width: "500px",
            borderRadius: "15px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img style={{ width: "70%" }} src={logo} alt="" />
          </div>
          <Form onFinish={onFinish} form={form} layout="vertical" name="form">
            <Form.Item
              label="Tên đăng nhập"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống tên đăng nhập!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng không nhập dấu cách!",
                },
                {
                  pattern: new RegExp(/^\S*$/),
                  message: "Vui lòng không nhập dấu cách!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống tên đăng nhập!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng không nhập dấu cách!",
                },
                {
                  pattern: new RegExp(/^\S*$/),
                  message: "Vui lòng không nhập dấu cách!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <p style={{ color: "red" }}>{message}</p>
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                htmlType="submit"
                type="primary"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login;
