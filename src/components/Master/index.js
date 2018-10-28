import React, { Fragment } from 'react';
import proptypes from 'prop-types';

import MasterBody from './MasterBody';
import MasterSideBar from './MasterSideBar';

const Hero = props => {
  const { heros, updateHero, page, chosenHero, chooseHero } = props;
  return (
    <Fragment>
      <div className="left-pane col-md-2 p-0">
        <MasterSideBar heros={heros} chooseHero={chooseHero} />
      </div>
      <div className="right-pane row-without-margin col-md-10">
        <div
          className="row col-md-12"
          style={{
            marginLeft: 0,
            marginRight: 0,
            maxHeight: 'calc(100% - 41px)'
          }}>
          {chosenHero ? (
            <MasterBody
              heros={heros}
              hero={chosenHero}
              page={page}
              updateHero={updateHero}
            />
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

Hero.propTypes = {
  heros: proptypes.object,
  chosenHero: proptypes.object,
  page: proptypes.string,
  updateHero: proptypes.func,
  chooseHero: proptypes.func
};

export default Hero;
