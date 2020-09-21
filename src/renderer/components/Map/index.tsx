import React, { Fragment } from "react";
import Sidebar from "./Sidebar";

const Map = () => (
  <Fragment>
    <div className="left-pane col-2 p-0">
      <Sidebar />
    </div>
    <div className="right-pane row-without-margin col-10">
      <div
        className="row col-12 ml-0 mr-0 pt-2"
        style={{
          maxHeight: "100%",
        }}
      />
    </div>
  </Fragment>
);

export default Map;
