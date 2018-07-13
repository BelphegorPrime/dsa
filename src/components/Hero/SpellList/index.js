import React, { Component } from 'react';
import proptypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook } from '@fortawesome/free-solid-svg-icons';

import Main from '../../index';

class SpellList extends Component {
  constructor() {
    super();
    this.state = {
      tawStars: {},
      lcdVisible: []
    };
  }

  changeSpell(name, trial, taw, e) {
    e.stopPropagation();
    const { diceThrow, values } = Main.test(trial, this.props.properties);
    const tawStar = taw + diceThrow;
    this.setState(currentState => {
      const newState = currentState.tawStars;
      newState[name] = `${values} => ${tawStar}`;
      return newState;
    });
  }

  showLCD(name) {
    const { lcdVisible } = this.state;
    if (lcdVisible.indexOf(name) > -1) {
      this.setState({ lcdVisible: lcdVisible.filter(n => n !== name) });
    } else {
      this.setState({ lcdVisible: [].concat(...lcdVisible, name) });
    }
  }

  render() {
    const { spellList, className } = this.props;
    const { tawStars, lcdVisible } = this.state;
    return (
      <div className={className}>
        <table className="fixt-table fixt-table-5 table table-sm table-hover">
          <thead>
            <tr>
              <th style={{ width: '50%' }}>Name</th>
              <th style={{ width: '7%' }}>Probe</th>
              <th style={{ width: '30%' }}>Kosten | ZDauer | RW | WDauer</th>
              <th style={{ width: '3%' }}>Wert</th>
              <th style={{ width: '10%' }}>Test</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(spellList).map(name => {
              const spell = spellList[name];
              return (
                <tr
                  key={name}
                  onClick={
                    spell.fromLCD ? this.showLCD.bind(this, name) : () => {}
                  }>
                  <td style={{ width: '50%' }}>
                    <div>
                      <span className="font-weight-bold">{name}</span>
                      {spell.variant}
                      ({spell.representation})
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
                    {lcdVisible.indexOf(name) > -1 ? (
                      <div>
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
                    ) : null}
                  </td>
                  <td style={{ width: '7%' }}>({spell.trial.join('/')})</td>
                  <td style={{ width: '30%' }}>
                    {spell.cost ? `${spell.cost}` : null}
                    {spell.castTime ? ` | ${spell.castTime}` : null}
                    {spell.distance ? ` | ${spell.distance}` : null}
                    {spell.duration ? ` | ${spell.duration}` : null}
                  </td>
                  <td style={{ width: '3%' }}>{spell.value}</td>
                  <td style={{ width: '10%' }}>
                    <button
                      className={
                        tawStars[name] &&
                        parseInt(tawStars[name].split(' => ')[1], 10) < 0
                          ? 'btn btn-danger test-btn'
                          : 'btn btn-primary test-btn'
                      }
                      onClick={this.changeSpell.bind(
                        this,
                        name,
                        spell.trial,
                        parseInt(spell.value, 10)
                      )}>
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
  }
}

SpellList.propTypes = {
  spellList: proptypes.object,
  properties: proptypes.object,
  className: proptypes.string
};

export default SpellList;
