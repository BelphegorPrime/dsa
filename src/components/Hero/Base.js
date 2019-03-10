/* eslint-disable no-undef */
import React, { useState } from 'react';
import { object, string, func } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

const Base = props => {
  const [editNotes, setEditNotes] = useState(false);
  const { className, hero, updateHero } = props;
  const base = hero.converted.basics;
  const save = () => {
    const { value } = document.getElementById('edit-note-textarea');
    const heroToUpdate = Object.assign({}, hero);
    heroToUpdate.converted.basics.notes = value.split('\n');
    updateHero(heroToUpdate);
    setEditNotes(!editNotes);
  };
  return (
    <div className={className}>
      <div className="pl-2 pt-2">
        <div>
          <span>
            <span className="font-weight-bold">Geschlecht: </span>
            {base.gender === 'female' ? (
              <span>
                weiblich <FontAwesomeIcon icon={faVenus} />
              </span>
            ) : (
              <span>
                männlich <FontAwesomeIcon icon={faMars} />
              </span>
            )}
          </span>
        </div>
        <div>
          <span className="font-weight-bold">Rasse: </span>
          {base.race}
        </div>
        <div>
          <span className="font-weight-bold">Kultur: </span>
          {base.culture}
        </div>
        <div>
          <span className="font-weight-bold">Profession: </span>
          {base.profession.name}
        </div>
        {base.notes.length > 0 ? (
          <div>
            <span className="font-weight-bold">Notizen: </span>
            <div style={{ display: 'flex' }}>
              <textarea
                id="edit-note-textarea"
                className="w-75"
                defaultValue={base.notes.join('\n')}
                rows={base.notes.length}
                disabled={!editNotes}
              />
              <div
                className="btn btn-primary ml-3"
                style={{ width: 100, height: 38 }}
                onClick={() => (editNotes ? save : setEditNotes(!editNotes))}>
                {editNotes ? 'Speichern' : 'Bearbeiten'}
              </div>
            </div>
          </div>
        ) : null}
        <div className="pt-3">
          <span className="font-weight-bold">{base.exp} AP vergeben</span>
        </div>
        <div>
          <span className="font-weight-bold">{base.freeExp} AP unvergeben</span>
        </div>
      </div>
    </div>
  );
};

Base.propTypes = {
  hero: object,
  className: string,
  updateHero: func
};

export default Base;
