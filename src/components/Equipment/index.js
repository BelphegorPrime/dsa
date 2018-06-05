import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class Equipment extends Component {
  render() {
    const { equipment, className } = this.props;
    return (
      <div className={className}>
        <RecursiveComponent node={equipment} wrapper={'span'} />
      </div>
    );
  }
}

Equipment.propTypes = {
  equipment: proptypes.object,
  className: proptypes.string
};

export default Equipment;
