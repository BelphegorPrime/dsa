import React, { Fragment, useState } from 'react';
import proptypes from 'prop-types';
import Select from 'react-select';

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
  const [showEncounterModal, setShowEncounterModal] = useState(false);
  const [showStartEncounterModal, setShowStartEncounterModal] = useState(false);

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
    setActiveEncounter(selectedEncounter);
  };

  const finishBattle = () => {
    setActiveEncounter(null);
  };

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
          className="row col-12 ml-0 mr-0 pt-2 pl-2"
          style={{
            height: '100%'
          }}>
          {encounter.length > 0 ? (
            <Fragment>
              <div className="col-9">
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
              <div className="col-3 pr-2">
                {activeEncounter ? (
                  <button
                    className="btn btn-danger float-right ml-2"
                    disabled={!activeEncounter}
                    onClick={finishBattle}>
                    Beenden
                  </button>
                ) : null}
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
            <div className="col-12">
              <BattleTable competitors={activeEncounter.competitors} />
            </div>
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
  heros: proptypes.object,
  chooseHero: proptypes.func,
  encounter: proptypes.array,
  setEncounter: proptypes.func,
  electron: proptypes.object,
  activeEncounter: proptypes.object,
  setActiveEncounter: proptypes.func
};

export default Battle;
