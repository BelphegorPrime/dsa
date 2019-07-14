import React, { Fragment } from "react";
import { Hero as HeroType } from "../../types";
import PropertiesQuickBar from "../PropertiesQuickBar";
import HeroBody from "./HeroBody";
import HeroSideBar from "./HeroSideBar";

interface HeroProps {
  heros: {
    [name: string]: HeroType;
  };
  updateHero: (hero: HeroType) => void;
  removeHero: (hero: string) => void;
  page: string;
  showPage: (page: string) => void;
  chosenHero: HeroType;
  chooseHero: (hero: string) => void;
}

const Hero = (props: HeroProps) => {
  const {
    heros,
    updateHero,
    removeHero,
    page,
    showPage,
    chosenHero,
    chooseHero
  } = props;

  return (
    <Fragment>
      <div className="left-pane col-2">
        <HeroSideBar
          heros={heros}
          chosenHero={chosenHero || null}
          page={page}
          chooseHero={chooseHero}
          removeHero={removeHero}
          showPage={showPage}
        />
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
            maxHeight: "calc(100% - 41px)"
          }}
        >
          {chosenHero ? (
            <HeroBody hero={chosenHero} page={page} updateHero={updateHero} />
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
