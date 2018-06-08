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

  changeSpell(name, probe, taw) {
    const { diceThrow, values } = Main.test(probe, this.props.properties);
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
            {spellList.children.map(spell => {
              const {
                anmerkungen,
                hauszauber,
                k,
                kosten,
                name,
                probe,
                reichweite,
                repraesentation,
                value,
                variante,
                wirkungsdauer,
                zauberdauer,
                zauberkommentar
              } = spell.attributes;
              return (
                <tr key={name}>
                  <td style={{ width: '50%' }}>
                    <div>
                      <span className="font-weight-bold">{name}</span>
                      {variante}
                      ({repraesentation})
                    </div>
                    <div>
                      {k ? ` Komplexität(${k})` : null}
                      {hauszauber === 'true' ? (
                        <FontAwesomeIcon icon={faHome} />
                      ) : null}
                    </div>
                    <div>{anmerkungen}</div>
                    <div>{zauberkommentar}</div>
                  </td>
                  <td style={{ width: '7%' }}>{probe}</td>
                  <td style={{ width: '30%' }}>
                    {kosten} | {zauberdauer} | {reichweite} | {wirkungsdauer}
                  </td>
                  <td style={{ width: '3%' }}>{value}</td>
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
                        probe,
                        parseInt(value, 10)
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
