import React, { Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";

const NoMatch = ({ location }: RouteComponentProps) => (
  <Fragment>
    <div className="left-pane col-2" />
    <div className="right-pane col-10 row-without-margin">
      <div
        className="row col-12"
        style={{
          marginLeft: 0,
          marginRight: 0,
          maxHeight: "calc(100% - 41px)",
        }}
      >
        Seite {location.pathname} nicht gefunden.
      </div>
    </div>
  </Fragment>
);

export default NoMatch;
