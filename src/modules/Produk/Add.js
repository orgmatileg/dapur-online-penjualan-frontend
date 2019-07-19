import React from "react";
import Form from "./Form";
import { Modal } from "antd";

function Add({ visible = false }) {
  const title = "Tambah Produk";
  return (
    <Modal title={title} visible={visible}>
      <Form />
    </Modal>
  );
}

export default Add;
