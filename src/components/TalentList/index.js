import React, { Component } from 'react';
import proptypes from 'prop-types';

import Main from '../index';

class TalentList extends Component {
  constructor() {
    super();
    this.state = {
      tawStars: {}
    };
  }

  changeTest(name, probe, taw) {
    const { diceThrow, values } = Main.test(probe, this.props.baseProperties);
    const tawStar = taw + diceThrow;
    this.setState(currentState => {
      const newState = currentState.tawStars;
      newState[name] = `${values} => ${tawStar}`;
      return newState;
    });
  }

  render() {
    const { talentList, className, fight } = this.props;
    const { tawStars } = this.state;
    return (
      <div className={className}>
        <table className="fixt-table fixt-table-4 table table-sm table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Probe</th>
              <th>Wert</th>
              <th>Test</th>
            </tr>
          </thead>
          <tbody>
            {talentList.children.map(talent => {
              const { attributes } = talent;
              const possibleWeaponValues = fight.children.filter(
                kw => kw.attributes.name === attributes.name
              );
              let AT = null;
              let PA = null;
              if (possibleWeaponValues.length > 0) {
                const weaponValues = possibleWeaponValues[0];
                AT = weaponValues.children[0].attributes.value;
                PA = weaponValues.children[1].attributes.value;
              }
              return (
                <tr key={attributes.name}>
                  <td>
                    {attributes.name}
                    {AT ? ` AT(${AT})` : null}
                    {PA ? ` PA(${PA})` : null}
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
                      onClick={this.changeTest.bind(
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
        {/* <RecursiveComponent node={talentList} wrapper={'span'} /> */}
      </div>
    );
  }
}

TalentList.propTypes = {
  talentList: proptypes.object,
  fight: proptypes.object,
  className: proptypes.string,
  baseProperties: proptypes.array
};

export default TalentList;
