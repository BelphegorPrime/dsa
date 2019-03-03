import React, { Fragment } from 'react';
import proptypes from 'prop-types';

const BattleTable = props => {
  const { encounter, update } = props;
  const { competitors, battle } = encounter;
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

  const handleLePChange = (e, c) => {
    const { value } = e.target;
    encounter.competitors = encounter.competitors.map(comp => {
      const returnCompetitor = comp;
      if (c === comp) {
        returnCompetitor.battleLep = parseInt(value, 10);
      }
      return returnCompetitor;
    });
    update(encounter);
  };

  return (
    <Fragment>
      <div className="col-12">Kampfverlauf</div>
      <div className="col-12">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>LeP</th>
              <th>RS</th>
              <th>MR</th>
              <th>BE</th>
              <th>AT</th>
              <th>PA</th>
              <th>FK</th>
              <th>TP</th>
              <th>DK</th>
              <th>Initiative</th>
            </tr>
          </thead>
          <tbody>
            {phases.map((phase, i) => {
              const competitor = competitors.find(c =>
                c.isPlayer
                  ? c.converted.name === phase.name
                  : c.name === phase.name
              );
              console.log(competitor);
              let {
                lep,
                rs,
                at,
                pa,
                fk,
                tpDiceAmount,
                tpDice,
                tpMod,
                mr,
                dk,
                be
              } = competitor;
              //     au: 50,
              //     ko: 10,
              //     gs: 5,
              if (competitor.isPlayer) {
                lep = competitor.converted.properties.lifeforce.value;
              }
              if (competitor.battleLep !== undefined) {
                lep = competitor.battleLep;
              }
              const tp = `${tpDiceAmount}w${tpDice}+${tpMod}`;

              return (
                <tr
                  className={battle.action === i ? 'table-primary' : ''}
                  key={phase.name + phase.ini}>
                  <td>{phase.name}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      onChange={e => handleLePChange(e, competitor)}
                      value={lep}
                    />
                  </td>
                  <td>{rs !== undefined ? rs : ''}</td>
                  <td>{mr !== undefined ? mr : ''}</td>
                  <td>{be !== undefined ? be : ''}</td>
                  <td>{at !== undefined ? at : ''}</td>
                  <td>{pa !== undefined ? pa : ''}</td>
                  <td>{fk !== undefined ? fk : ''}</td>
                  <td>{dk !== undefined ? dk : ''}</td>
                  <td>{tpDiceAmount !== undefined ? tp : ''}</td>
                  <td>{phase.ini}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

BattleTable.propTypes = {
  encounter: proptypes.object,
  update: proptypes.func
};

export default BattleTable;
