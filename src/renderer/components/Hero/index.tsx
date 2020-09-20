import React, { Fragment } from "react";
import { useMainReducer } from "../../context/mainReducer/MainContext";
import PropertiesQuickBar from "../PropertiesQuickBar";
import HeroBody from "./HeroBody";
import HeroSideBar from "./HeroSideBar";

const Hero = () => {
  const [
    {
      data: { heroPage, chosenHero },
    },
    { updateHero },
  ] = useMainReducer<true>();

  return (
    <Fragment>
      <div className="left-pane col-2">
        <HeroSideBar />
      </div>
      <div className="right-pane col-10 row-without-margin">
        {chosenHero ? (
          <PropertiesQuickBar
            hero={chosenHero}
            className="col-12"
            orientation={"horizontal"}
          />
        ) : null}
        <div
          className="row col-12"
          style={{
            marginLeft: 0,
            marginRight: 0,
            maxHeight: "calc(100% - 41px)",
          }}
        >
          {chosenHero ? (
            <HeroBody
              hero={chosenHero}
              page={heroPage}
              updateHero={updateHero}
            />
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(Hero);
