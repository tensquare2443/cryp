import {GET_CURRENCIES} from 'actions/types';
import currenciesReducer from 'reducers/currencies';

let data;
beforeEach(() => {
  data = [
    {name: 'AbcCoin', symbol: 'ABC'},
    {name: 'BadCoin', symbol: 'BAD'},
    {name: 'Bits', symbol: 'BT'}
  ];
});

it('should handle GET_CURRENCIES action type', () => {
  const action = {
    type: GET_CURRENCIES,
    payload: {data}
  };
  const newState = currenciesReducer([
    {name: 'Catcoin', symbol: 'CTC'},
    {name: 'Hellcoin', symbol: '666'}
  ], action);

  expect(newState).toEqual([
    {name: 'AbcCoin', symbol: 'ABC'},
    {name: 'BadCoin', symbol: 'BAD'},
    {name: 'Bits', symbol: 'BT'}
  ]);
});

it('should handle unknown action type', () => {
  const action = {
    type: 'UIWEFBKE',
    payload: {data}
  };
  const newState = currenciesReducer([
    {name: 'Catcoin', symbol: 'CTC'},
    {name: 'Hellcoin', symbol: '666'}
  ], action);

  expect(newState).toEqual([
    {name: 'Catcoin', symbol: 'CTC'},
    {name: 'Hellcoin', symbol: '666'}
  ]);
});
