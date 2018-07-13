import {GET_CURRENCY_HISTORY} from 'actions/types';
import currencyHistoryReducer from 'reducers/currency-history';
import {history} from 'reducers/test-vars/history-example';

describe('currency history reducer', () => {
  let payload;
  beforeEach(() => {
    payload = {
      history,
      time: '7day'
    }
  });

  it('should handle GET_CURRENCY_HISTORY action type', () => {
    const action = {
      type: GET_CURRENCY_HISTORY,
      payload
    };
    const newState = currencyHistoryReducer([], action);

    expect(newState.length).toEqual(7);
    expect(Object.keys(newState[0]).length).toEqual(2);
    expect(Object.keys(newState[0])).toContain('date');
    expect(Object.keys(newState[0])).toContain('price');
  });
  it('should handle unknown action type', () => {
    const action = {
      type: 'BAGKUJS',
      payload
    };
    const newState = currencyHistoryReducer([], action);

    expect(newState).toEqual([]);
  });
});
