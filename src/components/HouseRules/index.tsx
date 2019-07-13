import React, { Fragment } from "react";
import { HouseRule } from "../../types";
import HouseRulesBody from "./HouseRulesBody";
import HouseRulesSideBar from "./HouseRulesSideBar";

interface HouseRuleProps {
  houseRules: HouseRule[];
  houseRuleToShow: string;
  removeRule: (ruleId: string) => void;
  addNewHouseRules: (rules: HouseRule[]) => void;
  setHouseRuleToShow: (rule: string) => void;
}

const HouseRules = (props: HouseRuleProps) => {
  const {
    houseRules,
    houseRuleToShow,
    removeRule,
    addNewHouseRules,
    setHouseRuleToShow
  } = props;
  return (
    <Fragment>
      <div className="left-pane col-2">
        <HouseRulesSideBar
          addNewHouseRules={addNewHouseRules}
          setHouseRuleToShow={setHouseRuleToShow}
          houseRuleToShow={houseRuleToShow}
        />
      </div>
      <div className="right-pane col-10 row-without-margin">
        <div
          className="row col-12"
          style={{
            marginLeft: 0,
            marginRight: 0,
            maxHeight: "calc(100% - 41px)"
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
