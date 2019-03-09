import React from 'react';
import proptypes from 'prop-types';

const PropertiesQuickBar = props => {
  const { hero, className, orientation } = props;
  const { properties } = hero.converted;
  if (!properties) {
    return null;
  }
  switch (orientation) {
    case 'vertical': {
      const style = {
        width: '100%',
        textAlign: 'center',
        paddingBottom: 'calc(40px - 2rem)',
        paddingTop: 'calc(40px - 2rem)'
      };
      return (
        <div className={className}>
          <div className="row">
            <div
              className="col-12"
              style={{ ...style, borderBottom: '1px solid lightgray' }}>
              <div>MU:</div>
              <div>
                <span className="font-weight-bold">
                  {properties.courage.value}
                </span>
              </div>
            </div>
            <div
              className="col-12"
              style={{ ...style, borderBottom: '1px solid lightgray' }}>
              <div>KL:</div>
              <div>
                <span className="font-weight-bold">
                  {properties.wisdom.value}
                </span>
              </div>
            </div>
            <div
              className="col-12"
              style={{ ...style, borderBottom: '1px solid lightgray' }}>
              <div>IN:</div>
              <div>
                <span className="font-weight-bold">
                  {properties.intuition.value}
                </span>
              </div>
            </div>
            <div
              className="col-12"
              style={{ ...style, borderBottom: '1px solid lightgray' }}>
              <div>CH:</div>
              <div>
                <span className="font-weight-bold">
                  {properties.charisma.value}
                </span>
              </div>
            </div>
            <div
              className="col-12"
              style={{ ...style, borderBottom: '1px solid lightgray' }}>
              <div>FF:</div>
              <div>
                <span className="font-weight-bold">
                  {properties.fingerAbility.value}
                </span>
              </div>
            </div>
            <div
              className="col-12"
              style={{ ...style, borderBottom: '1px solid lightgray' }}>
              <div>GE:</div>
              <div>
                <span className="font-weight-bold">
                  {properties.dexterity.value}
                </span>
              </div>
            </div>
            <div
              className="col-12"
              style={{ ...style, borderBottom: '1px solid lightgray' }}>
              <div>KO:</div>
              <div>
                <span className="font-weight-bold">
                  {properties.constitution.value}
                </span>
              </div>
            </div>
            <div className="col-12" style={{ ...style }}>
              <div>KK:</div>
              <div>
                <span className="font-weight-bold">
                  {properties.strength.value}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    case 'horizontal':
    default: {
      const style = {
        width: '12.5%',
        textAlign: 'center',
        paddingBottom: 'calc(40px - 2rem)',
        paddingTop: 'calc(40px - 2rem)'
      };
      return (
        <div
          className={className}
          style={{ borderBottom: '1px solid lightgray', height: 41 }}>
          <div id="properties-pane" className="pl-2 pt-2 container d-flex">
            <div style={{ ...style, borderRight: '1px solid lightgray' }}>
              MU:{' '}
              <span className="font-weight-bold">
                {properties.courage.value}
              </span>
            </div>
            <div style={{ ...style, borderRight: '1px solid lightgray' }}>
              KL:{' '}
              <span className="font-weight-bold">
                {properties.wisdom.value}
              </span>
            </div>
            <div style={{ ...style, borderRight: '1px solid lightgray' }}>
              IN:{' '}
              <span className="font-weight-bold">
                {properties.intuition.value}
              </span>
            </div>
            <div style={{ ...style, borderRight: '1px solid lightgray' }}>
              CH:{' '}
              <span className="font-weight-bold">
                {properties.charisma.value}
              </span>
            </div>
            <div style={{ ...style, borderRight: '1px solid lightgray' }}>
              FF:{' '}
              <span className="font-weight-bold">
                {properties.fingerAbility.value}
              </span>
            </div>
            <div style={{ ...style, borderRight: '1px solid lightgray' }}>
              GE:{' '}
              <span className="font-weight-bold">
                {properties.dexterity.value}
              </span>
            </div>
            <div style={{ ...style, borderRight: '1px solid lightgray' }}>
              KO:{' '}
              <span className="font-weight-bold">
                {properties.constitution.value}
              </span>
            </div>
            <div style={{ ...style }}>
              KK:{' '}
              <span className="font-weight-bold">
                {properties.strength.value}
              </span>
            </div>
          </div>
        </div>
      );
    }
  }
};

PropertiesQuickBar.propTypes = {
  hero: proptypes.object,
  className: proptypes.string,
  orientation: proptypes.string
};

export default PropertiesQuickBar;
