import React, { Fragment, useState } from 'react';
import proptypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook } from '@fortawesome/free-solid-svg-icons';

import { test, noop } from '../../helperFunctions';

const SpellList = props => {
  const [tawStars, setTawStars] = useState({});
  const [lcdVisible, setLcdVisible] = useState({});

  const { properties, spellList, className } = props;
  const changeSpell = (name, trial, taw, e) => {
    e.stopPropagation();
    const { diceThrow, values } = test(trial, properties);
    const tawStar = taw + diceThrow;
    setTawStars(Object.assign(tawStars, { [name]: `${values} => ${tawStar}` }));
  };

  const showLCD = name => {
    if (lcdVisible.indexOf(name) > -1) {
      setLcdVisible(lcdVisible.filter(n => n !== name));
    } else {
      setLcdVisible([].concat(...lcdVisible, name));
    }
  };

  const nameWidth = 330;
  const checkWidth = 90;
  const costWidth = 255;
  const valueWidth = 46;
  const testWidth = 130;
  return (
    <div className={className}>
      <table className="fixt-table fixt-table-5 table table-sm table-hover">
        <thead>
          <tr>
            <th style={{ width: nameWidth }}>Name</th>
            <th style={{ width: checkWidth }}>Probe</th>
            <th style={{ width: costWidth }}>Kosten | ZDauer | RW | WDauer</th>
            <th style={{ width: valueWidth }}>Wert</th>
            <th style={{ width: testWidth }}>Test</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(spellList).map(name => {
            const spell = spellList[name];
            return (
              <Fragment key={name}>
                <tr
                  className={spell.fromLCD ? 'cursor-pointer' : ''}
                  onClick={spell.fromLCD ? showLCD(name) : noop}>
                  <td style={{ width: nameWidth }}>
                    <div>
                      <span className="font-weight-bold">{name}</span>
                      {spell.variant}({spell.representation})
                      {spell.fromLCD ? (
                        <span className="pl-1">
                          <FontAwesomeIcon icon={faBook} />
                        </span>
                      ) : null}
                    </div>
                    <div>
                      {spell.complexity
                        ? ` Komplexität(${spell.complexity})`
                        : null}
                      {spell.homeSpell ? (
                        <span className="pl-1">
                          <FontAwesomeIcon icon={faHome} />
                        </span>
                      ) : null}
                    </div>
                    <div>{spell.remarks}</div>
                    <div>{spell.spellComment}</div>
                  </td>
                  <td style={{ width: checkWidth }}>
                    ({spell.trial.join('/')})
                  </td>
                  <td style={{ width: costWidth }}>
                    {spell.cost ? `${spell.cost}` : null}
                    {spell.castTime ? ` | ${spell.castTime}` : null}
                    {spell.distance ? ` | ${spell.distance}` : null}
                    {spell.duration ? ` | ${spell.duration}` : null}
                  </td>
                  <td style={{ width: valueWidth }}>{spell.value}</td>
                  <td style={{ width: testWidth }}>
                    <button
                      className={
                        tawStars[name] &&
                        parseInt(tawStars[name].split(' => ')[1], 10) < 0
                          ? 'btn btn-danger test-btn'
                          : 'btn btn-primary test-btn'
                      }
                      style={{ width: testWidth - 20 }}
                      onClick={changeSpell(
                        name,
                        spell.trial,
                        parseInt(spell.value, 10)
                      )}>
                      <span>
                        {tawStars[name] !== undefined
                          ? tawStars[name]
                          : 'Probe'}
                      </span>
                    </button>
                  </td>
                </tr>
                {lcdVisible.indexOf(name) > -1 ? (
                  <tr
                    className="cursor-pointer"
                    onClick={showLCD(name)}>
                    <td
                      colSpan={5}
                      style={{ background: 'lightgrey', width: '100%' }}>
                      <div style={{ padding: 8 }}>
                        <div>
                          <span className="font-weight-bold">Technik: </span>
                          {spell.technik}
                        </div>
                        <div>
                          <span className="font-weight-bold">Wirkung: </span>
                          {spell.effect}
                        </div>
                        <div>
                          <span className="font-weight-bold">Zielobjekt: </span>
                          {spell.target}
                        </div>
                        <div>
                          <span className="font-weight-bold">
                            Modifikationen:{' '}
                          </span>
                          {spell.modifications.join(', ')}
                        </div>
                        <div>
                          <span className="font-weight-bold">Varianten: </span>
                          {spell.variants.map(variant => (
                            <div
                              key={variant.name + variant.effect}
                              className="pl-3 border-bottom border-dark">
                              <div>
                                <span className="font-weight-bold">Name: </span>
                                {variant.name}
                              </div>
                              <div>
                                <span className="font-weight-bold">
                                  Min. ZfW:{' '}
                                </span>
                                {variant.minZfW}
                              </div>
                              <div>
                                <span className="font-weight-bold">
                                  Erschwerniss:{' '}
                                </span>
                                {variant.mod}
                              </div>
                              <div>
                                <span className="font-weight-bold">
                                  Effekt:{' '}
                                </span>
                                {variant.effect}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <span className="font-weight-bold">Reversalis: </span>
                          {spell.reversalis}
                        </div>
                        <div>
                          <span className="font-weight-bold">Antimagie: </span>
                          {spell.antimagic}
                        </div>
                        <div>
                          <span className="font-weight-bold">Merkmale: </span>
                          {spell.characteristics.join(', ')}
                        </div>
                        <div>
                          <span className="font-weight-bold">
                            Repräsentation und Verbreitung:{' '}
                          </span>
                          {spell.distribution
                            .map(
                              distri =>
                                `${distri.representation} ${
                                  distri.distribution
                                }`
                            )
                            .join(', ')}
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

SpellList.propTypes = {
  spellList: proptypes.object,
  properties: proptypes.object,
  className: proptypes.string
};

export default SpellList;
