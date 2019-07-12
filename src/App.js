// MAIN
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// ROUTES
import { RouteWithSubRoutes, routes } from "./routes";

// CSS
import { Layout } from "antd";

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
