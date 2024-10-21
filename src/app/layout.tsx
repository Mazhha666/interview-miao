"use client";
import AccessLayout from "@/access/AccessLayout";
import { getLoginUserUsingGet } from "@/api/userController";
import BasicLayout from "@/layouts/BasicLayout";
import store, { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUser";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AxiosResponse } from "axios";
import React, { useCallback, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import "./globals.css";
/**
 *
 * @param InitLayout 初始化参数 高阶组件用法
 * @returns
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  //获取redux触发器
  const dispatch = useDispatch<AppDispatch>();
  //储存函数 初始化全局用户状态
  const doInitLoginUser = useCallback(async () => {
    const res:AxiosResponse = await getLoginUserUsingGet();
    if (res.data) {
      //更新全局用户状态
      dispatch(setLoginUser(res.data));
    } else {
      // setTimeout(() => {
      //   const testUser = {
      //     userName: "测试",
      //     id: 1,
      //     userAvatar: "https:www.code-nav.cn/logo.png",
      //     userRole:ACCESS_ENUM.ADMIN
      //   };
      //   dispatch(setLoginUser(testUser));
      // }, 3000);
    }
  }, []);
  //只执行一次hook
  useEffect(() => {
    doInitLoginUser();
  }, []);
  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
