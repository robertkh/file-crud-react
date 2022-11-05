//?
import { useState } from "react";
import { message, Divider, Form, Input, Button } from "antd";
import { FileTwoTone } from "@ant-design/icons";
import { useLngContext } from "../../new-user/context/LngContext";

// todo
export default function DeleteFile({ className }) {
  //
  const strings = useLngContext();

  const onFinish = async (values) => {
    try {
      let response = await fetch("/files/del", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      let result = await response.json();

      if (response.ok) {
        message.success(result);
      } else {
        message.error(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //
  return (
    <div className={className}>
      <Divider>
        <span className="text-success">Delete File</span>
      </Divider>
      <Form name="del" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="filename"
          rules={[
            {
              required: true,
              message: "Please input file name!",
            },
          ]}
        >
          <Input
            prefix={<FileTwoTone className="site-form-item-icon" />}
            placeholder="Filename"
            className="rounded"
          />
        </Form.Item>

        <Form.Item>
          <div class="d-grid">
            <Button type="primary" htmlType="submit" className="rounded block ">
              {strings.df_1}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
