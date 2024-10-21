"use client";
import { Card } from "antd";
import "./index.css";
import Title from "antd/es/typography/Title";
import TagList from "../TagList";
import MdViewer from "../MdViewer";

interface Props {
  question:API.QuestionVO
}

/**
 *  题目卡片
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
//Title  level={1} 而不是4是为了爬虫搜索一级标题便与收录网站
  const {question} = props
  return (
    <div className="questionCard">
      <Card>
        <Title  level={1} style={{fontSize:24}}>
          {question.title}
        </Title>
        <TagList tagList={question.tagList} />
        <div style={{marginBottom:16}}></div>
        <MdViewer value={question.content} />
      </Card>
      <div style={{marginBottom:16}}></div>
      <Card title="推荐答案">
      <MdViewer value={question.answer} />
      </Card>
    </div>
  );
};

export default QuestionCard;
