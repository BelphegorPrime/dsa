import React, { Component } from 'react';
import proptypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/fontawesome-free-solid';

import Main from '../index';

class SpellList extends Component {
  constructor() {
    super();
    this.state = {
      tawStars: {}
    };
  }

  changeSpell(name, trial, taw) {
    const { diceThrow, values } = Main.test(trial, this.props.properties);
    const tawStar = taw + diceThrow;
    this.setState(currentState => {
      const newState = currentState.tawStars;
      newState[name] = `${values} => ${tawStar}`;
      return newState;
    });
  }

  render() {
    const { spellList, className } = this.props;
    const { tawStars } = this.state;
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
                <tr key={name}>
                  <td style={{ width: '50%' }}>
                    <div>
                      <span className="font-weight-bold">{name}</span>
                      {spell.variant}
                      ({spell.representation})
                    </div>
                    <div>
                      {spell.complexity
                        ? ` Komplexität(${spell.complexity})`
                        : null}
                      {spell.homeSpell ? (
                        <FontAwesomeIcon icon={faHome} />
                      ) : null}
                    </div>
                    <div>{spell.remarks}</div>
                    <div>{spell.spellComment}</div>
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
