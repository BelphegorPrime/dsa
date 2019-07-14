import React, { ChangeEvent, useState } from "react";
import uuid4 from "uuid4";
import { BattleHero } from "../../types";

interface StartEncounterModalProps {
  show: boolean;
  heros: BattleHero[];
  close: () => void;
  save: (inits: { [name: string]: number }) => void;
}

const StartEncounterModal = (props: StartEncounterModalProps) => {
  const { show, close, save, heros } = props;
  const heroData = heros
    .map(hero => {
      const { name, properties } = hero.converted;
      if (name && properties) {
        const { initiativBaseValue } = properties;
        if (initiativBaseValue) {
          return {
            [name]: initiativBaseValue.value
          };
        }
      }
      return {};
    })
    .reduce((acc, val) => ({ ...acc, ...val }), {});
  const [inits, setInits] = useState<{ [name: string]: number }>(heroData);
  const [additionalHeros, setAdditionalHeros] = useState<BattleHero[]>([]);
  const startBattle = () => {
    additionalHeros.forEach(additionalHero => {
      inits[additionalHero.name] = additionalHero.init;
    });
    save(inits);
    close();
  };
  const handleIniChange = (e: ChangeEvent<HTMLInputElement>, name: string) =>
    setInits({ ...inits, [name]: parseInt(e.target.value, 10) });
  const handleAdditionalIniChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) =>
    setAdditionalHeros(
      additionalHeros.map(ah => {
        if (ah.id === id) {
          ah.init = parseInt(e.target.value, 10);
        }
        return ah;
      })
    );
  const addAdditionalHero = () =>
    setAdditionalHeros([
      ...additionalHeros,
      {
        id: uuid4(),
        name: "",
        init: 10
      }
    ] as BattleHero[]);

  const handleAdditionalHeroNameChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setAdditionalHeros(
      additionalHeros.map(ah => {
        if (ah.id === id) {
          ah.name = e.target.value;
        }
        return ah;
      })
    );
  };

  return (
    <div className="modal" style={{ display: show ? "block" : "none" }}>
      <div
        className="modal-dialog"
        style={{ marginTop: "5%", maxWidth: "90vw", height: "90vh" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Helden</h5>
            <button type="button" className="close" onClick={() => close()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            className="modal-body pt-0"
            style={{ height: "70vh", overflow: "scroll" }}
          >
            {Object.keys(heroData).map(name => (
              <div className="row p-2 border-bottom" key={name}>
                <div className="col-8">{name}</div>
                <div className="col-4">
                  Initiative:{" "}
                  <input
                    type="number"
                    className="form-control w-50"
                    style={{ display: "inline-block" }}
                    onChange={e => handleIniChange(e, name)}
                    value={inits[name]}
                  />
                </div>
              </div>
            ))}
            {additionalHeros.map(additionalHero => {
              const { id, name, init } = additionalHero;
              return (
                <div className="row p-2 border-bottom" key={id}>
                  <input
                    className="form-control col-8"
                    style={{ display: "inline-block" }}
                    onChange={e => handleAdditionalHeroNameChange(e, id)}
                    value={name}
                  />
                  <div className="col-4">
                    Initiative:{" "}
                    <input
                      type="number"
                      className="form-control w-50"
                      style={{ display: "inline-block" }}
                      onChange={e => handleAdditionalIniChange(e, id)}
                      value={inits[name] ? inits[name] : init}
                    />
                  </div>
                </div>
              );
            })}
            <div className="row p-2">
              <div className="col-8" />
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-primary float-right"
                  onClick={addAdditionalHero}
                >
                  Hinzufügen
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={startBattle}
            >
              Speichern
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => close()}
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartEncounterModal;
