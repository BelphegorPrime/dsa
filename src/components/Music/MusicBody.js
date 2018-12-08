/* eslint-disable no-unused-vars */
import React from 'react';
import proptypes from 'prop-types';

const MasterBody = props => <div>{props.page.iframe}</div>;

MasterBody.propTypes = {
  page: proptypes.object
};

export default MasterBody;
