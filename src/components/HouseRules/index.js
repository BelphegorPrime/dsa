import React, { Fragment } from 'react';
import { string, array, func } from 'prop-types';
import HouseRulesBody from './HouseRulesBody';
import HouseRulesSideBar from './HouseRulesSideBar';

const HouseRules = props => {
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
            maxHeight: 'calc(100% - 41px)'
          }}>
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

HouseRules.propTypes = {
  houseRuleToShow: string,
  houseRules: array,
  removeRule: func,
  addNewHouseRules: func,
  setHouseRuleToShow: func
};

export default HouseRules;
