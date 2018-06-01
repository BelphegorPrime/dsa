import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
