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

  changeTest(name, trial, taw) {
    const { diceThrow, values } = Main.test(trial, this.props.properties);
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
            {Object.keys(talentList).map(name => {
              const talent = talentList[name];
              return (
                <tr key={name}>
                  <td>
                    {name}
                    {talent.attack ? ` AT(${talent.attack})` : null}
                    {talent.parade ? ` PA(${talent.parade})` : null}
                    {talent.k ? ` Komplexität(${talent.k})` : null}
                  </td>
                  <td>({talent.trial.join('/')})</td>
                  <td>{talent.value}</td>
                  <td>
                    <button
                      className={
                        tawStars[name] &&
                        parseInt(tawStars[name].split(' => ')[1], 10) < 0
                          ? 'btn btn-danger test-btn'
                          : 'btn btn-primary test-btn'
                      }
                      onClick={this.changeTest.bind(
                        this,
                        name,
                        talent.trial,
                        parseInt(talent.value, 10)
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

TalentList.propTypes = {
  talentList: proptypes.object,
  properties: proptypes.object,
  className: proptypes.string
};

export default TalentList;