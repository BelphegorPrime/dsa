/* eslint-disable no-undef */
import React from 'react';
// import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap-css-only/css/bootstrap.min.css';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';

import { getElectron } from './helperFunctions';

import App from './components';
// const App = lazy(() => import('./components'))

ReactDOM.render(
  <App electron={getElectron()} />,
  document.getElementById('root')
);
registerServiceWorker();
