import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";
import ACCESS_ENUM from "@/access/accessEnum";

// 菜单列表
const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    name: "面试鸭",
    path: "https://mianshiya.com",
    target: "_blank",
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    access:ACCESS_ENUM.ADMIN,//权限管理
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access:ACCESS_ENUM.ADMIN
      },
      {
        path: "/admin/bank",
        name: "题库管理",
        access:ACCESS_ENUM.ADMIN
      },
      {
        path: "/admin/question",
        name: "题目管理",
        access:ACCESS_ENUM.ADMIN
      }
    ],
  },
] as MenuDataItem[];

// 导出
export default menus;

//根据路径查找所有菜单
export const findAllMenuItemByPath = (path:string) :MenuDataItem | null => {
  return findMenuItemByPath(menus,path);
}
export const findMenuItemByPath = (menus:MenuDataItem[] ,path:string):MenuDataItem |null => {
  for(const menu of menus){
    if(menu.path === path) {
      return menu
    }
    if(menu.children){
      const matchedItem = findMenuItemByPath(menu.children,path)
      if(matchedItem){
        return matchedItem
      }
    }
  }
  return null
}