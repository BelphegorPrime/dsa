import React, { Component } from 'react';
import proptypes from 'prop-types';
// import RecursiveComponent from '../RecursiveComponent';

import Main from '../index';

class SpellList extends Component {
  constructor() {
    super();
    this.state = {
      tawStars: {}
    };
  }

  changeSpell(name, probe, taw) {
    const { diceThrow, values } = Main.test(probe, this.props.baseProperties);
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
        <table className="fixt-table table table-sm table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Probe</th>
              <th>Wert</th>
              <th>Test</th>
            </tr>
          </thead>
          <tbody>
            {spellList.children.map(spell => {
              const { attributes } = spell;
              console.log(attributes)
              return (
                <tr key={attributes.name}>
                  <td>
                    {attributes.name}
                    {attributes.k ? ` Komplexität(${attributes.k})` : null}
                  </td>
                  <td>{attributes.probe}</td>
                  <td>{attributes.value}</td>
                  <td>
                    <button
                      className={
                        tawStars[attributes.name] &&
                        parseInt(
                          tawStars[attributes.name].split(' => ')[1],
                          10
                        ) < 0
                          ? 'btn btn-danger test-btn'
                          : 'btn btn-primary test-btn'
                      }
                      onClick={this.changeSpell.bind(
                        this,
                        attributes.name,
                        attributes.probe,
                        parseInt(attributes.value, 10)
                      )}>
                      {tawStars[attributes.name] !== undefined
                        ? tawStars[attributes.name]
                        : 'Probe'}
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
  className: proptypes.string,
  baseProperties: proptypes.array
};

export default SpellList;
