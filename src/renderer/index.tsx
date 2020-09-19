import React from "react";
import ReactDOM from "react-dom";
import "bootstrap-css-only/css/bootstrap.min.css";

import "./styles/index.css";
import App from "./components";
import { MainReducerProvider } from "./context/mainReducer/MainContext";
import * as serviceWorker from "./serviceWorker";
import { getElectron } from "./helperFunctions";
import ErrorBoundary from "./ErrorBoundary";

const run = (): void => {
  const electron = getElectron();
  if (electron) {
    ReactDOM.render(
      <ErrorBoundary>
        <MainReducerProvider electron={electron}>
          <App />
        </MainReducerProvider>
      </ErrorBoundary>,
      document.getElementById("root")
    );

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
  }
};

export default run;
