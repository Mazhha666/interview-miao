import { RootState } from "@/stores";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { findAllMenuItemByPath } from "../../config/menu";
import ACCESS_ENUM from "./accessEnum";
import checkAccess from "./checkAccess";
import Forbidden from "@/app/forbidden";

/**
 * 
 * @param 统一权限拦截器
 * @returns 
 */
const AccessLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
    //获取路径
    const pathName:string = usePathname()
    const loginUser = useSelector((state:RootState) => state.loginUser)
    //获取menuItem
    const menu = findAllMenuItemByPath(pathName)
    //获取权限
    const needAccess = menu?.access??ACCESS_ENUM.NOT_LOGIN 
    //校验权限
    const canAccess = checkAccess(loginUser,needAccess)
    if(!canAccess){
        return <Forbidden></Forbidden>
    }
  return children
};
export default AccessLayout