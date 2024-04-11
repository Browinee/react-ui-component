// @ts-nocheck
import { ComponentMeta } from "@storybook/react";
import { Button, Checkbox, Input, Space } from "antd";
import { useRef } from "react";
import Form, { FormInterface } from ".";

export default {
  title: "Example/Form",
  component: Form,
} as ComponentMeta<FormInterface>;

export const Basic = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const form = useRef<FormRefApi>(null);

  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            console.log(form.current?.getFieldsValue());
          }}
        >
          console form value
        </Button>
        <Button
          type="primary"
          onClick={() => {
            form.current?.setFieldsValue({
              username: "username",
            });
          }}
        >
          set username value
        </Button>
      </Space>
      <Form
        ref={form}
        initialValues={{ remember: true, username: "form test" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please enter username!" },
            { max: 6, message: "should be less than 6" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password required" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <div>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
