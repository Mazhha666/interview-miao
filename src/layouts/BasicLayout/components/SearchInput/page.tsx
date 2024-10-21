import { Input, theme } from "antd";
import { useRouter } from "next/navigation";

interface Props {
  currentPath?:string;
}
/**
 * 
 * @returns 
 */
const SearchInput= (props:Props) => {
  const { token } = theme.useToken();
  const {currentPath = "/"} = props
  const router = useRouter()
  const targetPath:string = "/questions"

  const show = (currentPath:string,targetPath:string)  => {
    if(currentPath === targetPath){
      return (<></>)
    }
    else{
      return  (
        <div
      className="search-input"
        aria-hidden
        style={{
          display: "flex",
          alignItems: "center",
          marginInlineEnd: 24,
        }}
      >
        <Input.Search
          style={{
            borderRadius: 4,
            marginInlineEnd: 12,
            backgroundColor: token.colorBgTextHover,
          }}
          placeholder="搜索题目"
          variant="outlined"//填充区的深度 默认就是无outline
          onSearch={(value) => {
            router.push(`/questions?q=${value}`)
          }}
        />
      </div>
        )
    }
  }
  return show(currentPath,targetPath)
    

};
export default SearchInput