"use server";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { Flex, Menu, message } from "antd";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import "./index.css";
import { Content } from "antd/es/layout/layout";
import QuestionCard from "@/app/components/QuestionCard";
import Link from "next/link";
/**
 * 题库题目详情页
 * @param param0 
 * @returns 
 */
//服务端渲染加async
//searchParams是q=?&a=？的用法 而/bank/1 是restful用params参数
export default async function BankQuestionPage({ params }) {
  //获取搜索框的查询词
  const { questionBankId,questionId } = params;
  let bank = undefined;
  //获取题库详情
  try {
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = res.data;
  } catch (e: any) {
    message.error("获取题库列表失败，" + e.message);
  }
  //错误处理 全局异常处理
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }
  let question = undefined;
  //获取题目详情
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (e: any) {
    message.error("获取题目列表失败，" + e.message);
  }
  //错误处理 全局异常处理
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }
  //题目菜单列表
  const questionMenuItemList = (bank.questionPage?.records || []).map((q) => {
    return {
      label:<Link href={`/bank/${questionBankId}/question/${q.id}`}>{q.title}</Link>,
      key:q.id
    }
  })
// <Menu items={questionMenuItemList}  theme="light" selectedKeys={[question.id]}></Menu> selectedKeys 当前于items一样高亮
  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{padding:"24px 0"}}>
          <Title level={4} style={{padding:"0 20px"}}>{bank.title}</Title>
          <Menu items={questionMenuItemList}  theme="light" selectedKeys={[question.id]}></Menu>
        </Sider>
        <Content>
          <QuestionCard question={question}></QuestionCard>
        </Content>
      </Flex>
    </div>
  );
}
