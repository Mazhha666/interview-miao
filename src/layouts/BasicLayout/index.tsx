"use client";
import getAccessibleMenus from "@/access/menuAccess";
import GlobalFooter from "@/app/components/GlobalFooter";
import { AppDispatch, RootState } from "@/stores";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, message, theme } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import menus from "../../../config/menu";
import "./index.css";
import { userLogoutUsingPost } from "@/api/userController";
import { DEFAULT_USER } from "@/constants/user";
import { setLoginUser } from "@/stores/loginUser";
import { useRouter } from "next/navigation";
import SearchInput from "./components/SearchInput/page";

interface Props {
  children: React.ReactNode;
}
/**
 *
 * @param 基本布局页面
 * @returns
 */
export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();

  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const doUserLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("登陆成功");
      dispatch(setLoginUser(DEFAULT_USER));
      //跳转
      router.push("/user/login");
    } catch (e: any) {
      message.error("登陆失败" + e.message);
    }
  };
  // const [text,setText] = useState<string>("")//搜索框内容
  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        layout="top"
        title="面试喵刷题平台"
        logo={
          <Image
            src="/assets/logo.png"
            height={32}
            width={32}
            alt="面试喵刷题网站"
          />
        }
        //location 高亮显示活跃项
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/logo.png",
          size: "small",
          title: loginUser.userName || "喵喵",
          render: (props, dom) => {
            if (!loginUser.id) {
              return (
                <div
                  onClick={() => {
                    router.push("/user/login");
                  }}
                >
                  {dom}
                </div>
              );
            }
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: async (event: { key: React.Key }) => {
                    const { key } = event;
                    if (key === "logout") {
                      doUserLogout();
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            //搜题的判断显示

            <SearchInput key="search" currentPath={pathname} />,
            <a
              key="github"
              href="https://github.com/Mazhha666/interview-miao"
              target="_blank"
            >
              <GithubFilled key="GithubFilled" />,
            </a>,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        //渲染底部
        footerRender={() => {
          return <GlobalFooter></GlobalFooter>;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        //定义有哪些菜单
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
        //定义了菜单项如何渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
