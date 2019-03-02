/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'bootstrap-css-only/css/bootstrap.min.css';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './components/index';

import { getElectron } from './helperFunctions';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

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

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

ReactDOM.render(
  <ErrorBoundary>
    <App electron={getElectron()} />
  </ErrorBoundary>,
  document.getElementById('root')
);
registerServiceWorker();
