/* eslint-disable no-undef */
import React from 'react';
// import proptypes from 'prop-types';

import UploadFiles from './UploadFiles';

const Sidebar = props => (
  <div>
    <div className="row p-2">
      <div className="custom-file cursor-pointer">
        <UploadFiles />
      </div>
    </div>
    <div className="row" />
  </div>
);

Sidebar.propTypes = {};

export default Sidebar;
