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

it('can toogle mastermode', () => {
  const { getByLabelText, getByTestId } = render(<App />);
  const onButton = getByLabelText('ON');
  const offButton = getByLabelText('OFF');
  onButton.checked = true;
  Simulate.change(onButton);
  expect(onButton.checked).toBe(true);
  expect(offButton.checked).toBe(false);
  expect(getByTestId('app-master-mode-off').className).toBe(
    'btn btn-secondary'
  );
  expect(getByTestId('app-master-mode-on').className).toBe(
    'btn btn-secondary active'
  );

  offButton.checked = true;
  Simulate.change(offButton);
  expect(offButton.checked).toBe(true);
  expect(onButton.checked).toBe(false);
  expect(getByTestId('app-master-mode-off').className).toBe(
    'btn btn-secondary active'
  );
  expect(getByTestId('app-master-mode-on').className).toBe('btn btn-secondary');
});
