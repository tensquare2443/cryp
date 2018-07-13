import {CHANGE_COLOR} from 'actions/types';
import colorReducer from 'reducers/color';

it('handles action of type CHANGE_COLOR', () => {
  const action = {
    type: CHANGE_COLOR,
    payload: ['rgb(208,194,73)','rgb(162,152,61)']
  };
  const newState = colorReducer([], action);

  expect(newState).toEqual(['rgb(208,194,73)','rgb(162,152,61)']);
});

it('handles action of unknown type', () => {
  const action = {
    type: 'UNKNOWN',
    payload: ['rgb(208,194,73)','rgb(162,152,61)']
  };
  const newState = colorReducer([], action);

  expect(newState).toEqual([]);
});
