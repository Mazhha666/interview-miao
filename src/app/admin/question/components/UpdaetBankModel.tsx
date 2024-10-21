import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { addQuestionBankQuestionUsingPost, listQuestionBankQuestionVoByPageUsingPost, removeQuestionBankQuestionUsingPost } from "@/api/questionBankQuestionController";
import { updateQuestionUsingPost } from "@/api/questionController";
import { Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";

interface Props {
  questionId?: number;
  visible: boolean;
  onCancel: () => void;
}



/**
 * 更新所属题库弹窗
 * @param props
 * @constructor
 */
const UpdateBankModal: React.FC<Props> = (props) => {
  const { questionId, visible, onCancel } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
  >([]);
  //获取所属题库列表
  const getCurrentQuestionBankIdList = async () => {
    try {
      const res = await listQuestionBankQuestionVoByPageUsingPost({
        questionId,
        pageSize: 20,
      });
      const list = (res.data?.records ?? []).map((item) => item.questionBankId);
      form.setFieldValue("questionBankIdList", list);
    } catch (error: any) {
      message.error("获取所属题库列表失败，" + error.message);
    }
  };
  useEffect(() => {
    if (questionId) {
      getCurrentQuestionBankIdList();
    }
  }, [questionId]);
  //获取所有题库列表
  const getQuestionBankList = async () => {
    const pageSize = 200;
    try {
      const res = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
      setQuestionBankList(res.data?.records ?? []);
    } catch (error: any) {
      message.error("获取所有题库列表失败，" + error.message);
    }
  };
  useEffect(() => {
    getQuestionBankList();
  }, []);
  return (
    <Modal
      destroyOnClose
      title={"更新所属题库"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form} style={{ marginTop: "24px" }}>
        <Form.Item label="所属题库" name="questionBankIdList">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            options={questionBankList.map((questionBank) => {
              return {
                label: questionBank.title,
                value: questionBank.id,
              };
            })}
            onSelect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await addQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                message.success("绑定题库成功");
              } catch (error: any) {
                hide();
                message.error("绑定题库失败，" + error.message);
              }
            }}
            onDeselect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await removeQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                message.success("取消绑定题库成功");
              } catch (error: any) {
                hide();
                message.error("取消绑定题库失败，" + error.message);
              }
            }}
            
          >
            
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateBankModal;
