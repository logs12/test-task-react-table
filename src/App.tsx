import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import routes from "@/routes";
import history from "@/history";
import HomePage from "@/pages/HomePage";
import TablePage from "@/pages/TablePage";
import { store } from "@/store";

const Application = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={routes.root} component={HomePage} />
          <Route path={routes.table} component={TablePage} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default Application;
