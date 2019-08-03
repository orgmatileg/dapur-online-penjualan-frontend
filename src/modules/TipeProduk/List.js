import React, { Fragment, useEffect } from "react";
import uuid from "uuid";
import { Table, Row, Col, Button, Icon, Popconfirm } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";

function List() {
  // STATE
  const listData = useStoreState(state => state.tipeProduk.list);

  // ACTION
  const getList = useStoreActions(actions => actions.tipeProduk.getList);
  const getOne = useStoreActions(actions => actions.tipeProduk.getOne);
  const deleteData = useStoreActions(actions => actions.tipeProduk.delete);
  const setVisibleModalAdd = useStoreActions(
    actions => actions.tipeProduk.setVisibleModalAdd
  );
  const setVisibleModalEdit = useStoreActions(
    actions => actions.tipeProduk.setVisibleModalEdit
  );

  const columns = [
    {
      title: "Nama Tipe Produk",
      dataIndex: "product_types_name"
    },
    {
      title: "Aksi",
      render: data => (
        <div>
          <span style={{ marginRight: 10 }}>
            <Icon
              onClick={() => {
                getOne(data.product_types_id);
                setVisibleModalEdit(true);
              }}
              style={{ fontSize: 20, color: "#1890ff" }}
              type="edit"
            />
          </span>
          <span>
            <Popconfirm
              title="Apakah Anda yakin ingin menghapus tipe produk ini?"
              onConfirm={() => deleteData(data.product_types_id)}
              placement="leftBottom"
              okText="Yes"
              cancelText="No"
            >
              <Icon style={{ fontSize: 20, color: "red" }} type="delete" />
            </Popconfirm>
          </span>
        </div>
      )
    }
  ];

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
          <Button onClick={() => setVisibleModalAdd(true)} type="primary">
            TAMBAH <Icon type="plus" />
          </Button>
        </Col>
      </Row>
      <Table
        pagination={{ pageSize: 5 }}
        rowKey={() => uuid.v4()}
        dataSource={listData}
        columns={columns}
      />
      ;
    </Fragment>
  );
}

export default List;
