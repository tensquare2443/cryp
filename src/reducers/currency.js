import {CHANGE_CURRENCY} from 'actions/types';

export default function(state = {symbol: "BTC", name: "Bitcoin", id: "bitcoin"}, action) {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return action.payload;
    default: return state;
  }
}
