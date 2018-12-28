import ReactDOM from "react-dom";
import React from "react";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import { createLogger } from "redux-logger";

import App from "./App";
import golfBookingApp from "./reducers";
import thunkMiddleware from "redux-thunk";

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore);

let store = createStoreWithMiddleware(golfBookingApp);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('react-app'));