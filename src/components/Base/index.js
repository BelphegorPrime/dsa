import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/fontawesome-free-solid';

class Base extends Component {
  render() {
    const { className, base } = this.props;
    return (
      <div className={className}>
        <div className="col-md-12 pt-2">
          <span>
            Geschlecht:{' '}
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
        <div className="col-md-12 pt-2">
          <span>Rasse: {base.race}</span>
        </div>
        <div className="col-md-12 pt-2">
          <span>Kultur: {base.culture}</span>
        </div>
        <div className="col-md-12 pt-2">
          Profession: {base.profession.name}
        </div>
        {base.notes.length > 0 ? (
          <div className="col-md-12 pt-2">
            <span>
              {`Notizen: `}
              {base.notes.map(n => (
                <Fragment key={n}>
                  <span>{n}</span>
                  <br />
                </Fragment>
              ))}
            </span>
          </div>
        ) : null}
        <div className="col-md-12 pt-2">
          <span>{base.exp} AP vergeben</span>
        </div>
        <div className="col-md-12 pt-2">
          <span>{base.freeExp} AP unvergeben</span>
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
