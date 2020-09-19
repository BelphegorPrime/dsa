import { array, func, object } from "prop-types";
import React, { Fragment, useState } from "react";
import Select from "react-select";
import useBoolean from "react-use/lib/useBoolean";

import { rollDice } from "../../helperFunctions";
import { BattleHero, ConvertedHero, Hero } from "../../types";
import MasterSideBar from "../Master/MasterSideBar";
import BattleTable from "./BattleTable";
import EncounterModal from "./EncounterModal";
import StartEncounterModal from "./StartEncounterModal";

export interface Competitor {
  id: string;
  iniBase: number;
  name: string;
  rs: number;
  at: number;
  pa: number;
  fk: number;
  tpDiceAmount: number;
  tpDice: number;
  tpMod: number;
  dk: string;
  be: number;
  gs: number;
  lep: number;
  mr: number;
  au: number;
  ko: number;
  tp?: string;
  ini?: number;
  isPlayer?: boolean;
  battleLep?: number;
  converted?: ConvertedHero;
  [key: string]: number | string | boolean | ConvertedHero | undefined;
}

export interface Encounter {
  id: string;
  name: string;
  competitors: Competitor[];
  battle?: { kr: number; action: number };
}

interface Initiativ {
  [name: string]: number;
}

interface BattleProps {
  heros: {
    [name: string]: Hero;
  };
  activeEncounter: Encounter;
  encounter: any[];
  chooseHero: (name: string) => void;
  setEncounter: (encounters: Encounter[]) => void;
  setActiveEncounter: (encounter: Encounter | null) => void;
}

const Battle = (props: BattleProps) => {
  const {
    heros,
    chooseHero,
    encounter,
    setEncounter,
    activeEncounter,
    setActiveEncounter
  } = props;
  const [selectedHeros, setSelectedHeros] = useState(Object.keys(heros));
  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(
    null
  );
  const [showEncounterModal, setShowEncounterModal] = useBoolean(false);
  const [showStartEncounterModal, setShowStartEncounterModal] = useBoolean(
    false
  );

  const battleHeros = selectedHeros
    .map(name => heros[name])
    .filter(e => e) as BattleHero[];
  const handleShowHeroIniModal = () => {
    if (selectedEncounter) {
      setShowStartEncounterModal(true);
    }
  };

  const startBattle = (inis: Initiativ) => {
    const heroData = Object.keys(inis).map(name => {
      const hero = battleHeros.find(h => h.converted.name === name);
      if (hero) {
        const returnHero = hero;
        returnHero.ini = inis[name];
        returnHero.isPlayer = true;
        return returnHero;
      }
      return {
        name,
        ini: inis[name],
        isPlayer: true,
        tp: 1,
        converted: {
          name,
          properties: {
            lifeforce: { value: 10 },
            magicResistance: { value: 4 },
            endurance: { value: 30 },
            constitution: { value: 10 }
          }
        }
      };
    });
    if (selectedEncounter) {
      selectedEncounter.competitors = ([
        ...selectedEncounter.competitors.map(competitor => ({
          ...competitor,
          ini: competitor.iniBase + rollDice(6)
        })),
        ...heroData
      ] as Competitor[]).sort((a, b) => {
        if (a.ini && b.ini) {
          return b.ini - a.ini;
        }
        return 0;
      });
      selectedEncounter.battle = { kr: 1, action: 0 };
      setActiveEncounter(selectedEncounter);
    }
  };

  const finishBattle = () => {
    setActiveEncounter(null);
  };

  const removeEncounter = () =>
    selectedEncounter
      ? setEncounter(encounter.filter(e => e.id !== selectedEncounter.id))
      : {};

  return (
    <Fragment>
      <div className="left-pane col-2 p-0">
        <div className="col-12 p-2">
          <div
            className="btn btn-primary"
            onClick={() => {
              setShowEncounterModal(true);
            }}
          >
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
            height: "100%"
          }}
        >
          {encounter.length > 0 ? (
            <Fragment>
              <div className="col-9 mb-2">
                <Select
                  onChange={(opt: any) => setSelectedEncounter(opt as Encounter)}
                  style={{ display: "inline-block" }}
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
                    onClick={finishBattle}
                  >
                    Beenden
                  </button>
                ) : (
                  <button
                    className="btn btn-danger float-right ml-2"
                    onClick={removeEncounter}
                    disabled={!selectedEncounter}
                  >
                    Löschen
                  </button>
                )}
                <button
                  className="btn btn-primary float-right"
                  disabled={!!activeEncounter}
                  onClick={handleShowHeroIniModal}
                >
                  Start
                </button>
              </div>
            </Fragment>
          ) : null}
          {activeEncounter && activeEncounter.competitors ? (
            <BattleTable
              encounter={activeEncounter}
              update={e => setActiveEncounter({ ...e })}
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
  activeEncounter: object,
  encounter: array,
  chooseHero: func,
  setEncounter: func,
  setActiveEncounter: func
};

export default Battle;
