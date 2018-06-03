import React, { Component } from 'react';
import proptypes from 'prop-types';
// import RecursiveComponent from '../RecursiveComponent';

import Main from '../index';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tawStars: {}
    };
  }

  static test(probe, baseProperties) {
    const values = probe
      .split('(')[1]
      .split(')')[0]
      .split('/')
      .map(pp => {
        const possibleBaseProperties = baseProperties.filter(
          bp => bp.name === pp
        );
        if (possibleBaseProperties.length > 0) {
          return possibleBaseProperties[0].value;
        }
        return 0;
      })
      .map(val => val - Main.rollDice(20));
    return {
      values: `(${values.join('/')})`,
      diceThrow: values
        .filter(val => val < 0)
        .reduce((acc, val) => acc + val, 0)
    };
  }

  changeTest(name, probe, taw) {
    const { diceThrow, values } = App.test(probe, this.props.baseProperties);
    const tawStar = taw + diceThrow;
    this.setState(currentState => {
      const newState = currentState.tawStars;
      newState[name] = `${values} => ${tawStar}`;
      return newState;
    });
  }

  render() {
    const { talentList, className } = this.props;
    const { tawStars } = this.state;
    return (
      <div className={className}>
        <table>
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
              return (
                <tr key={attributes.name}>
                  <td>{attributes.name}</td>
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

App.propTypes = {
  talentList: proptypes.object,
  className: proptypes.string,
  baseProperties: proptypes.array
};

export default App;
