"use client";
import { userLoginUsingPost } from "@/api/userController";
import { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUser";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import ProForm from "@ant-design/pro-form";
import { Divider, message, theme } from "antd";
import { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import "./index.css";
import { useRouter } from "next/navigation";

const UserLoginPage: React.FC = () => {
  const { token } = theme.useToken();
  //form表单的ref
  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res: AxiosResponse = await userLoginUsingPost(values);
      if (res.data) {
        message.success("登陆成功");
        dispatch(setLoginUser(res.data));
        //跳转
        router.replace("/");
        //清空
        form.resetFields();
      }
    } catch (e: any) {
      message.error("登陆失败" + e.message);
    }
  };
  return (
    <div
      id="userLoginPage"
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <LoginFormPage
        form={form}
        backgroundImageUrl="/assets/video.mp4"
        logo={
          <Image
            src="/assets/logo.png"
            alt="面试喵刷题网站"
            width={44}
            height={44}
          ></Image>
        }
        backgroundVideoUrl="/assets/video.mp4"
        title="用户登录"
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0,0.65)",
          backdropFilter: "blur(4px)",
        }}
        subTitle="面试喵刷题网站"
        onFinish={doSubmit}
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Divider plain>
              <span
                style={{
                  color: token.colorTextPlaceholder,
                  fontWeight: "normal",
                  fontSize: 14,
                }}
              >
                其他登录方式
              </span>
            </Divider>
          </div>
        }
      >
        <>
          <ProFormText
            name="userAccount"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined />,
            }}
            placeholder={"用户名: "}
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder={"密码: "}
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
        </>

        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          还没有账号？
          <Link href={"/user/register"}>去注册</Link>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <UserLoginPage />
    </ProConfigProvider>
  );
};
