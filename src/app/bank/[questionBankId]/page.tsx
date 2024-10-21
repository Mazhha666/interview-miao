"use server";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import { Avatar, Button, Card, message } from "antd";
import Meta from "antd/es/card/Meta";
import "./index.css";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import QuestionList from "@/app/components/QuestionList";

//服务端渲染加async
//searchParams是q=?&a=？的用法 而/bank/1 是restful用params参数
export default async function BankPage({ params }) {
  //获取搜索框的查询词
  const { questionBankId } = params;
  let bank = undefined;

  try {
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = res.data;
  } catch (e: any) {
    message.error("获取题目列表失败，" + e.message);
  }
  //错误处理 全局异常处理
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }
  //获取第一道题目
  let firstQuestionId;
  if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
    firstQuestionId = bank.questionPage.records[0].id;
  }

  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={56} />}
          title={
            <Title level={4} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <div>
              <Paragraph type="secondary">{bank.description}</Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </div>
          }
        />
      </Card>
      <QuestionList
        questionBankId={questionBankId}
        questionList={bank.questionPage?.records ?? []}
        cardTitle={`题目列表（${bank.questionPage?.total ?? 0}）`}
      ></QuestionList>
    </div>
  );
}
