import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import { Form, Icon, Input, Row, Button } from "antd";

function FormProduk({ form }) {
  const { getFieldDecorator } = form;

  // STATE
  const visibleModalEdit = useStoreState(
    state => state.tipeProduk.visibleModalEdit
  );
  const data = useStoreState(state => state.tipeProduk.data);

  // ACTION
  const postData = useStoreActions(actions => actions.tipeProduk.post);
  const putData = useStoreActions(actions => actions.tipeProduk.put);
  const setVisibleModalAdd = useStoreActions(
    actions => actions.tipeProduk.setVisibleModalAdd
  );
  const setVisibleModalEdit = useStoreActions(
    actions => actions.tipeProduk.setVisibleModalEdit
  );

  useEffect(() => {
    console.log(form);
    // Jika visibleModalEdit true maka set form value dari get one
    if (visibleModalEdit) {
      const { product_types_name } = data;

      form.setFields({
        product_types_name: { value: product_types_name }
      });
    }
  }, [data]);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if (!visibleModalEdit) {
          postData(values);
          form.resetFields();
        } else {
          const { product_types_id: id } = data;
          putData({ id, data: values });
        }
      }
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Nama Tipe Produk" required>
          {getFieldDecorator("product_types_name", {
            rules: [
              { required: true, message: "Mohon masukkan nama tipe produk!" }
            ]
          })(
            <Input
              prefix={<Icon type="tag" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Nama Tipe Produk"
            />
          )}
        </Form.Item>
        <Row type="flex" justify="end" style={{ marginTop: 10 }}>
          <Form.Item style={{ marginRight: 5 }}>
            <Button
              type="default"
              onClick={() =>
                visibleModalEdit
                  ? setVisibleModalEdit(false)
                  : setVisibleModalAdd(false)
              }
            >
              Cancel
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
}

const WrapedForm = Form.create({ name: "tambah_produk" })(FormProduk);

export default WrapedForm;
