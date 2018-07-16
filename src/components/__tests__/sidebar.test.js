import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import Root from 'Root';
import Sidebar from 'components/sidebar';

let wrapper;
beforeEach(() => {
  wrapper = mount(
    <Root>
      <Sidebar/>
    </Root>
  );
});
afterEach(() => {
  wrapper.unmount();
});

it('contains a form', () => {
  expect(wrapper.find('form').length).toEqual(1);
});
it('contains a list', () => {
  expect(wrapper.find('ul').length).toEqual(1);
});
