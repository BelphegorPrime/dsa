import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index.es';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons/index';

const Spinner = () => (
  <div style={{ textAlign: 'center', width: '100%' }}>
    <header className="App-header">
      <FontAwesomeIcon className="App-logo" icon={faDiceD20} />
    </header>
  </div>
);

Spinner.propTypes = {};

export default Spinner;
