import React, { Fragment, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Layout, Card } from "antd";
import { useStoreActions } from "easy-peasy";

import { Route } from "react-router-dom";
// HELPERS
import { isTokenJWTExpired } from "../../helpers/jwt";

const { Header, Footer, Sider, Content } = Layout;

function AdminPage(props) {
  const setCurrentRoute = useStoreActions(
    actions => actions.router.setCurrentRoute
  );

  // Set current route to redux easy peasy
  const arrCurrentRoute = props.location.pathname.split("/");
  switch (arrCurrentRoute.length) {
    case 3:
      setCurrentRoute(arrCurrentRoute[2]);
      break;
    default:
      setCurrentRoute("dashboard");
  }

  const { routes } = props;
  const yearNow = new Date().getFullYear();

  const auth_dataStr = localStorage.getItem("auth_data");
  const auth_data = JSON.parse(auth_dataStr);
  let isAuth = false;

  if (auth_data) {
    isAuth = isTokenJWTExpired(auth_data.token);
    console.log(isAuth);
  }
  const checkAuth = () => {
    if (!isAuth) {
      console.log("WEWEEEEE");
      localStorage.removeItem("auth_data");
      return props.history.push("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  });
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
