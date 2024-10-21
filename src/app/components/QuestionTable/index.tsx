"use client";
import {
  listQuestionVoByPageUsingPost
} from "@/api/questionController";
import TagList from "@/app/components/TagList";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import Link from "next/link";
import React, { useRef, useState } from "react";
/**
 * 题目表格组件
 *
 * @constructor
 */

interface Props {
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?:number;
  //默认搜索条件
  defaultSearchParams?:API.QuestionQueryRequest
}
const QuestionTable: React.FC<Props> = (props: Props) => {
  const {defaultQuestionList,defaultTotal,defaultSearchParams={}} = props
  const actionRef = useRef<ActionType>();
  //题目列表
  const [questionList,setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || []
  )
  //题目总数
  const [total,setTotal] = useState<number>(defaultTotal || 0)
  //用于判断首次加载
  const [isFirstLoad,setIsFirstLoad] = useState<boolean>(true)
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      render: (_, record) => {
        return  <Link href={`/question/${record.id}`}>{ record.title}</Link>;
      },
    },

    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        return <TagList tagList={record.tagList} />;
      },
    },
  ];

  return (
    <div className="question-table ">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size="large"
        dataSource={questionList}
        search={{
          labelWidth: "auto",
        }}
        form={{initialValues:defaultSearchParams}}
        pagination={{
          pageSize: 12,
          showTotal: (total) => `总共${total}条`,
          showSizeChanger: false,
          total
        }}
        request={async (params, sort, filter) => {
          //判断是否是首次请求 避免服务端请求后二次请求
          if(isFirstLoad){
            setIsFirstLoad(false)
            if(defaultQuestionList && defaultTotal){
              return {};
            }
          }
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] || 'descend';

          const { data, code } = await listQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);
          //更新结果
          const newData = data?.records || [];
          const newTotal = data?.total || 0;
          //更新赋值
          setQuestionList(newData);
          setTotal(newTotal)
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>
  );
};
export default QuestionTable;
