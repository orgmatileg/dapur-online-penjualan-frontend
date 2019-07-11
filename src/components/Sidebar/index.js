import React, { Fragment } from "react";
import { Menu, Icon, Row } from "antd";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo/logo-default.png";
import "./Sidebar.css";

function Sidebar(props) {
  console.log(props, "sidebar");
  const heightMenu = 80;

  return (
    <Fragment>
      <div
        style={{
          paddingTop: 15,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "orange",
          height: 150
        }}
      >
        <img src={Logo} alt="logo" width={100} height={100} />
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        theme="dark"
        style={{ fontWeight: "bold" }}
      >
        <Menu.Item key="1" style={{ height: "100%", paddingTop: 10 }}>
          <Row type="flex" justify="center" align="middle">
            <Link className="disableStyle" to="/admin">
              <Icon type="home" style={{ fontSize: 35, width: "100%" }} />
              <p>DASHBOARD</p>
            </Link>
          </Row>
        </Menu.Item>
        <Menu.Item key="2" style={{ height: heightMenu, paddingTop: 10 }}>
          <Row type="flex" justify="center" align="middle">
            <Link
              className="disableStyle"
              to="/admin/penjualan"
              style={{ textDecoration: "none" }}
            >
              <Icon type="shop" style={{ fontSize: 35, width: "100%" }} />
              <p>PENJUALAN</p>
            </Link>
          </Row>
        </Menu.Item>
        <Menu.Item key="3" style={{ height: heightMenu, paddingTop: 10 }}>
          <Row type="flex" justify="center" align="middle">
            <Link className="disableStyle" to={"/admin/produk"}>
              <Icon type="database" style={{ fontSize: 35, width: "100%" }} />
              <p>PRODUK</p>
            </Link>
          </Row>
        </Menu.Item>
        <Menu.Item key="4" style={{ height: heightMenu, paddingTop: 10 }}>
          <Row type="flex" justify="center" align="middle">
            <Icon type="tags" style={{ fontSize: 35, width: "100%" }} />
            <p>TIPE PRODUK</p>
          </Row>
        </Menu.Item>
        <Menu.Item key="5" style={{ height: heightMenu, paddingTop: 10 }}>
          <Row type="flex" justify="center" align="middle">
            <Link className="disableStyle" to="/admin/pengguna">
              <Icon
                type="usergroup-add"
                style={{ fontSize: 35, width: "100%" }}
              />
              <p>PENGGUNA</p>
            </Link>
          </Row>
        </Menu.Item>
        <Menu.Item key="6" style={{ height: heightMenu, paddingTop: 10 }}>
          <Row type="flex" justify="center" align="middle">
            <Icon type="safety" style={{ fontSize: 35, width: "100%" }} />
            <p>USER ROLES</p>
          </Row>
        </Menu.Item>
      </Menu>
    </Fragment>
  );
}

export default Sidebar;
