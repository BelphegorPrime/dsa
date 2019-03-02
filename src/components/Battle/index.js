import React, { Fragment, useState } from 'react';
import proptypes from 'prop-types';

import MasterSideBar from '../Master/MasterSideBar';

const Battle = props => {
  const { heros, chooseHero } = props;
  const [selectedHeros, setSelectedHeros] = useState(Object.keys(heros));
  console.log(heros);
  console.log(selectedHeros);
  const battleHeros = selectedHeros.map(name => heros[name]);
  console.log(battleHeros);
  return (
    <Fragment>
      <div className="left-pane col-md-2 p-0">
        <MasterSideBar
          heros={heros}
          chooseHero={chooseHero}
          selectedHeros={selectedHeros}
          setSelectedHeros={setSelectedHeros}
          withProperties={false}
        />
      </div>
      <div className="right-pane row-without-margin col-md-10">
        <div
          className="row col-md-12 ml-0 mr-0 pt-2"
          style={{
            maxHeight: '100%'
          }}
        />
      </div>
    </Fragment>
  );
};

Battle.propTypes = {
  heros: proptypes.object,
  chooseHero: proptypes.func
};

export default Battle;
