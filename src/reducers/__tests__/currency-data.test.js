import {GET_CURRENCY_DATA} from 'actions/types';
import currencyDataReducer from 'reducers/currency-data';

let data;
beforeEach(() => {
  data = {
    id: 'ETC',
    price_usd: 16.64
  };
});

it('should handle GET_CURRENCY_DATA action type', () => {
  const action = {
    type: GET_CURRENCY_DATA,
    payload: {data}
  };
  const newState = currencyDataReducer({}, action);

  expect(newState).toEqual({
    id: 'ETC',
    price_usd: 16.64
  });
});

it('should handle unknown action type', () => {
  const action = {
    type: 'GET_CURRENCIES',
    payload: {data}
  };
  const newState = currencyDataReducer({}, action);

  expect(newState).toEqual({});
});
