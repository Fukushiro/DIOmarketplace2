import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./ducks";
import rootSaga from "./modules/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(rootSaga));

sagaMiddleware.run(rootSaga);
export default store;
