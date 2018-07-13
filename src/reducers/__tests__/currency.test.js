import {CHANGE_CURRENCY} from 'actions/types';
import currencyReducer from 'reducers/currency';

it('handles CHANGE_CURRENCY action', () => {
  const action = {
    type: CHANGE_CURRENCY,
    payload: 'LTC'
  };
  const newState = currencyReducer('BTC', action);

  expect(newState).toEqual('LTC');
});

it('handles unknown action type', () => {
  const action = {
    type: 'BLAH',
    payload: 'DOG'
  };
  const newState = currencyReducer('LTC', action);

  expect(newState).toEqual('LTC');
});
