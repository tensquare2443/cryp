import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import Root from 'Root';
import GraphOptions from 'components/graph-container/graph-options';

let wrapper;
beforeEach(() => {
  wrapper = mount(
    <Root>
      <GraphOptions/>
    </Root>
  );
});
afterEach(() => {
  wrapper.unmount();
});

describe('the graph nav', () => {
  it('should contain three ul elements', () => {
    expect(wrapper.find('ul').length).toEqual(3);
  });
});
