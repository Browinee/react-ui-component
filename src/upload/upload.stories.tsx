// @ts-nocheck
import { ComponentMeta } from "@storybook/react";
import { useRef } from "react";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Upload, { UploadProps } from "./Upload";

export default {
  title: "Example/Upload",
  component: Upload,
} as ComponentMeta<typeof Upload>;

const props: UploadProps = {
  name: "file",
  action: "http://localhost:3333/upload",
  beforeUpload(file) {
    if (file.name.includes("1.image")) {
      return false;
    }
    return true;
  },
  onSuccess(ret) {
    console.log("onSuccess", ret);
  },
  onError(err) {
    console.log("onError", err);
  },
  onProgress(percentage, file) {
    console.log("onProgress", percentage);
  },
  onChange(file) {
    console.log("onChange", file);
  },
};
export const Basic = () => {
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};
