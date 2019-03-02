import React, { useState } from 'react';
import proptypes from 'prop-types';
import uuid4 from 'uuid4';

const initialMobData = {
  name: '',
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
  dk: 'N',
  be: 0
};

const EncounterModal = props => {
  const { show, close, save } = props;
  const [formName, setFormName] = useState('');
  const [mobs, setMobs] = useState([]);
  const [mobData, setMobData] = useState(
    Object.assign({ id: uuid4() }, initialMobData)
  );
  const createNewEncounter = () => {
    save({ id: uuid4(), competitors: mobs, name: formName });
    close();
  };
  const handleNameChange = e => setFormName(e.target.value);
  const handleMobDataChange = (e, key) =>
    setMobData({ ...mobData, [key]: e.target.value });

  const handleSaveNevMob = () => {
    setMobs(mobs.concat(mobData));
    setMobData(Object.assign({ id: uuid4() }, initialMobData));
  };

  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div
        className="modal-dialog"
        style={{ marginTop: '10%', maxWidth: '90vw' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Kampf</h5>
            <button type="button" className="close" onClick={() => close()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            className="modal-body pt-0"
            style={{ height: '70vh', overflow: 'scroll' }}>
            <div className="row pt-3 pb-3 border-bottom">
              <div className="col-4">
                Name:
                <input
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'name')}
                  value={mobData.name}
                />
              </div>
              <div className="col-5">
                TP:
                <span className="float-right">
                  <input
                    type="number"
                    className="form-control w-25"
                    style={{ display: 'inline-block' }}
                    onChange={e => handleMobDataChange(e, 'tpDiceAmount')}
                    value={mobData.tpDiceAmount}
                  />
                  w
                  <input
                    type="number"
                    className="form-control w-25"
                    style={{ display: 'inline-block' }}
                    onChange={e => handleMobDataChange(e, 'tpDice')}
                    value={mobData.tpDice}
                  />
                  +
                  <input
                    type="number"
                    className="form-control w-25"
                    style={{ display: 'inline-block' }}
                    onChange={e => handleMobDataChange(e, 'tpMod')}
                    value={mobData.tpMod}
                  />
                </span>
              </div>
              <div className="col-3">
                Ini Basis:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'iniBase')}
                  value={mobData.iniBase}
                />
              </div>

              <div className="col-3">
                AT:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'at')}
                  value={mobData.at}
                />
              </div>
              <div className="col-3">
                PA:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'pa')}
                  value={mobData.pa}
                />
              </div>
              <div className="col-3">
                FK:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'fk')}
                  value={mobData.fk}
                />
              </div>
              <div className="col-3">
                DK:
                <input
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'dk')}
                  value={mobData.dk}
                />
              </div>
              <div className="col-3">
                LeP:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'lep')}
                  value={mobData.lep}
                />
              </div>
              <div className="col-3">
                AU:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'au')}
                  value={mobData.au}
                />
              </div>
              <div className="col-3">
                KO:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'ko')}
                  value={mobData.ko}
                />
              </div>
              <div className="col-3">
                MR:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'mr')}
                  value={mobData.mr}
                />
              </div>
              <div className="col-3">
                GS:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'gs')}
                  value={mobData.gs}
                />
              </div>
              <div className="col-3">
                RS:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'rs')}
                  value={mobData.rs}
                />
              </div>
              <div className="col-3">
                BE:
                <input
                  type="number"
                  className="form-control"
                  onChange={e => handleMobDataChange(e, 'be')}
                  value={mobData.be}
                />
              </div>

              <div className="col-12 mb-0 position-relative">
                <div
                  className="btn btn-primary position-absolute mr-3"
                  style={{ bottom: 0, right: 0 }}
                  onClick={handleSaveNevMob}>
                  Speichern
                </div>
              </div>
            </div>
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
          <div className="modal-footer">
            Name:
            <input
              className="form-control w-50"
              style={{ display: 'inline-block' }}
              onChange={handleNameChange}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={createNewEncounter}>
              Speichern
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => close()}>
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EncounterModal.propTypes = {
  show: proptypes.bool,
  close: proptypes.func,
  save: proptypes.func,
  electron: proptypes.object
};

export default EncounterModal;
