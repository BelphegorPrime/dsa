/* eslint-disable no-undef */
import React, { StrictMode, ConcurrentMode, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap-css-only/css/bootstrap.min.css';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';

import { getElectron } from './helperFunctions';
import Spinner from "./components/Spinner";

const App = lazy(() => import('./components'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ConcurrentMode>
        <Suspense fallback={<Spinner />}>
            <App electron={getElectron()} />
        </Suspense>
    </ConcurrentMode>
  </StrictMode>
);
registerServiceWorker();
