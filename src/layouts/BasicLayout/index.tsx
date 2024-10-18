"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, theme } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import "./index.css";
import GlobalFooter from "@/app/components/GlobalFooter";
import menus from "../../../config/menu";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";


const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};
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
  const loginUser = useSelector((state:RootState) => state.loginUser)
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
            <SearchInput key="search" />,
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
          )
      
        }}
        //渲染底部
        footerRender={() => {
          return <GlobalFooter></GlobalFooter>;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        //定义有哪些菜单
        menuDataRender={() => {
          return menus
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
