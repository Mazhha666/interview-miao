"use server";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import { message } from "antd";
import Title from "antd/es/typography/Title";
import QuestionTable from "../components/QuestionTable";
import "./index.css";

//服务端渲染加async
export default async function QuestionsPage({searchParams}) {
 //获取搜索框的查询词
  const {q:searchText} = searchParams
  let questionList: API.QuestionVO[] = [];
  const pageSize = 12
  let total= 0
  try {
    const res = await listQuestionVoByPageUsingPost({
      pageSize,
      title:searchText,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = (res.data.records ?? []) ;
    total  = res.data.total ?? 0
  } catch (e: any) {
    message.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="questionsPage" className="max-width-content">
        <Title level={3}>题目大全</Title>
      <QuestionTable defaultQuestionList={questionList} defaultTotal={total} defaultSearchParams={{
        title:searchText
      }}></QuestionTable>
    </div>
  );
}
