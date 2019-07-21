import React from "react";
import Form from "./Form";
import { Modal } from "antd";

function Add({ visible = false, handleVisibleAdd }) {
  const title = "Tambah Produk";
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={() => handleVisibleAdd(false)}
    >
      <Form />
    </Modal>
  );
}

export default Add;
