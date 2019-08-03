import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import { Form, Icon, Input, InputNumber, Row, Col, Select, Button } from "antd";
// import SingleUpload from "../../components/_reuseable/SingleUpload";

const { Option } = Select;

function FormProduk({ form }) {
  const { getFieldDecorator } = form;

  // STATE
  const listTipeProduk = useStoreState(
    state => state.tipeProduk.listTipeProduk
  );
  const visibleModalEdit = useStoreState(
    state => state.produk.visibleModalEdit
  );
  const data = useStoreState(state => state.produk.data);

  // ACTION
  const postData = useStoreActions(actions => actions.produk.post);
  const putData = useStoreActions(actions => actions.produk.put);
  const getListTipeProduk = useStoreActions(
    actions => actions.tipeProduk.getListTipeProduk
  );
  const setVisibleModalAdd = useStoreActions(
    actions => actions.produk.setVisibleModalAdd
  );
  const setVisibleModalEdit = useStoreActions(
    actions => actions.produk.setVisibleModalEdit
  );

  useEffect(() => {
    // Get list tipe produk
    getListTipeProduk();

    // Jika visibleModalEdit true maka set form value dari get one produk
    if (visibleModalEdit) {
      const {
        name,
        product_types,
        capital_price,
        selling_price,
        description
      } = data;

      form.setFields({
        name: { value: name },
        "product_types.product_types_id": {
          value: product_types.product_types_id
        },
        capital_price: { value: capital_price },
        selling_price: { value: selling_price },
        description: { value: description }
      });
    }
  }, [data]);

  const validateHargaModal = (rule, value, callback) => {
    const { getFieldValue } = form;
    if (getFieldValue("capital_price") > value) {
      callback("Harga jual harus lebih besar dari harga modal!");
    }
    callback();
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if (!visibleModalEdit) {
          postData(values);
        } else {
          const { product_id: id } = data;
          putData({ id, data: values });
        }
      }
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Nama Produk" required>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Mohon masukkan nama produk!" }]
          })(
            <Input
              prefix={<Icon type="tag" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Nama Produk"
            />
          )}
        </Form.Item>
        <Form.Item label="Tipe Produk" required>
          {getFieldDecorator("product_types.product_types_id", {
            rules: [{ required: true, message: "Mohon pilih tipe produk!" }]
          })(
            <Select placeholder="Tipe Produk">
              {listTipeProduk.map(data => {
                return (
                  <Option
                    key={data.product_types_id}
                    value={data.product_types_id}
                  >
                    {data.product_types_name}
                  </Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        <Row type="flex" justify="space-between">
          <Col span={11}>
            <Form.Item label="Harga Modal">
              {getFieldDecorator("capital_price", {
                rules: [
                  { required: true, message: "Mohon masukkan harga modal!" }
                ]
              })(
                <InputNumber
                  name="capital_price"
                  min={0}
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  formatter={value =>
                    `Rp${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\Rp\s?|(,*)/g, "")}
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="Harga Jual">
              {getFieldDecorator("selling_price", {
                rules: [
                  { required: true, message: "Mohon masukkan harga jual!" },
                  { validator: validateHargaModal }
                ]
              })(
                <InputNumber
                  min={0}
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  formatter={value =>
                    `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/Rp \s?|(,*)/g, "")}
                  placeholder="Harga Jual"
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Deskripsi (Opsional)" required={false}>
          {getFieldDecorator("description", {
            rules: null
          })(
            <Input
              prefix={
                <Icon type="profile" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Deskripsi (Opsional)"
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
        {/* <Form.Item label="Gambar Produk">
          <div className="dropbox">
            {getFieldDecorator("image", {
              valuePropName: "fileList",
              getValueFromEvent: normFile
            })(<SingleUpload />)}
          </div>
        </Form.Item> */}
      </Form>
    </div>
  );
}

const WrapedForm = Form.create({ name: "tambah_produk" })(FormProduk);

export default WrapedForm;
