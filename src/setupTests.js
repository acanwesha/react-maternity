// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAxios from 'jest-mock-axios';

// Setup enzyme
configure({ adapter: new Adapter() });


afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});