/* eslint-disable no-unused-vars */
import React from 'react';
import { number, string } from 'prop-types';

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
  height: number,
  src: string
};

export default MusicBody;
