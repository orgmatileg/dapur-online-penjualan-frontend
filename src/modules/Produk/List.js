import React, { Fragment, useEffect } from "react";
import uuid from "uuid";
import { Table, Row, Col, Button, Icon, Popconfirm, Tag } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import numeral from "numeral";

function List() {
  // STATE
  const listData = useStoreState(state => state.produk.list);

  // ACTION
  const getList = useStoreActions(actions => actions.produk.getList);
  const getOne = useStoreActions(actions => actions.produk.getOne);
  const deleteData = useStoreActions(actions => actions.produk.delete);
  const setVisibleModalAdd = useStoreActions(
    actions => actions.produk.setVisibleModalAdd
  );
  const setVisibleModalEdit = useStoreActions(
    actions => actions.produk.setVisibleModalEdit
  );

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
      dataIndex: "product_types.product_types_name",
      render: data => <Tag color="orange">{data}</Tag>
    },
    {
      title: "Harga Modal",
      dataIndex: "capital_price",
      render: data => <span>{numeral(data).format("0,0")}</span>
    },
    {
      title: "Harga Jual",
      dataIndex: "selling_price",
      render: data => <span>{numeral(data).format("0,0")}</span>
    },
    {
      title: "Aksi",
      render: data => (
        <div>
          <span style={{ marginRight: 10 }}>
            <Icon
              onClick={() => {
                getOne(data.product_id);
                setVisibleModalEdit(true);
              }}
              style={{ fontSize: 20, color: "#1890ff" }}
              type="edit"
            />
          </span>
          <span>
            <Popconfirm
              title="Apakah Anda yakin ingin menghapus produk ini?"
              onConfirm={() => deleteData(data.product_id)}
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
