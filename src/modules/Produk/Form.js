import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import { Form, Icon, Input, InputNumber, Row, Col, Select } from "antd";
import SingleUpload from "../../components/_reuseable/SingleUpload";

const { Option } = Select;

function FormProduk({ form }) {
  const { getFieldDecorator } = form;
  const getList = useStoreActions(
    actions => actions.tipeProduk.getListTipeProduk
  );
  const listTipeProduk = useStoreState(
    state => state.tipeProduk.listTipeProduk
  );

  useEffect(() => {
    getList();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  const normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="login-form">
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
          {getFieldDecorator("select-multiple", {
            rules: null
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
                  { required: true, message: "Mohon masukkan harga jual!" }
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
        <Form.Item label="Gambar Produk">
          <div className="dropbox">
            {getFieldDecorator("image", {
              valuePropName: "fileList",
              getValueFromEvent: normFile
            })(<SingleUpload />)}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

const WrapedForm = Form.create({ name: "tambah_produk" })(FormProduk);

export default WrapedForm;
