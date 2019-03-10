import React, { Fragment } from 'react';
import {object, string, func} from 'prop-types';
import HeroBody from './HeroBody';
import HeroSideBar from './HeroSideBar';
import PropertiesQuickBar from '../PropertiesQuickBar';

const Hero = props => {
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
            orientation={'horizontal'}
          />
        ) : null}
        <div
          className="row col-12"
          style={{
            marginLeft: 0,
            marginRight: 0,
            maxHeight: 'calc(100% - 41px)'
          }}>
          {chosenHero ? (
            <HeroBody hero={chosenHero} page={page} updateHero={updateHero} />
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

Hero.propTypes = {
  heros: object,
  chosenHero: object,
  page: string,
  updateHero: func,
  removeHero: func,
  showPage: func,
  chooseHero: func
};

export default Hero;
