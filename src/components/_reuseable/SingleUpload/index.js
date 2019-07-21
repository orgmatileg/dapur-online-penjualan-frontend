import React from "react";
import { Upload, Icon, message } from "antd";

function SingleUpload({ fileType = "", maxFileSize = 2, getBase64file }) {
  let fileList = [];
  const imageUrl = "";

  // Accepted file extension to upload
  let acceptedFileExt = [];
  let fileTypeName = "";
  switch (fileType) {
    case "image":
      acceptedFileExt.push("image/jpeg", "image/jpg", "image/png");
      fileTypeName = "Image";
      break;
    default:
      break;
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = file => {
    let allowedFile = true;
    if (acceptedFileExt.includes(file.type)) {
      allowedFile = false;
      message.error(`You can only upload ${acceptedFileExt.join(", ")} file!`);
    }
    const isLt2M = file.size / 1024 / 1024 < maxFileSize;
    if (!isLt2M) {
      message.error(`${fileTypeName} must smaller than ${maxFileSize}MB!`);
    }
    if (allowedFile && isLt2M) {
      fileList.push(file);
      return true;
    }
    return false;
  };

  const handleChange = info => {
    getBase64(info.file.originFileObj, base64 => {
      if (getBase64file) getBase64file(base64);
    });
  };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={true}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      multiple={false}
      customRequest={null}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
    </Upload>
  );
}

export default SingleUpload;
