import React, { Fragment } from 'react';
import proptypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index.es';
// import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/index';

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
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => b.ini - a.ini);

  const handlePlayerChange = (e, key, competitor, isNumber = true) => {
    const { value } = e.target;
    encounter.competitors = encounter.competitors.map(comp => {
      const returnCompetitor = comp;
      if (competitor === comp) {
        if (isNumber) {
          returnCompetitor[key] = parseInt(value, 10);
        } else {
          returnCompetitor[key] = value;
        }
      }
      return returnCompetitor;
    });
    update(encounter);
  };

  const handleCompetitorChange = mod => {
    battle.action += mod;
    if (battle.action < 0) {
      battle.kr -= 1;
      battle.action = phases.length - 1;
    }
    if (battle.action > phases.length - 1) {
      battle.kr += 1;
      battle.action = 0;
    }
    const newEncoutner = encounter;
    newEncoutner.battle = battle;
    update(newEncoutner);
  };

  // const showSubMenu = competitor => {
  //   console.log(competitor);
  // };

  return (
    <Fragment>
      <h5 className="col-12 p-0">Kampfverlauf</h5>
      <div className="col-12 pl-0 pr-0 pt-2 pb-2">
        <div className="row m-0">
          <button
            className="col-3 btn btn-primary"
            onClick={() => handleCompetitorChange(-1)}>
            Vorheriger
          </button>
          <div className="col-3 text-center">Kampfrunde: {battle.kr}</div>
          <div className="col-3 text-center">
            <div>Aktion: {battle.action}</div>
            <div>{phases[battle.action].name}</div>
          </div>
          <button
            className="col-3 btn btn-primary"
            onClick={() => handleCompetitorChange(1)}>
            Nächster
          </button>
        </div>
      </div>
      <div className="col-12">
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th className="text-center">LeP</th>
              <th className="text-center">KO</th>
              <th className="text-center">AU</th>
              <th className="text-center">RS</th>
              <th className="text-center">MR</th>
              <th className="text-center">BE</th>
              <th className="text-center">GS</th>
              <th className="text-center">AT</th>
              <th className="text-center">PA</th>
              <th className="text-center">FK</th>
              <th className="text-center">TP</th>
              <th className="text-center">DK</th>
              <th className="text-center">Initiative</th>
              {/*<th className="text-center" />*/}
            </tr>
          </thead>
          <tbody>
            {phases.map((phase, i) => {
              const competitor = competitors.find(c =>
                c.isPlayer
                  ? c.converted.name === phase.name
                  : c.name === phase.name
              );
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
                be,
                au,
                ko,
                gs
              } = competitor;
              let tp = `${tpDiceAmount}w${tpDice}+${tpMod}`;
              let className = '';
              if (competitor.isPlayer) {
                lep = competitor.converted.properties.lifeforce.value;
                mr = competitor.converted.properties.magicResistance.value;
                au = competitor.converted.properties.endurance.value;
                ko = competitor.converted.properties.constitution.value;
                tp = competitor.tp;
                className = 'bg-light';
              }
              if (competitor.battleLep !== undefined) {
                lep = competitor.battleLep;
              }
              if (battle.action === i) {
                className = 'table-primary';
              }
              return (
                <tr className={className} key={phase.name + phase.ini}>
                  <td>{phase.name}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      onChange={e => handlePlayerChange(e, 'lep', competitor)}
                      value={lep}
                    />
                  </td>
                  <td className="text-center">{ko}</td>
                  <td className="text-center">{au}</td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="form-control"
                      onChange={e => handlePlayerChange(e, 'rs', competitor)}
                      value={rs || 0}
                    />
                  </td>
                  <td className="text-center">{mr}</td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="form-control"
                      onChange={e => handlePlayerChange(e, 'be', competitor)}
                      value={be || 0}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="form-control"
                      onChange={e => handlePlayerChange(e, 'gs', competitor)}
                      value={gs || 0}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="form-control"
                      onChange={e => handlePlayerChange(e, 'at', competitor)}
                      value={at || 0}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="form-control"
                      onChange={e => handlePlayerChange(e, 'pa', competitor)}
                      value={pa || 0}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="form-control"
                      onChange={e => handlePlayerChange(e, 'fk', competitor)}
                      value={fk || 0}
                    />
                  </td>
                  <td className="text-center">
                    {!competitor.isPlayer ? (
                      tp
                    ) : (
                      <input
                        className="form-control"
                        onChange={e =>
                          handlePlayerChange(e, 'tp', competitor, false)
                        }
                        value={tp || ''}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {!competitor.isPlayer ? (
                      dk
                    ) : (
                      <input
                        className="form-control"
                        onChange={e =>
                          handlePlayerChange(e, 'dk', competitor, false)
                        }
                        value={dk || ''}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="form-control"
                      onChange={e => handlePlayerChange(e, 'ini', competitor)}
                      value={phase.ini || 0}
                    />
                  </td>
                  {/*<td onClick={() => showSubMenu(competitor)}>*/}
                    {/*<FontAwesomeIcon icon={faEllipsisV} />*/}
                  {/*</td>*/}
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
