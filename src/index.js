import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap-css-only/css/bootstrap.min.css';
import './styles/index.css';
import App from './components';
import registerServiceWorker from './registerServiceWorker';

import { getElectron } from './helperFunctions';

// eslint-disable-next-line no-undef
ReactDOM.render(
  <App electron={getElectron()} />,
  document.getElementById('root')
);
registerServiceWorker();
