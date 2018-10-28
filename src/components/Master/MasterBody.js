/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import proptypes from 'prop-types';

const MasterBody = props => {
  const { hero, heros, selectedHeros } = props;
  const chosenHeroName = hero.converted.name;

  const getHeroData = h => {
    const { converted } = h;
    const { fight, name } = converted;
    if (selectedHeros.indexOf(name) === -1) {
      return null;
    }
    return (
      <Fragment key={name}>
        <div className="pl-2">
          <div className="font-weight-bold">{name}</div>
          <div className="pl-4">
            <span className="font-weight-bold">Vorteile: </span>
            {converted.advantages
              .map(
                advantage =>
                  advantage.value
                    ? `${advantage.name} ${advantage.value}`
                    : `${advantage.name}`
              )
              .join(', ')}
          </div>
          <div className="pl-4">
            <span className="font-weight-bold">Nachteile: </span>
            <span className="font-italic">
              {converted.disadvantages
                .map(
                  disadvantage =>
                    disadvantage.value
                      ? `${disadvantage.name} ${disadvantage.value}`
                      : `${disadvantage.name}`
                )
                .join(', ')}
            </span>
          </div>
          <div className="pl-4">
            <span className="font-weight-bold">Kampfwerte: </span>
            {Object.keys(fight)
              .sort((a, b) => {
                const f1 = fight[a];
                const f2 = fight[b];
                if (f1.attack < f2.attack) {
                  return 1;
                }
                if (f1.attack > f2.attack) {
                  return -1;
                }
                return 0;
              })
              .map(talent => {
                const f = fight[talent];
                return `${talent} (AT:${f.attack}, PA:${f.parade})`;
              })
              .join(', ')}
          </div>
        </div>
        <hr />
      </Fragment>
    );
  };

  return (
    <div>
      {getHeroData(hero)}
      {Object.entries(heros).map(([hName, h]) => {
        const isHero = hName === chosenHeroName;
        if (!isHero) {
          return getHeroData(h);
        }
        return null;
      })}
    </div>
  );
};

MasterBody.propTypes = {
  hero: proptypes.object,
  heros: proptypes.object,
  selectedHeros: proptypes.array
};

export default MasterBody;
