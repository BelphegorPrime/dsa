import React from 'react';
import proptypes from 'prop-types';

const Advantages = props => {
  const { advantages, disadvantages, className } = props;
  return (
    <div className={className}>
      <div className="pl-2 pt-2">
        <span className="font-weight-bold">Vorteile:</span>
        <div>
          {advantages.map((advantage, i) => {
            const { name, value } = advantage;
            const isNotLast = advantages.length - 1 !== i;
            if (!value) {
              return `${name}${isNotLast ? ',' : ''} `;
            }
            return `${name} ${value || ''}${isNotLast ? ',' : ''} `;
          })}
        </div>
      </div>
      <div className="pl-2 pt-2">
        <span className="font-weight-bold">Nachteile:</span>
        <div className="font-italic">
          {disadvantages.map((advantage, i) => {
            const { name, value } = advantage;
            const isNotLast = disadvantages.length - 1 !== i;
            if (!value) {
              return `${name}${isNotLast ? ',' : ''} `;
            }
            return `${name} ${value || ''}${isNotLast ? ',' : ''} `;
          })}
        </div>
      </div>
    </div>
  );
};

Advantages.propTypes = {
  advantages: proptypes.array,
  disadvantages: proptypes.array,
  className: proptypes.string
};

export default Advantages;
