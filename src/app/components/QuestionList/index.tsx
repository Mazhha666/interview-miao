"use client";
import { Card, List } from "antd";
import TagList from "../TagList";
import "./index.css";
import Link from "next/link";

interface Props {
  questionBankId?: number;
  questionList?: API.QuestionVO[];
  cardTitle?: string;
}

/**
 *  标签列表
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
  const { questionList = [], cardTitle, questionBankId } = props;
  return (
    <Card className="question-list" title={cardTitle}>
      <List
        itemLayout="horizontal"
        dataSource={questionList}
        renderItem={(question) => (
          <List.Item extra={<TagList tagList={question.tagList}></TagList>}>
            {
              <List.Item.Meta
                title={
                  <Link
                    href={
                      questionBankId
                        ? `/bank/${questionBankId}/question/${question.id}`
                        : `/question/${question.id}`
                    }
                  >
                    {question.title}
                  </Link>
                }
              ></List.Item.Meta>
            }
          </List.Item>
        )}
      />
    </Card>
  );
};

export default QuestionList;
