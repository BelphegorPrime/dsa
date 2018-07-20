import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

class Base extends Component {
  render() {
    const { className, base } = this.props;
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
              {base.notes.map(n => (
                <Fragment key={n}>
                  <span>{n}</span>
                  <br />
                </Fragment>
              ))}
            </div>
          ) : null}
          <hr />
          <div>
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
  base: proptypes.object,
  className: proptypes.string
};

export default Base;
