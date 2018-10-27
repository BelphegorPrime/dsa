import React, { Fragment } from 'react';
import proptypes from 'prop-types';

import SideBar from './Hero/SideBar';
import PropertiesQuickBar from './Hero/PropertiesQuickBar';
import HouseRulesSideBar from './HouseRules/HouseRulesSideBar';
import HouseRules from './HouseRules';
import Hero from './Hero';

const Body = props => {
  const {
    page,
    heros,
    chosenHero,
    heroPage,
    houseRuleToShow,
    houseRules,
    chooseHero,
    removeHero,
    showHeroPage,
    updateHero,
    addedHouseRule,
    setHouseRuleToShow,
    removeRule
  } = props;
  return (
    <div id="app-body" className="row">
      {page === 'default' || page === 'mastermode' ? (
        <Fragment>
          <div className="left-pane col-md-2">
            <SideBar
              heros={heros}
              chosenHero={chosenHero || null}
              page={heroPage}
              chooseHero={chooseHero}
              removeHero={removeHero}
              showPage={showHeroPage}
            />
          </div>
          <div className="right-pane col-md-10 row-without-margin">
            {chosenHero ? (
              <PropertiesQuickBar hero={chosenHero} className="col-md-12" />
            ) : null}
            <div
              className="row col-md-12"
              style={{
                marginLeft: 0,
                marginRight: 0,
                maxHeight: 'calc(100% - 41px)'
              }}>
              {chosenHero ? (
                <Hero
                  hero={chosenHero}
                  page={heroPage}
                  updateHero={updateHero}
                />
              ) : null}
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="left-pane col-md-2">
            <HouseRulesSideBar
              addedHouseRule={addedHouseRule}
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
              <HouseRules
                houseRuleToShow={houseRuleToShow}
                houseRules={houseRules}
                removeRule={removeRule}
              />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

Body.propTypes = {
  page: proptypes.string,
  heros: proptypes.object,
  chosenHero: proptypes.object,
  heroPage: proptypes.string,
  houseRules: proptypes.array,
  houseRuleToShow: proptypes.string,
  chooseHero: proptypes.func,
  removeHero: proptypes.func,
  showHeroPage: proptypes.func,
  updateHero: proptypes.func,
  addedHouseRule: proptypes.func,
  setHouseRuleToShow: proptypes.func,
  removeRule: proptypes.func
};

export default Body;
