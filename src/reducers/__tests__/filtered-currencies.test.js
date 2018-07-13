import {FILTER_CURRENCIES, UNFILTER_CURRENCIES} from 'actions/types';
import filteredCurrenciesReducer from 'reducers/filtered-currencies';

let payload;
beforeEach(() => {
  payload = {
    currencies: [
      {name: 'Bitcoin', symbol: 'BTC'},
      {name: 'Litecoin', symbol: 'LTC'},
      {name: 'Hellcoin', symbol: '666'}
    ],
    filter: 'tc'
  }
});

it('should properly handle FILTER_CURRENCIES action type', () => {
  const action = {
    type: FILTER_CURRENCIES,
    payload
  };
  const newState = filteredCurrenciesReducer(false, action);

  expect(newState.length).toEqual(2);
  expect(newState).toEqual([
    {name: 'Bitcoin', symbol: 'BTC'},
    {name: 'Litecoin', symbol: 'LTC'}
  ]);
});
it('should properly handle UNFILTER_CURRENCIES action type', () => {
  const action = {
    type: UNFILTER_CURRENCIES,
    payload
  };
  const newState = filteredCurrenciesReducer([{name: 'Hellcoin', symbol: '666'}], action);

  expect(newState).toEqual(false);
});
it('should properly filter with a non-present filter', () => {
  payload.filter = 'aeujfrgkvsdfgvd';
  const action = {
    type: FILTER_CURRENCIES,
    payload
  };
  const newState = filteredCurrenciesReducer(false, action);

  expect(newState.length).toEqual(0);
  expect(newState).toEqual([]);
});
