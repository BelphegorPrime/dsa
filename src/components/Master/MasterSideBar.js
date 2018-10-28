import React, { Fragment } from 'react';
import proptypes from 'prop-types';

import { getMainProperties } from '../../helperFunctions';

const MasterSideBar = props => {
  const { heros, chooseHero, selectedHeros, setSelectedHeros } = props;
  if (!heros) {
    return null;
  }

  const toggleHero = (name, checked) =>
    checked
      ? setSelectedHeros([...selectedHeros, name])
      : setSelectedHeros(selectedHeros.filter(n => n !== name));

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
            onClick={() => {
              toggleHero(name, selectedHeros.indexOf(name) === -1);
              chooseHero(name);
            }}>
            <div className="p-2">
              <input
                type="checkbox"
                checked={selectedHeros.indexOf(name) > -1}
                onChange={e => {
                  e.stopPropagation();
                  toggleHero(name, e.target.checked);
                }}
              />
              <span className="font-weight-bold pl-2">{name}</span>
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
  selectedHeros: proptypes.array,
  chooseHero: proptypes.func,
  setSelectedHeros: proptypes.func
};

MasterSideBar.defaultProps = {
  heros: [],
  chooseHero: () => {
    console.warn('no chooseHero Function Provided');
  }
};

export default MasterSideBar;
