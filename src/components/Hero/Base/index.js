import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

class Base extends Component {
  constructor() {
    super();
    this.state = {
      editNotes: false
    };
  }

  toggleEditNotes() {
    this.setState(state => ({ editNotes: !state.editNotes }));
  }

  save() {
    const { value } = document.getElementById('edit-note-textarea');
    const { hero, updateHero } = this.props;
    const heroToUpdate = Object.assign({}, hero);
    heroToUpdate.converted.basics.notes = value.split('\n');
    updateHero(heroToUpdate);
  }

  render() {
    const { className, hero } = this.props;
    const base = hero.converted.basics;
    const { editNotes } = this.state;
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
            <div onClick={this.toggleEditNotes.bind(this)}>
              <span className="font-weight-bold">Notizen: </span>
              {editNotes ? (
                <Fragment>
                  <br />
                  <div
                    className="btn btn-primary"
                    onClick={this.save.bind(this)}>
                    Speichern
                  </div>
                  <br />
                  <textarea
                    id="edit-note-textarea"
                    defaultValue={base.notes.join('\n')}
                    rows={base.notes.length}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  {base.notes.map(n => (
                    <Fragment key={n}>
                      <span>{n}</span>
                      <br />
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </div>
          ) : null}
          <div className="pt-3">
            <span className="font-weight-bold">{base.exp} AP vergeben</span>
          </div>
          <div>
            <span className="font-weight-bold">
              {base.freeExp} AP unvergeben
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Base.propTypes = {
  hero: proptypes.object,
  className: proptypes.string,
  updateHero: proptypes.func
};

export default Base;
