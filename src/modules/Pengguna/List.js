import React, { Fragment, useEffect } from "react";
import uuid from "uuid";
import { Table, Row, Col, Button, Icon } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";

const columns = [
  {
    title: "Photo",
    dataIndex: "photo_profile",
    key: "photo_profile",
    render: url => <img height={50} width={50} alt="profile" src={url} />
  },
  {
    title: "Nama Lengkap",
    key: "nama_lengkap",
    render: ({ first_name, last_name }, action) => (
      <span>{`${first_name} ${last_name}`}</span>
    )
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  }
];

function List() {
  const getList = useStoreActions(actions => actions.pengguna.getListPengguna);
  const listPengguna = useStoreState(state => state.pengguna.listPengguna);

  useEffect(() => {
    getList();
  }, []);

  return (
    <Fragment>
      <Row type="flex" justify="space-between" style={{ marginBottom: 15 }}>
        <Col>
          <h1>List Pengguna</h1>
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
        dataSource={listPengguna}
        columns={columns}
      />
      ;
    </Fragment>
  );
}

export default List;
