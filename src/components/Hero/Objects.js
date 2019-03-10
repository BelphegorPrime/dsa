/* eslint-disable no-undef */
import React, { Fragment } from 'react';
import { func, object, string } from 'prop-types';

const Objects = props => {
  const { hero, updateHero, className } = props;
  const objects = hero.converted.objects || {};
  const save = () => {
    const inputs = document
      .getElementById('create-object-form')
      .getElementsByTagName('input');
    const nameInput = inputs[0];
    const amountInput = inputs[1];
    if (parseInt(amountInput.value, 10) === 0) {
      delete objects[nameInput.value];
    } else {
      objects[nameInput.value] = {
        amount: amountInput.value
      };
    }
    updateHero(hero);
  };
  const removeObject = name => {
    delete objects[name];
    updateHero(hero);
  };

  return (
    <div className={className}>
      <div className="pl-2 pt-2">
        <span className="font-weight-bold">Ausrüstung</span>
        <div className="container">
          <div id="create-object-form" className="row">
            <div className="col-12 p-0">
              <div>Name:</div>
              <input style={{ width: '100%' }} />
            </div>
            <div className="col-12 p-0 mb-2">
              <div>Menge:</div>
              <input
                type="number"
                defaultValue={1}
                min={0}
                className="mr-2"
                style={{ width: 'calc(100% - 108px)' }}
              />
              <div
                className="btn btn-primary"
                style={{ width: 100 }}
                onClick={save}>
                Speichern
              </div>
            </div>
          </div>
        </div>

        {Object.keys(objects).map(name => {
          const o = objects[name];
          return (
            <div
              key={name}
              className="col-12 p-2"
              style={{ minHeight: 54, borderBottom: '1px solid #E5E5E5' }}>
              <span
                className="btn btn-secondary btn-remove-hero float-right mr-3"
                onClick={() => removeObject(name)}>
                X
              </span>
              <span>{`${name} ${o.amount} Stk`}</span>
              {o.distantWeapon ? ` Kampftalent: ${o.talent}` : null}
              {o.properties ? (
                <Fragment>
                  <br />
                  <span>
                    {' '}
                    {o.name ? o.name : ''} {o.price ? `${o.price}S` : ''}{' '}
                    {o.weight ? `(${o.weight} Unzen)` : ''}
                  </span>
                  {o.name || o.price || o.weight ? <br /> : null}
                  {o.properties.courage ? (
                    <span>
                      <span className="font-weight-bold">Mut</span>{' '}
                      {o.properties.courage.value}{' '}
                    </span>
                  ) : null}
                  {o.properties.wisdom ? (
                    <span>
                      <span className="font-weight-bold">Klugheit</span>{' '}
                      {o.properties.wisdom.value}{' '}
                    </span>
                  ) : null}
                  {o.properties.intuition ? (
                    <span>
                      <span className="font-weight-bold">Intuition</span>{' '}
                      {o.properties.intuition.value}{' '}
                    </span>
                  ) : null}
                  {o.properties.charisma ? (
                    <span>
                      <span className="font-weight-bold">Charisma</span>{' '}
                      {o.properties.charisma.value}{' '}
                    </span>
                  ) : null}
                  {o.properties.fingerAbility ? (
                    <span>
                      <span className="font-weight-bold">Fingerfertigkeit</span>{' '}
                      {o.properties.fingerAbility.value}{' '}
                    </span>
                  ) : null}
                  {o.properties.dexterity ? (
                    <span>
                      <span className="font-weight-bold">Gewandtheit</span>{' '}
                      {o.properties.dexterity.value}{' '}
                    </span>
                  ) : null}
                  {o.properties.constitution ? (
                    <span>
                      <span className="font-weight-bold">Konstitution</span>{' '}
                      {o.properties.constitution.value}{' '}
                    </span>
                  ) : null}
                  {o.properties.strength ? (
                    <span>
                      <span className="font-weight-bold">Körperkraft</span>{' '}
                      {o.properties.strength.value}{' '}
                    </span>
                  ) : null}
                  {o.properties.lifeforce ? (
                    <span>
                      <span className="font-weight-bold">Lebensenergie</span>{' '}
                      {o.properties.lifeforce.basicValue}{' '}
                    </span>
                  ) : null}
                  {o.properties.endurance ? (
                    <span>
                      <span className="font-weight-bold">Ausdauer</span>{' '}
                      {o.properties.endurance.basicValue}{' '}
                    </span>
                  ) : null}
                  {o.properties.astralEnergy ? (
                    <span>
                      <span className="font-weight-bold">Astralenergie</span>{' '}
                      {o.properties.astralEnergy.basicValue}{' '}
                    </span>
                  ) : null}
                  {o.properties.risk ? (
                    <span>
                      <span className="font-weight-bold">Gefahrenwert</span>{' '}
                      {o.properties.risk.value}{' '}
                    </span>
                  ) : null}
                  {o.properties.loyalty ? (
                    <span>
                      <span className="font-weight-bold">Loyalität</span>{' '}
                      {o.properties.loyalty.value}{' '}
                    </span>
                  ) : null}
                  {o.properties.speed ? (
                    <span>
                      <span className="font-weight-bold">Geschwindigkeit</span>{' '}
                      {o.properties.speed.value}{' '}
                    </span>
                  ) : null}
                  {o.properties.armor ? (
                    <span>
                      <span className="font-weight-bold">Rüstungsschutz</span>{' '}
                      {o.properties.armor.value}{' '}
                    </span>
                  ) : null}
                  {o.properties.magicResistance &&
                  o.properties.magicResistance2 ? (
                    <span>
                      <span className="font-weight-bold">Magieresistenz</span>{' '}
                      {o.properties.magicResistance.calcValue} /{' '}
                      {o.properties.magicResistance2.value}{' '}
                    </span>
                  ) : null}
                </Fragment>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Objects.propTypes = {
  updateHero: func,
  hero: object,
  className: string
};

export default Objects;
