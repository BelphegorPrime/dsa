import React, { ChangeEvent, useState } from "react";
import { v4 as uuid4 } from 'uuid';
import { Competitor, Encounter } from "./index";

interface EncounterModalProps {
  show: boolean;
  close: () => void;
  save: (encounter: Encounter) => void;
}

const initialMobData = {
  name: "",
  iniBase: 10,
  at: 10,
  pa: 10,
  fk: 10,
  tpDiceAmount: 1,
  tpDice: 6,
  tpMod: 2,
  lep: 20,
  au: 50,
  ko: 10,
  mr: 4,
  gs: 5,
  rs: 0,
  dk: "N",
  be: 0
};

const EncounterModal = (props: EncounterModalProps) => {
  const { show, close, save } = props;
  const [formName, setFormName] = useState("");
  const [mobs, setMobs] = useState<Competitor[]>([]);
  const [mobData, setMobData] = useState<Competitor>({
    id: uuid4(),
    ...initialMobData
  });
  const createNewEncounter = () => {
    save({ id: uuid4(), competitors: mobs, name: formName });
    close();
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormName(e.target.value);
  const handleMobDataChange = (e: ChangeEvent<HTMLInputElement>, key: string) =>
    setMobData({ ...mobData, [key]: e.target.value });

  const handleSaveNevMob = () => {
    setMobs([...mobs, mobData]);
    setMobData({ id: uuid4(), ...initialMobData });
  };

  return (
    <div className="modal" style={{ display: show ? "block" : "none" }}>
      <div
        className="modal-dialog"
        style={{ marginTop: "5%", maxWidth: "90vw", height: "90vh" }}
      >
        <div className="modal-content" style={{ height: "90%" }}>
          <div className="modal-header" style={{ height: 63 }}>
            <h5 className="modal-title">Kampf</h5>
            <button type="button" className="close" onClick={() => close()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            className="modal-body pt-0"
            style={{ height: `calc(100% - ${63 + 71}px)` }}
          >
            <div
              className="row pt-3 pb-3 border-bottom"
              style={{ height: 281 }}
            >
              <div className="col-4">
                Name:
                <input
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "name")}
                  value={mobData.name}
                />
              </div>
              <div className="col-5">
                TP:
                <span className="float-right">
                  <input
                    type="number"
                    className="form-control w-25"
                    style={{ display: "inline-block" }}
                    onChange={e => handleMobDataChange(e, "tpDiceAmount")}
                    value={mobData.tpDiceAmount}
                  />
                  w
                  <input
                    type="number"
                    className="form-control w-25"
                    style={{ display: "inline-block" }}
                    onChange={e => handleMobDataChange(e, "tpDice")}
                    value={mobData.tpDice}
                  />
                  +
                  <input
                    type="number"
                    className="form-control w-25"
                    style={{ display: "inline-block" }}
                    onChange={e => handleMobDataChange(e, "tpMod")}
                    value={mobData.tpMod}
                  />
                </span>
              </div>
              <div className="col-3">
                Ini Basis:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "iniBase")}
                  value={mobData.iniBase}
                />
              </div>
              <div className="col-3">
                AT:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "at")}
                  value={mobData.at}
                />
              </div>
              <div className="col-3">
                PA:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "pa")}
                  value={mobData.pa}
                />
              </div>
              <div className="col-3">
                FK:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "fk")}
                  value={mobData.fk}
                />
              </div>
              <div className="col-3">
                DK:
                <input
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "dk")}
                  value={mobData.dk}
                />
              </div>
              <div className="col-3">
                LeP:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "lep")}
                  value={mobData.lep}
                />
              </div>
              <div className="col-3">
                AU:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "au")}
                  value={mobData.au}
                />
              </div>
              <div className="col-3">
                KO:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "ko")}
                  value={mobData.ko}
                />
              </div>
              <div className="col-3">
                MR:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "mr")}
                  value={mobData.mr}
                />
              </div>
              <div className="col-3">
                GS:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "gs")}
                  value={mobData.gs}
                />
              </div>
              <div className="col-3">
                RS:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "rs")}
                  value={mobData.rs}
                />
              </div>
              <div className="col-3">
                BE:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, "be")}
                  value={mobData.be}
                />
              </div>
              <div className="col-12 mb-0 position-relative">
                <div
                  className="btn btn-primary position-absolute mr-3"
                  style={{ bottom: 0, right: 0 }}
                  onClick={handleSaveNevMob}
                >
                  Speichern
                </div>
              </div>
            </div>
            <div
              style={{ height: `calc(100% - ${264}px)`, overflow: "scroll" }}
            >
              {mobs.map(mob => (
                <div className="row p-2 border-bottom" key={mob.id}>
                  <div className="col-8">Name: {mob.name}</div>
                  <div className="col-4">Initiative: {mob.iniBase}</div>
                  <div className="col-4">AT: {mob.at}</div>
                  <div className="col-4">PA: {mob.pa}</div>
                  <div className="col-4">
                    TP: {mob.tpDiceAmount}w{mob.tpDice}+{mob.tpMod}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer" style={{ height: 71 }}>
            Name:
            <input
              className="form-control w-50"
              style={{ display: "inline-block" }}
              onChange={handleNameChange}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={createNewEncounter}
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

export default EncounterModal;
