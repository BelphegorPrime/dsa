import React, { Fragment } from "react";
import { useMainReducer } from "../../context/mainReducer/MainContext";
import HouseRulesBody from "./HouseRulesBody";
import HouseRulesSideBar from "./HouseRulesSideBar";

const HouseRules = () => {
  const [
    {
      data: { houseRuleToShow, houseRules },
    },
    { removeRule, addNewHouseRules },
  ] = useMainReducer<true>();

  return (
    <Fragment>
      <div className="left-pane col-2">
        <HouseRulesSideBar
          addNewHouseRules={addNewHouseRules}
          houseRuleToShow={houseRuleToShow}
        />
      </div>
      <div className="right-pane col-10 row-without-margin">
        <div
          className="row col-12"
          style={{
            marginLeft: 0,
            marginRight: 0,
            maxHeight: "calc(100% - 41px)",
          }}
        >
          <HouseRulesBody
            houseRuleToShow={houseRuleToShow}
            houseRules={houseRules}
            removeRule={removeRule}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default HouseRules;
