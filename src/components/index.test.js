/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, Simulate, cleanup } from 'react-testing-library';

import App from './index';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('exists an fileupload input', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('validatedCustomFile'));
});
