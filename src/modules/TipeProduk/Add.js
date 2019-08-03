import React from "react";
import Form from "./Form";
import { Modal } from "antd";
import { useStoreState, useStoreActions } from "easy-peasy";

function Add() {
  const visibleModalAdd = useStoreState(
    state => state.tipeProduk.visibleModalAdd
  );
  const setVisibleModalAdd = useStoreActions(
    actions => actions.tipeProduk.setVisibleModalAdd
  );
  return (
    <Modal
      title="Tambah Tipe Produk"
      visible={visibleModalAdd}
      footer={null}
      onCancel={() => setVisibleModalAdd(false)}
    >
      <Form />
    </Modal>
  );
}

export default Add;
