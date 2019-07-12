import React, { Fragment, useEffect } from "react";
import uuid from "uuid";
import { Table, Row, Col, Button, Icon } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";

const columns = [
  {
    title: "Gambar",
    dataIndex: "image",
    key: "image",
    render: url => <img height={50} width={50} alt="gambar makanan" src={url} />
  },
  {
    title: "Nama Produk",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Tipe Produk",
    dataIndex: "product_types.product_types_name",
    key: "product_types.product_types_name"
  },
  {
    title: "Harga Modal",
    dataIndex: "capital_price",
    key: "capital_price"
  },
  {
    title: "Harga Jual",
    dataIndex: "selling_price",
    key: "selling_price"
  }
];

function List() {
  const getList = useStoreActions(actions => actions.produk.getListProduk);
  const listProduk = useStoreState(state => state.produk.listProduk);

  useEffect(() => {
    getList();
  }, []);

  return (
    <Fragment>
      <Row type="flex" justify="space-between" style={{ marginBottom: 15 }}>
        <Col>
          <h1>List Produk</h1>
        </Col>
        <Col>
          <Button type="primary">
            TAMBAH <Icon type="plus" />
          </Button>
        </Col>
      </Row>
      <Table
        pagination={{ pageSize: 5 }}
        rowKey={uuid.v4()}
        dataSource={listProduk}
        columns={columns}
      />
      ;
    </Fragment>
  );
}

export default List;
