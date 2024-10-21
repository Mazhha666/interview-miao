"use server";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionCard from "@/app/components/QuestionCard";
import { message } from "antd";
import "./index.css";
/**
 * 题库题目详情页
 * @param param0 
 * @returns 
 */
//服务端渲染加async
//searchParams是q=?&a=？的用法 而/bank/1 是restful用params参数
export default async function QuestionPage({ params }) {
  //获取搜索框的查询词
  const { questionId } = params;
  let question = undefined;
  //获取题库详情
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (e: any) {
    message.error("获取题目详情失败，" + e.message);
  }
  //错误处理 全局异常处理
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }

// <Menu items={questionMenuItemList}  theme="light" selectedKeys={[question.id]}></Menu> selectedKeys 当前于items一样高亮
  return (
    <div id="questionPage">
     <QuestionCard question={question}></QuestionCard>
    </div>
  );
}
