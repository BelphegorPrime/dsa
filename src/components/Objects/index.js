import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class Objects extends Component {
  render() {
    const { objects, className } = this.props;
    return (
      <div className={className}>
        {objects.children.map(object => {
          const { children, attributes } = object;
          const { name, anzahl } = attributes;
          return (
            <div key={name} className="col-md-12 pt-2">
              <span>{`${name} ${anzahl} Stk`}</span>
              {children.length > 0
                ? children.map(child => {
                    switch (child.name) {
                      case 'Fernkampfwaffe':
                        return ` Kampftalent: ${
                          child.children[0].attributes.kampftalent
                        }`;
                      case 'Wesen':
                        return child.children.map(c => (
                          <RecursiveComponent
                            node={c}
                            wrapper={'span'}
                            doBreak={true}
                          />
                        ));
                      case 'modallgemein':
                        return ` Gewicht: ${
                          child.children[0].attributes.value
                        } | Preis: ${
                          child.children[1].attributes.value
                        } | Name:  ${child.children[2].attributes.value}`;
                      default:
                        return null;
                    }
                  })
                : null}
              <hr className="m-0" />
            </div>
          );
        })}
      </div>
    );
  }
}

Objects.propTypes = {
  objects: proptypes.object,
  className: proptypes.string
};

export default Objects;
