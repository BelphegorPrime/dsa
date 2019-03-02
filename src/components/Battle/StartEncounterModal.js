import React, { useState } from 'react';
import proptypes from 'prop-types';

const StartEncounterModal = props => {
  const { show, close, save, heros } = props;
  const heroData = heros
    .map(hero => ({
      [hero.converted.name]: hero.converted.properties.initiativBaseValue.value
    }))
    .reduce((acc, val) => Object.assign(acc, val), {});
  const [inis, setInis] = useState(heroData);
  const startBattle = () => {
    save(inis);
    close();
  };
  const handleIniChange = (e, name) =>
    setInis({ ...inis, [name]: parseInt(e.target.value, 10) });

  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog" style={{ marginTop: '10%' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Helden</h5>
          </div>
          <div
            className="modal-body pt-0"
            style={{ height: '70vh', overflow: 'scroll' }}>
            {Object.keys(heroData).map(name => (
              <div className="row p-2 border-bottom" key={name}>
                <div className="col-8">{name}</div>
                <div className="col-4">
                  Initiative:{' '}
                  <input
                    type="number"
                    className="form-control"
                    onChange={e => handleIniChange(e, name)}
                    value={inis[name]}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={startBattle}>
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

StartEncounterModal.propTypes = {
  show: proptypes.bool,
  close: proptypes.func,
  save: proptypes.func,
  heros: proptypes.array
};

export default StartEncounterModal;
