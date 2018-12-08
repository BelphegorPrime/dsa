/* eslint-disable no-unused-vars */
import React from 'react';
import proptypes from 'prop-types';

const MusicBody = props => props.page.iframe(props.width, props.height);
MusicBody.propTypes = {
  page: proptypes.object,
  width: proptypes.number,
  height: proptypes.number
};

export default MusicBody;
