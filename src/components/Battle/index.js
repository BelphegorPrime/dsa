import React, { Fragment, useState } from 'react';
import { object, func, array } from 'prop-types';
import Select from 'react-select';

import { useBoolean } from 'react-use';
import MasterSideBar from '../Master/MasterSideBar';
import EncounterModal from './EncounterModal';
import StartEncounterModal from './StartEncounterModal';
import { rollDice } from '../../helperFunctions';
import BattleTable from './BattleTable';

const Battle = props => {
  const {
    heros,
    chooseHero,
    encounter,
    setEncounter,
    activeEncounter,
    setActiveEncounter
  } = props;
  const [selectedHeros, setSelectedHeros] = useState(Object.keys(heros));
  const [selectedEncounter, setSelectedEncounter] = useState(null);
  const [showEncounterModal, setShowEncounterModal] = useBoolean(false);
  const [showStartEncounterModal, setShowStartEncounterModal] = useBoolean(
    false
  );

  const battleHeros = selectedHeros.map(name => heros[name]).filter(e => e);
  const handleShowHeroIniModal = () => {
    if (selectedEncounter) {
      setShowStartEncounterModal(true);
    }
  };

  const startBattle = inis => {
    const heroData = battleHeros.map(hero => {
      const returnHero = hero;
      returnHero.ini = inis[returnHero.converted.name];
      returnHero.isPlayer = true;
      return returnHero;
    });
    selectedEncounter.competitors = [
      ...selectedEncounter.competitors.map(competitor => ({
        ...competitor,
        ini: competitor.iniBase + rollDice(6)
      })),
      ...heroData
    ].sort((a, b) => b.ini - a.ini);
    selectedEncounter.battle = { kr: 1, action: 0 };
    setActiveEncounter(selectedEncounter);
  };

  const finishBattle = () => {
    setActiveEncounter(null);
  };

  const removeEncounter = () =>
    setEncounter(encounter.filter(e => e.id !== selectedEncounter.id));

  return (
    <Fragment>
      <div className="left-pane col-2 p-0">
        <div className="col-12 p-2">
          <div
            className="btn btn-primary"
            onClick={() => {
              setShowEncounterModal(true);
            }}>
            Neuer Kampf
          </div>
        </div>
        <MasterSideBar
          heros={heros}
          chooseHero={chooseHero}
          selectedHeros={selectedHeros}
          setSelectedHeros={setSelectedHeros}
          withProperties={false}
        />
      </div>
      <div className="right-pane row-without-margin col-10">
        <div
          className="row col-12 ml-0 mr-0 pt-2 pl-2 pr-2"
          style={{
            height: '100%'
          }}>
          {encounter.length > 0 ? (
            <Fragment>
              <div className="col-9 mb-2">
                <Select
                  onChange={opt => setSelectedEncounter(opt)}
                  style={{ display: 'inline-block' }}
                  options={encounter}
                  getOptionLabel={opt => opt.name}
                  getOptionValue={opt => opt.id}
                  isDisabled={Boolean(activeEncounter)}
                  value={activeEncounter || selectedEncounter}
                />
              </div>
              <div className="col-3">
                {activeEncounter ? (
                  <button
                    className="btn btn-danger float-right ml-2"
                    disabled={!activeEncounter}
                    onClick={finishBattle}>
                    Beenden
                  </button>
                ) : (
                  <button
                    className="btn btn-danger float-right ml-2"
                    onClick={removeEncounter}
                    disabled={!selectedEncounter}>
                    Löschen
                  </button>
                )}
                <button
                  className="btn btn-primary float-right"
                  disabled={!!activeEncounter}
                  onClick={handleShowHeroIniModal}>
                  Start
                </button>
              </div>
            </Fragment>
          ) : null}
          {activeEncounter && activeEncounter.competitors ? (
            <BattleTable
              encounter={activeEncounter}
              update={e => setActiveEncounter(Object.assign({}, e))}
            />
          ) : null}
        </div>
      </div>
      <EncounterModal
        show={showEncounterModal}
        close={() => setShowEncounterModal(false)}
        save={data => setEncounter(encounter.concat(data))}
      />
      <StartEncounterModal
        show={showStartEncounterModal}
        close={() => setShowStartEncounterModal(false)}
        save={inis => startBattle(inis)}
        heros={battleHeros}
      />
    </Fragment>
  );
};

Battle.propTypes = {
  heros: object,
  electron: object,
  activeEncounter: object,
  encounter: array,
  chooseHero: func,
  setEncounter: func,
  setActiveEncounter: func
};

export default Battle;
