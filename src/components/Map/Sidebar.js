/* eslint-disable no-undef */
import React from 'react';

import UploadFiles from './UploadFiles';

const Sidebar = () => (
  <div>
    <div className="row p-2">
      <div className="custom-file cursor-pointer">
        <UploadFiles />
      </div>
    </div>
    <div className="row" />
  </div>
);

export default Sidebar;
