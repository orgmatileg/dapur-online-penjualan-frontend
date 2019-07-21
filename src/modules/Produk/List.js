import React, { Fragment, useEffect } from "react";
import uuid from "uuid";
import { Table, Row, Col, Button, Icon, Popconfirm } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";

function List({ handleVisibleAdd }) {
  const getList = useStoreActions(actions => actions.produk.getListProduk);
  const deleteProduk = useStoreActions(actions => actions.produk.deleteProduk);
  const listProduk = useStoreState(state => state.produk.listProduk);

  const columns = [
    {
      title: "Gambar",
      dataIndex: "image",
      render: url => (
        <img height={50} width={50} alt="gambar makanan" src={url} />
      )
    },
    {
      title: "Nama Produk",
      dataIndex: "name"
    },
    {
      title: "Tipe Produk",
      dataIndex: "product_types.product_types_name"
    },
    {
      title: "Harga Modal",
      dataIndex: "capital_price"
    },
    {
      title: "Harga Jual",
      dataIndex: "selling_price"
    },
    {
      title: "Aksi",
      render: data => (
        <div>
          <span style={{ marginRight: 10 }}>
            <Icon style={{ fontSize: 20, color: "#1890ff" }} type="edit" />
          </span>
          <span>
            <Popconfirm
              title="Apakah Anda yakin ingin menghapus produk ini?"
              onConfirm={() => deleteProduk(data.product_id)}
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
          <h1>List Produk</h1>
        </Col>
        <Col>
          <Button onClick={() => handleVisibleAdd(true)} type="primary">
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
