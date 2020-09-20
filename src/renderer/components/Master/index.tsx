import React, { Fragment, useState } from "react";
import { useMainReducer } from "../../context/mainReducer/MainContext";
import MasterBody from "./MasterBody";
import MasterSideBar from "./MasterSideBar";

const Master = () => {
  const [
    {
      data: { heros },
    },
    { chooseHero },
  ] = useMainReducer<true>();
  const [selectedHeros, setSelectedHeros] = useState(Object.keys(heros));
  return (
    <Fragment>
      <div className="left-pane col-2 p-0">
        <MasterSideBar
          heros={heros}
          chooseHero={chooseHero}
          selectedHeros={selectedHeros}
          setSelectedHeros={setSelectedHeros}
          withProperties={false}
        />
      </div>
      <div className="right-pane row-without-margin col-10">
        <div
          className="row col-12 ml-0 mr-0 pt-2"
          style={{
            maxHeight: "100%",
          }}
        >
          <MasterBody heros={heros} selectedHeros={selectedHeros} />
        </div>
      </div>
    </Fragment>
  );
};

export default Master;
