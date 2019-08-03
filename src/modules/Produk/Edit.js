import React from "react";
import { Modal } from "antd";
import { useStoreState, useStoreActions } from "easy-peasy";
import Form from "./Form";

function Edit() {
  // STATE
  const visibleModalEdit = useStoreState(
    state => state.produk.visibleModalEdit
  );

  // ACTION
  const setVisibleModalEdit = useStoreActions(
    actions => actions.produk.setVisibleModalEdit
  );
  return (
    <Modal
      title="Edit Produk"
      visible={visibleModalEdit}
      footer={null}
      onCancel={() => setVisibleModalEdit(false)}
    >
      <Form />
    </Modal>
  );
}

export default Edit;
