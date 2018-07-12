import {CHANGE_CURRENCY} from 'actions/types';

export default function(state = 'BTC', action) {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return action.payload;
    default: return state;
  }
}
