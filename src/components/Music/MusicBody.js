/* eslint-disable no-unused-vars */
import React from 'react';
import proptypes from 'prop-types';

const MusicBody = props => (
  <iframe
    src={props.src}
    title="Underground"
    style={{ width: '100%', height: props.height }}
    frameBorder="0"
    allow="encrypted-media"
  />
);

MusicBody.propTypes = {
  height: proptypes.number,
  src: proptypes.string
};

export default MusicBody;
