import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import App from 'components/app';
import Sidebar from 'components/sidebar';
import GraphContainer from 'components/graph-container';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<App/>);
});

it('shows the Sidebar component', () => {
  expect(wrapper.find(Sidebar).length).toEqual(1);
});

it('shows the GraphContainer component', () => {
  expect(wrapper.find(GraphContainer).length).toEqual(1);
});
