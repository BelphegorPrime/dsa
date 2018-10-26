import React, { Component } from 'react';
import proptypes from 'prop-types';

class SpecialAbilities extends Component {
  render() {
    const { specialAbilities, className } = this.props;
    return (
      <div className={className}>
        <div className="pl-2">
          <span className="font-weight-bold">Sonderfertigkeiten:</span>
          {specialAbilities.specialAbilities.map(specialAbility => {
            const { name } = specialAbility;
            if (name === 'Kulturkunde' || name === 'Rüstungsgewöhnung I') {
              return (
                <div key={name} className="col-md-12 pt-2">
                  <span>{`${name} ${specialAbility.values.join(', ')}`}</span>
                </div>
              );
            }
            if (name.indexOf('Wahrer Name: ') > -1) {
              return (
                <div key={name} className="col-md-12 pt-2">
                  <span>{`${name} ${specialAbility.values.join(', ')}`}</span>
                </div>
              );
            }
            return (
              <div key={name} className="col-md-12 pt-2">
                <span>{name}</span>
              </div>
            );
          })}
          <hr />
          <span className="font-weight-bold">Verbilligt:</span>
          {specialAbilities.cheapenedSpecialAbilities.map(cheapenedAbility => {
            const { name } = cheapenedAbility;
            return (
              <div key={name} className="col-md-12 pt-2">
                <span>{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

SpecialAbilities.propTypes = {
  specialAbilities: proptypes.object,
  className: proptypes.string
};

export default SpecialAbilities;
