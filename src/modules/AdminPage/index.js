import React, { Fragment } from "react";
import Sidebar from "../../components/Sidebar";
import { Layout, Card } from "antd";

import { Route } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

function AdminPage(props) {
  const { routes } = props;
  const yearNow = new Date().getFullYear();
  return (
    <Fragment>
      <Sider width={150}>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <h2>Dapur Online</h2>
        </Header>
        <Content style={{ paddingTop: 30, paddingLeft: 40, paddingRight: 40 }}>
          <Card>
            {routes.map((element, index) => (
              <Route
                exact
                key={index}
                path={element.path}
                component={element.component}
              />
            ))}
          </Card>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Dapur Online @{yearNow} Created by{" "}
          <a href="https://github.com/orgmatileg">Luqmanul Hakim</a>
        </Footer>
      </Layout>
    </Fragment>
  );
}

export default AdminPage;
