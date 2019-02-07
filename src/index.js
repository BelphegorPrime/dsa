/* eslint-disable no-undef */
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap-css-only/css/bootstrap.min.css';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';

import { getElectron } from './helperFunctions';
import Spinner from "./components/Spinner";

const App = lazy(() => import('./components'));

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        console.error('error: ', error);
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('error: ', error, 'info: ', info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

const root = ReactDOM.unstable_createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <Suspense fallback={<Spinner />} maxDuration={500}>
      <App electron={getElectron()} />
    </Suspense>
  </ErrorBoundary>
);
registerServiceWorker();
