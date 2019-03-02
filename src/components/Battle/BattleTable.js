import React from 'react';
import proptypes from 'prop-types';

const BattleTable = props => {
  const { competitors } = props;
  const phases = competitors
    .map(competitor => {
      const { ini } = competitor;
      const phaseArray = [
        {
          name: competitor.isPlayer
            ? competitor.converted.name
            : competitor.name,
          ini: competitor.ini
        }
      ];
      for (let i = ini; i > 8; i -= 8) {
        const c = Object.assign({}, competitor);
        c.ini -= 8 * phaseArray.length;
        phaseArray.push({
          name: c.isPlayer ? c.converted.name : c.name,
          ini: c.ini
        });
      }
      return phaseArray;
    })
    .reduce((acc, val) => [...acc, ...val], [])
    .sort((a, b) => b.ini - a.ini);
  console.log(competitors);
  console.log(phases);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Initiative</th>
        </tr>
      </thead>
      <tbody>
        {phases.map(phase => {
          const competitor = competitors.find(c =>
            c.isPlayer ? c.converted.name === phase.name : c.name === phase.name
          );
          console.log(competitor)
          return (
            <tr key={phase.name + phase.ini}>
              <td>{phase.name}</td>
              <td>{phase.ini}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

BattleTable.propTypes = {
  competitors: proptypes.array
};

export default BattleTable;
