import React, { Fragment, useState } from 'react';
import proptypes from 'prop-types';

const SpecialAbilities = props => {
  const [liturgyToShow, setLiturgyToShow] = useState(null);
  const { specialAbilities, className } = props;
  return (
    <div className={className}>
      <div className="pl-2">
        <span className="font-weight-bold">Sonderfertigkeiten:</span>
        {specialAbilities.specialAbilities.map(specialAbility => {
          const { name } = specialAbility;
          if (name === 'Kulturkunde' || name === 'Rüstungsgewöhnung I') {
            return (
              <div key={name} className="col-12 pt-2">
                <span>{`${name} ${specialAbility.values.join(', ')}`}</span>
              </div>
            );
          }
          if (name.indexOf('Wahrer Name: ') > -1) {
            return (
              <div key={name} className="col-12 pt-2">
                <span>{`${name} ${specialAbility.values.join(', ')}`}</span>
              </div>
            );
          }
          if (specialAbility.liturgy) {
            const { liturgy } = specialAbility;
            return (
              <div
                key={name}
                className="col-12 pt-2"
                onClick={() =>
                  setLiturgyToShow(liturgyToShow === name ? null : name)
                }>
                <span>{name}</span>
                {liturgyToShow === name ? (
                  <div className="small">
                    <div>
                      Name: {liturgy.name} | Seite: {liturgy.page} | Grad:{' '}
                      {liturgy.grade} | Ziel: {liturgy.target} | Distanz:{' '}
                      {liturgy.distance} | Art: {liturgy.kind}
                    </div>
                    {liturgy.alternativeNames ? (
                      <div className="row">
                        <div className="col-2">Alternativen:</div>
                        <div className="col-10">
                          {liturgy.alternativeNames.map(alternativeName => (
                            <div className="row" key={alternativeName.name}>
                              <div className="col-12">
                                Gott: {alternativeName.god} | Name:{' '}
                                {alternativeName.name} | Grad:{' '}
                                {alternativeName.grade}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <div className="row">
                      <div className="col-2">Götter:</div>
                      <div className="col-10">{liturgy.gods.join(', ')}</div>
                    </div>
                    <div className="row">
                      <div className="col-2">Ritualdauer:</div>
                      <div className="col-10">{liturgy.ritualDuration}</div>
                    </div>
                    <div className="row">
                      <div className="col-2">Wirkungsdauer:</div>
                      <div className="col-10">{liturgy.duration}</div>
                    </div>
                    <div className="row">
                      <div className="col-2">Durchführung:</div>
                      <div className="col-10">{liturgy.execution}</div>
                    </div>
                    <div className="row">
                      <div className="col-2">Auswirkung:</div>
                      <div className="col-10">{liturgy.effect}</div>
                    </div>
                    {liturgy.variants ? (
                      <div className="row">
                        <div className="col-2">Varianten:</div>
                        <div className="col-10">
                          {liturgy.variants.map(variant => (
                            <Fragment key={variant.grade}>
                              <div className="row">
                                <div className="col-2">Grad:</div>
                                <div className="col-10">{variant.grade}</div>
                              </div>
                              <div className="row">
                                <div className="col-2">Auswirkung:</div>
                                <div className="col-10">{variant.effect}</div>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <div className="row">
                      <div className="col-2">Anmerkungen:</div>
                      <div className="col-10">{liturgy.remark}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          }
          return (
            <div key={name} className="col-12 pt-2">
              <span>{name}</span>
            </div>
          );
        })}
        <hr />
        <span className="font-weight-bold">Verbilligt:</span>
        {specialAbilities.cheapenedSpecialAbilities.map(cheapenedAbility => {
          const { name } = cheapenedAbility;
          return (
            <div key={name} className="col-12 pt-2">
              <span>{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

SpecialAbilities.propTypes = {
  specialAbilities: proptypes.object,
  className: proptypes.string
};

export default SpecialAbilities;
