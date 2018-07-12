import {GET_CURRENCIES} from 'actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case GET_CURRENCIES:
    return action.payload.data.map((currency) => {
      return {name: currency.name, symbol: currency.symbol};
    });
    default:
    return state;
  }
}
