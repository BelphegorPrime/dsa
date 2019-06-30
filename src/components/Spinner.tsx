import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Spinner = () => (
  <div style={{ textAlign: "center", width: "100%" }}>
    <header className="App-header">
      <FontAwesomeIcon className="App-logo" icon={faDiceD20} />
    </header>
  </div>
);

export default Spinner;
