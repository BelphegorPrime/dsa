import React, { Suspense } from 'react';
import proptypes from 'prop-types';
import Spinner from '../Spinner';

// import HeroBody from './HeroBody';
// import HeroSideBar from './HeroSideBar';
// import PropertiesQuickBar from '../PropertiesQuickBar';
const HeroBody = React.lazy(() => import('./HeroBody'));
const HeroSideBar = React.lazy(() => import('./HeroSideBar'));
const PropertiesQuickBar = React.lazy(() => import('../PropertiesQuickBar'));

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
    <Suspense fallback={<Spinner />}>
      <div className="left-pane col-md-2">
        <HeroSideBar
          heros={heros}
          chosenHero={chosenHero || null}
          page={page}
          chooseHero={chooseHero}
          removeHero={removeHero}
          showPage={showPage}
        />
      </div>
      <div className="right-pane col-md-10 row-without-margin">
        {chosenHero ? (
          <PropertiesQuickBar
            hero={chosenHero}
            className="col-md-12"
            orientation={'horizontal'}
          />
        ) : null}
        <div
          className="row col-md-12"
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
    </Suspense>
  );
};

Hero.propTypes = {
  heros: proptypes.object,
  chosenHero: proptypes.object,
  page: proptypes.string,
  updateHero: proptypes.func,
  removeHero: proptypes.func,
  showPage: proptypes.func,
  chooseHero: proptypes.func
};

export default Hero;
