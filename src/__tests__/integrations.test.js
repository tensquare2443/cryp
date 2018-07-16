import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import Root from 'Root';
import App from 'components/app';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

// let wrapper;
// beforeEach(() => {
//   const mock = new MockAdapter(axios);
//   mock.onGet('http://coincap.io/map').reply(200, [
//     {name: 'Bitcoin', symbol: 'BTC'},
//     {name: 'Litcoin', symbol: 'LTC'},
//     {name: 'Hitcoin', symbol: 'HTC'}
//   ]);
//
//   wrapper = mount(
//     <Root>
//       <App/>
//     </Root>
//   );
// });
// afterEach(() => {
//   wrapper.unmount();
// });
//
// describe('the graph', () => {

  // it('changes color on new color click', () => {
  //   wrapper.find('.color-dropdown-item').simulate('click', {
  //     target: {
  //       dataset: {
  //         id: "['Green','rgb(67,214,69)','rgb(55,169,56)']"
  //       }
  //     }
  //   });
  //   wrapper.update();
  //   //['Green','rgb(67,214,69)','rgb(55,169,56)']
  //   expect(wrapper.find(Line).props.data[0].backgroundColor).toEqual('rgb(67,214,69)');
  // });

  // it('contains not too many days of data', () => {
  //
  // });
// });
