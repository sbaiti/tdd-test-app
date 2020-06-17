import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * factory functions to create shallow for the app cmponents
 * @function setUap
 * @param {object} props -components props specific to this setup
 * @param {any} state -initial state to setup
 * @returns {ShallowWrapper}
 */

const setUap = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state)
  return wrapper;
}

/**
 * return Shallow wrapper with the given attrr
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper -Enzyme shallow wrapper to search within
 * @param {string} val value of data-test attribut for search
 * @returns {ShallowWrapper}
 */

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

test('render without error', () => {
  const wrapper = setUap();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1)

})

test('renders button increment', () => {
  const wrapper = setUap();
  const buttonComponent = findByTestAttr(wrapper, 'increment-button');
  expect(buttonComponent.length).toBe(1)

})

test('render counter display', () => {
  const wrapper = setUap();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1)
})

test('counter start with 0', () => {
  const wrapper = setUap();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
})

test('clicking button increments counter display', () => {
  const counter = 7;
  const wrapper = setUap(null, { counter });
  // find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  // find display and reset value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1)
})