import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class Objects extends Component {
  render() {
    const { objects, className } = this.props;
    return (
      <div className={className}>
        <RecursiveComponent node={objects} wrapper={'span'} />
      </div>
    );
  }
}

Objects.propTypes = {
  objects: proptypes.object,
  className: proptypes.string
};

export default Objects;
