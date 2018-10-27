import React, { useState } from 'react';
import proptypes from 'prop-types';

import { test } from '../../helperFunctions';

const TalentList = props => {
  const [tawStars, setTawStars] = useState({});

  const { talentList, className, properties } = props;
  const changeTest = (name, trial, taw) => {
    const { diceThrow, values } = test(trial, properties);
    const tawStar = taw + diceThrow;
    setTawStars(Object.assign(tawStars, { [name]: `${values} => ${tawStar}` }));
  };

  return (
    <div className={className}>
      <table className="fixt-table fixt-table-4 table table-sm table-hover">
        <thead>
          <tr>
            <th style={{ width: 353 }}>Name</th>
            <th style={{ width: 150 }}>Probe</th>
            <th style={{ width: 100 }}>Wert</th>
            <th style={{ width: 250 }}>Test</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(talentList).map(name => {
            const talent = talentList[name];
            return (
              <tr key={name}>
                <td style={{ width: 353 }}>
                  {name}
                  {talent.attack ? ` AT(${talent.attack})` : null}
                  {talent.parade ? ` PA(${talent.parade})` : null}
                  {talent.k ? ` Komplexität(${talent.k})` : null}
                </td>
                <td style={{ width: 150 }}>({talent.trial.join('/')})</td>
                <td style={{ width: 100 }}>{talent.value}</td>
                <td style={{ width: 250 }}>
                  <button
                    className={
                      tawStars[name] &&
                      parseInt(tawStars[name].split(' => ')[1], 10) < 0
                        ? 'btn btn-danger test-btn'
                        : 'btn btn-primary test-btn'
                    }
                    onClick={changeTest(
                      name,
                      talent.trial,
                      parseInt(talent.value, 10)
                    )}
                    style={{ width: 220 }}>
                    {tawStars[name] !== undefined ? tawStars[name] : 'Probe'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

TalentList.propTypes = {
  talentList: proptypes.object,
  properties: proptypes.object,
  className: proptypes.string
};

export default TalentList;
