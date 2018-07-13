import {CHANGE_DATE_RANGE} from 'actions/types';
import dateRangeReducer from 'reducers/date-range';

describe('', () => {
  let payload;
  beforeEach(() => {
    payload = '180day';
  });

  it('should properly handle CHANGE_DATE_RANGE type', () => {
    const action = {
      type: CHANGE_DATE_RANGE,
      payload
    };
    const newState = dateRangeReducer('1day', action);

    expect(newState).toEqual('180day');
  });
  it('should properly handle unknown action type', () => {
    const action = {
      type: 'skiujdhfvs',
      payload
    };
    const newState = dateRangeReducer('1day', action);

    expect(newState).toEqual('1day');
  });

});
