import React, { Fragment, useState } from 'react';
import proptypes from 'prop-types';

const MasterBody = React.lazy(() => import('./MasterBody'));
const MasterSideBar = React.lazy(() => import('./MasterSideBar'));

const Hero = props => {
  const { heros, chooseHero } = props;
  const [selectedHeros, setSelectedHeros] = useState(Object.keys(heros));
  return (
    <Fragment>
      <div className="left-pane col-md-2 p-0">
        <MasterSideBar
          heros={heros}
          chooseHero={chooseHero}
          selectedHeros={selectedHeros}
          setSelectedHeros={setSelectedHeros}
        />
      </div>
      <div className="right-pane row-without-margin col-md-10">
        <div
          className="row col-md-12 ml-0 mr-0 pt-2"
          style={{
            maxHeight: '100%'
          }}>
          <MasterBody heros={heros} selectedHeros={selectedHeros} />
        </div>
      </div>
    </Fragment>
  );
};

Hero.propTypes = {
  heros: proptypes.object,
  chooseHero: proptypes.func
};

export default Hero;
