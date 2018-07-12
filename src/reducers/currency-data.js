import {GET_CURRENCY_DATA} from 'actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CURRENCY_DATA:
    return action.payload.data;
    default:
    return state;
  }
}
