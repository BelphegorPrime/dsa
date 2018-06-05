import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/fontawesome-free-solid';

class Base extends Component {
  render() {
    const { base, className } = this.props;
    const note = base.children[6].attributes.notiz0;
    return (
      <div className={className}>
        <div className="col-md-12 pt-2">
          <span>
            Geschlecht: {base.children[0].attributes.name}{' '}
            {base.children[0].attributes.name === 'weiblich' ? (
              <FontAwesomeIcon icon={faVenus} />
            ) : (
              <FontAwesomeIcon icon={faMars} />
            )}
          </span>
        </div>
        <div className="col-md-12 pt-2">
          <span>Rasse: {base.children[2].attributes.string}</span>
        </div>
        <div className="col-md-12 pt-2">
          <span>Kultur: {base.children[3].attributes.string}</span>
        </div>
        <div className="col-md-12 pt-2">
          Profession: {base.children[4].children[0].attributes.string}
        </div>
        {note !== 'Notizen' ? (
          <div className="col-md-12 pt-2">
            <span>
              {`Notizen: `}
              {note.split('&#10;').map(n => (
                <Fragment key={n}>
                  <span>{n}</span>
                  <br />
                </Fragment>
              ))}
            </span>
          </div>
        ) : null}
        <div className="col-md-12 pt-2">
          <span>{base.children[8].attributes.value} AP vergeben</span>
        </div>
        <div className="col-md-12 pt-2">
          <span>{base.children[9].attributes.value} AP unvergeben</span>
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
