import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class Comments extends Component {
  render() {
    const { comments, className } = this.props;
    return (
      <div className={className}>
        <RecursiveComponent node={comments} wrapper={'span'} />
      </div>
    );
  }
}

Comments.propTypes = {
  comments: proptypes.object,
  className: proptypes.string
};

export default Comments;
