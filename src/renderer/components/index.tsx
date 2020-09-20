import React, { useCallback } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useMainReducer } from "../context/mainReducer/MainContext";
import {
  HeroPage,
  HouseRuleEnum,
  Page,
} from "../context/mainReducer/mainReducer";
import Battle from "./Battle";
import Header from "./Head";
import Hero from "./Hero";
import HouseRules from "./HouseRules";
import Map from "./Map";
import Master from "./Master";
import Nav from "./Nav";
import NoMatch from "./NoMatch";

const App = () => {
  const [
    {
      data: { showNavBar },
    },
    {
      toggleNavBar,
      setPage,
      setHeroPage,
      setHouseRuleToShow,
      setHeros,
      setChosenHero,
      setHouseRules,
    },
  ] = useMainReducer<true>();

  // useEffect(() => setHeros(heros), [heros, setHeros]);
  // useEffect(() => setChosenHero(chosenHero), [chosenHero, setChosenHero]);
  // useEffect(() => setHouseRules(houseRules), [houseRules, setHouseRules]);

  const resetState = useCallback(() => {
    setPage(Page.default);
    setHeros({});
    setChosenHero(null);
    setHeroPage(HeroPage.Basis);
    setHouseRules([]);
    setHouseRuleToShow(HouseRuleEnum.templates);
  }, [setPage, setHeros, setChosenHero, setHouseRules, setHouseRuleToShow]);

  const setToggleNavbar = useCallback(() => {
    toggleNavBar(!showNavBar);
  }, [toggleNavBar, showNavBar]);

  return (
    <Router>
      <div className="App cursor-default">
        <Header resetState={resetState} toggleNavBar={setToggleNavbar} />
        {showNavBar ? <Nav /> : null}
        <div id="app-body" className="row">
          <Switch>
            <Route exact path="/map" component={Map} />
            <Route exact path="/houserules" component={HouseRules} />
            <Route exact path="/mastermode" component={Master} />
            <Route exact path="/battlemode" component={Battle} />
            <Route exact path="/" component={Hero} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default React.memo(App);
