import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import hierarchyReducer from "./hierarchyReducer";

let reducers = combineReducers({
  auth: authReducer,
  hierarchy: hierarchyReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));
window.store = store;

export default store;
