import React, { Fragment, useEffect } from "react";
import uuid from "uuid";
import { Table, Row, Col, Button, Icon } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";

const columns = [
  {
    title: "Nama Peran Pengguna",
    dataIndex: "user_role_name",
    key: "user_role_name"
  }
];

function List() {
  const getList = useStoreActions(
    actions => actions.peranPengguna.getListPeranPengguna
  );
  const listPeranPengguna = useStoreState(
    state => state.peranPengguna.listPeranPengguna
  );

  useEffect(() => {
    getList();
    console.log(listPeranPengguna);
  }, []);

  return (
    <Fragment>
      <Row type="flex" justify="space-between" style={{ marginBottom: 15 }}>
        <Col>
          <h1>List Peran Pengguna</h1>
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
        dataSource={listPeranPengguna}
        columns={columns}
      />
      ;
    </Fragment>
  );
}

export default List;
