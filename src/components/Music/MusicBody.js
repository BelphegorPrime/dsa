/* eslint-disable no-unused-vars */
import React from 'react';
import { string } from 'prop-types';

const MusicBody = props => (
  <iframe
    src={props.src}
    title="Underground"
    style={{ width: '100%', height: '100%' }}
    frameBorder="0"
    allow="encrypted-media"
  />
);

MusicBody.propTypes = {
  src: string
};

export default MusicBody;
