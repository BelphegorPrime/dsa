import React, { Fragment } from 'react';
import proptypes from 'prop-types';

import { getMainProperties } from '../../helperFunctions';

const MasterSideBar = props => {
  const { heros, chooseHero } = props;
  if (!heros) {
    return null;
  }

  return Object.keys(heros)
    .sort()
    .map((name, index) => {
      const { properties } = heros[name].converted;
      const propertiesString = Object.entries(getMainProperties())
        .map(([key, propKey]) => `${key}:${properties[propKey].value}`)
        .join(', ');

      return (
        <Fragment key={name + index}>
          <div
            style={{ minHeight: 40 }}
            className="cursor-pointer"
            onClick={() => chooseHero(name)}>
            <div className="p-2">
              <span className="font-weight-bold">{name}</span>
              <br />
              {propertiesString}
            </div>
          </div>
          <hr className="m-0" />
        </Fragment>
      );
    });
};

MasterSideBar.propTypes = {
  heros: proptypes.object,
  chooseHero: proptypes.func
};

MasterSideBar.defaultProps = {
  heros: [],
  chooseHero: () => {
    console.warn('no chooseHero Function Provided');
  }
};

export default MasterSideBar;
