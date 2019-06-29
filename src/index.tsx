import "bootstrap-css-only/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/index";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";

import { getElectron } from "./helperFunctions";

class ErrorBoundary extends React.Component<
  { children: any },
  { hasError: boolean }
> {
  public static getDerivedStateFromError(error: Error) {
    console.error("error: ", error);
    return { hasError: true };
  }
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(
    error: Error,
    info: {
      componentStack: string;
    }
  ) {
    console.error("error: ", error, "info: ", info);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

ReactDOM.render(
  <ErrorBoundary>
    <App electron={getElectron()} />
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
