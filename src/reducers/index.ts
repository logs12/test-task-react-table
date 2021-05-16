import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { dataReducer } from "./DataReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    data: dataReducer,
  });

export default createRootReducer;
