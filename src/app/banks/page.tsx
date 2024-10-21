"use server";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/app/components/QuestionBankList";
import Title from "antd/es/typography/Title";
import "./index.css";
import { message } from "antd";

//服务端渲染加async
export default async function BanksPage() {
  let questionBankList = [];
  //题库数量不多，server全量获取，便于搜索引擎爬虫抓取全部数据收录网站
  const pageSize = 200
  try {
    const questionBankRes = await listQuestionBankVoByPageUsingPost({
      pageSize,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = questionBankRes.data.records ?? [];
  } catch (e: any) {
    message.error("获取题库列表失败，" + e.message);
  }

  return (
    <div id="banksPage" className="max-width-content">
        <Title level={3}>题库大全</Title>
      <QuestionBankList questionBankList={questionBankList}></QuestionBankList>
    </div>
  );
}
