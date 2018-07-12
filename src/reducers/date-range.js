import {CHANGE_DATE_RANGE} from 'actions/types';

export default function(state = '30day', action) {
  switch (action.type) {
    case CHANGE_DATE_RANGE:
      return action.payload;
    default: return state;
  }
}
