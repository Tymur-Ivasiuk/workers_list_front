import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import hierarchyReducer from "./hierarchyReducer";
import allDataReducer from "./allDataReducer";

let reducers = combineReducers({
  auth: authReducer,
  hierarchy: hierarchyReducer,
  allData: allDataReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));
window.store = store;

export default store;
