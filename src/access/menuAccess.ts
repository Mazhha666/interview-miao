import { MenuDataItem } from "@ant-design/pro-components";
import checkAccess from "./checkAccess";
import menus from "../../config/menu";
const getAccessibleMenus = (loginUser: API.LoginUserVO,menuItems:MenuDataItem[] = menus)=> {
    return menuItems.filter((item:MenuDataItem):boolean=>{
        if(!checkAccess(loginUser,item.access)){
            return false
        }
        if(item.children){
            item.children = getAccessibleMenus(loginUser,item.children)
        }
        return true
    })
}
export default getAccessibleMenus