import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class Advantages extends Component {
  render() {
    const { advantages, className } = this.props;
    console.log(advantages)
    return (
      <div className={className}>
        <RecursiveComponent node={advantages} wrapper={'span'} />
      </div>
    );
  }
}

Advantages.propTypes = {
  advantages: proptypes.object,
  className: proptypes.string
};

export default Advantages;
