import React from "react";
import { RouteWithSubRoutes, routes } from "./routes";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

function App() {
  const auth_dataStr = localStorage.getItem("auth_data");
  const auth_data = JSON.parse(auth_dataStr);
  const isAuthenticated = () => {
    return auth_data === null ? (
      <Redirect to="/login" />
    ) : (
      <Redirect to="/admin" />
    );
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
        {isAuthenticated()}
      </Layout>
    </Router>
  );
}

export default App;
