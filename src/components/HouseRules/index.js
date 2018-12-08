import React, {Fragment} from 'react';
import proptypes from 'prop-types';

const HouseRulesBody = React.lazy(() => import('./HouseRulesBody'));
const HouseRulesSideBar = React.lazy(() => import('./HouseRulesSideBar'));

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
      <div className="left-pane col-md-2">
        <HouseRulesSideBar
          addNewHouseRules={addNewHouseRules}
          setHouseRuleToShow={setHouseRuleToShow}
          houseRuleToShow={houseRuleToShow}
        />
      </div>
      <div className="right-pane col-md-10 row-without-margin">
        <div
          className="row col-md-12"
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
  houseRuleToShow: proptypes.string,
  houseRules: proptypes.array,
  removeRule: proptypes.func,
  addNewHouseRules: proptypes.func,
  setHouseRuleToShow: proptypes.func
};

export default HouseRules;
