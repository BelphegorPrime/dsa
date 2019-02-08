/* eslint-disable no-undef */
import React, { Fragment } from 'react';
import proptypes from 'prop-types';

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
          const object = objects[name];
          return (
            <div
              key={name}
              className="col-md-12 p-2"
              style={{ minHeight: 54, borderBottom: '1px solid #E5E5E5' }}>
              <span
                className="btn btn-secondary btn-remove-hero float-right mr-3"
                onClick={() => removeObject(name)}>
                X
              </span>
              <span>{`${name} ${object.amount} Stk`}</span>
              {object.distantWeapon ? ` Kampftalent: ${object.talent}` : null}
              {object.properties ? (
                <Fragment>
                  <br />
                  <span>
                    {' '}
                    {object.name ? object.name : ''}{' '}
                    {object.price ? `${object.price}S` : ''}{' '}
                    {object.weight ? `(${object.weight} Unzen)` : ''}
                  </span>
                  {object.name || object.price || object.weight ? <br /> : null}
                  {object.properties.courage ? (
                    <span>
                      <span className="font-weight-bold">Mut</span>{' '}
                      {object.properties.courage.value}{' '}
                    </span>
                  ) : null}
                  {object.properties.wisdom ? (
                    <span>
                      <span className="font-weight-bold">Klugheit</span>{' '}
                      {object.properties.wisdom.value}{' '}
                    </span>
                  ) : null}
                  {object.properties.intuition ? (
                    <span>
                      <span className="font-weight-bold">Intuition</span>{' '}
                      {object.properties.intuition.value}{' '}
                    </span>
                  ) : null}
                  {object.properties.charisma ? (
                    <span>
                      <span className="font-weight-bold">Charisma</span>{' '}
                      {object.properties.charisma.value}{' '}
                    </span>
                  ) : null}
                  {object.properties.fingerAbility ? (
                    <span>
                      <span className="font-weight-bold">Fingerfertigkeit</span>{' '}
                      {object.properties.fingerAbility.value}{' '}
                    </span>
                  ) : null}
                  {object.properties.dexterity ? (
                    <span>
                      <span className="font-weight-bold">Gewandtheit</span>{' '}
                      {object.properties.dexterity.value}{' '}
                    </span>
                  ) : null}
                  {object.properties.constitution ? (
                    <span>
                      <span className="font-weight-bold">Konstitution</span>{' '}
                      {object.properties.constitution.value}{' '}
                    </span>
                  ) : null}
                  {object.properties.strength ? (
                    <span>
                      <span className="font-weight-bold">Körperkraft</span>{' '}
                      {object.properties.strength.value}{' '}
                    </span>
                  ) : null}
                  {object.properties.lifeforce ? (
                    <span>
                      <span className="font-weight-bold">Lebensenergie</span>{' '}
                      {object.properties.lifeforce.basicValue}{' '}
                    </span>
                  ) : null}
                  {object.properties.endurance ? (
                    <span>
                      <span className="font-weight-bold">Ausdauer</span>{' '}
                      {object.properties.endurance.basicValue}{' '}
                    </span>
                  ) : null}
                  {object.properties.astralEnergy ? (
                    <span>
                      <span className="font-weight-bold">Astralenergie</span>{' '}
                      {object.properties.astralEnergy.basicValue}{' '}
                    </span>
                  ) : null}
                  {object.properties.risk ? (
                    <span>
                      <span className="font-weight-bold">Gefahrenwert</span>{' '}
                      {object.properties.risk.value}{' '}
                    </span>
                  ) : null}
                  {object.properties.loyalty ? (
                    <span>
                      <span className="font-weight-bold">Loyalität</span>{' '}
                      {object.properties.loyalty.value}{' '}
                    </span>
                  ) : null}
                  {object.properties.speed ? (
                    <span>
                      <span className="font-weight-bold">Geschwindigkeit</span>{' '}
                      {object.properties.speed.value}{' '}
                    </span>
                  ) : null}
                  {object.properties.armor ? (
                    <span>
                      <span className="font-weight-bold">Rüstungsschutz</span>{' '}
                      {object.properties.armor.value}{' '}
                    </span>
                  ) : null}
                  {object.properties.magicResistance &&
                  object.properties.magicResistance2 ? (
                    <span>
                      <span className="font-weight-bold">Magieresistenz</span>{' '}
                      {object.properties.magicResistance.calcValue} /{' '}
                      {object.properties.magicResistance2.value}{' '}
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
  updateHero: proptypes.func,
  hero: proptypes.object,
  className: proptypes.string
};

export default Objects;
