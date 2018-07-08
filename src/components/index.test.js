/* eslint-disable no-undef,no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, Simulate, cleanup } from 'react-testing-library';

import App from './index';
import hero from '../../testData/hero.xml';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('can toogle mastermode', () => {
  let instance;
  const { getByLabelText, getByTestId } = render(
    <App ref={el => (instance = el)} />
  );
  const standard = getByLabelText('Standard');
  const mastermodus = getByLabelText('Meistermodus');
  const houserules = getByLabelText('Hausregeln');
  mastermodus.checked = true;
  Simulate.change(mastermodus);
  expect(mastermodus.checked).toBe(true);
  expect(standard.checked).toBe(false);
  // expect(instance.state.masterMode).toBe(true);
  // expect(getByTestId('app-master-mode-off').className).toBe(
  //   'btn btn-secondary'
  // );
  // expect(getByTestId('app-master-mode-on').className).toBe(
  //   'btn btn-secondary active'
  // );
  //
  // offButton.checked = true;
  // Simulate.change(offButton);
  // expect(offButton.checked).toBe(true);
  // expect(onButton.checked).toBe(false);
  // expect(instance.state.masterMode).toBe(false);
  // expect(getByTestId('app-master-mode-off').className).toBe(
  //   'btn btn-secondary active'
  // );
  // expect(getByTestId('app-master-mode-on').className).toBe('btn btn-secondary');
});

it('can upload a file', () => {
  let instance;
  const { getByTestId } = render(<App ref={el => (instance = el)} />);
  const fileUploadInput = getByTestId('validatedCustomFile');
  fileUploadInput._files = [hero];
  Simulate.change(fileUploadInput);
  console.log(instance.state);
  expect(fileUploadInput._files.length).toBe(1);
  console.log(localStorage.getItem('hero'));
});
