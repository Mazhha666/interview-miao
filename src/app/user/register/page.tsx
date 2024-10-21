"use client";
import { userRegisterUsingPost } from "@/api/userController";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import ProForm from "@ant-design/pro-form";
import { Button, message, theme } from "antd";
import { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./index.css";

const UserRegisterPage: React.FC = () => {
  const { token } = theme.useToken();
  //form表单的ref
  const [form] = ProForm.useForm();
  const router = useRouter();
  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res: AxiosResponse = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功，请登录");
        //跳转
        router.replace("/user/login");
        //清空
        form.resetFields();
      }
    } catch (e: any) {
      message.error("注册失败" + e.message);
    }
  };
  return (
    <div
      id="userRegisterPage"
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
        title="用户注册"
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0,0.65)",
          backdropFilter: "blur(4px)",
        }}
        subTitle="面试喵刷题网站"
        onFinish={doSubmit}
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
        activityConfig={{
          style: {
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
            color: "white",
            borderRadius: 8,
            // backgroundColor: "rgba(255,255,255,0.25)",
             // 设置背景图片  
            backgroundImage: `url(/assets/titlepng.png)`, // 确保这里的路径是正确的  
            backgroundSize: 'cover', // 根据需要调整背景图片大小  
            backgroundPosition: 'center', // 根据需要调整背景图片位置  
            backgroundRepeat: 'no-repeat', // 防止图片重复  
            // backdropFilter: "blur(10px)",
            fontWeight:"bold"
            
          },
          title: "面试喵",
          subTitle: "一个very good 的刷题网站",
          action: (
            <div>
              <Button
                size="large"
                style={{
                  borderRadius: 20,
                  background: token.colorBgElevated,
                  color: token.colorPrimary,
                  width: 120,
                }}
              >
                去看看
              </Button>
            </div>
          ),
        }}
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
          <ProFormText.Password
            name="checkPassword"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder={"确认密码: "}
            rules={[
              {
                required: true,
                message: "请再次输入密码！",
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
          已有账号？
          <Link href={"/user/login"}>去登录</Link>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <UserRegisterPage></UserRegisterPage>
    </ProConfigProvider>
  );
};
