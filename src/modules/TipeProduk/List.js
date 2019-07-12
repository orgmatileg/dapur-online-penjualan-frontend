import React, { Fragment, useEffect } from "react";
import uuid from "uuid";
import { Table, Row, Col, Button, Icon } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";

const columns = [
  {
    title: "Nama Tipe Produk",
    dataIndex: "product_types_name",
    key: "product_types_name"
  }
];

function List() {
  const getList = useStoreActions(
    actions => actions.tipeProduk.getListTipeProduk
  );
  const listTipeProduk = useStoreState(
    state => state.tipeProduk.listTipeProduk
  );

  useEffect(() => {
    getList();
  }, []);

  return (
    <Fragment>
      <Row type="flex" justify="space-between" style={{ marginBottom: 15 }}>
        <Col>
          <h1>List Tipe Produk</h1>
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
        dataSource={listTipeProduk}
        columns={columns}
      />
      ;
    </Fragment>
  );
}

export default List;
