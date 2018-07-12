import {FILTER_CURRENCIES, UNFILTER_CURRENCIES} from 'actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case FILTER_CURRENCIES:
      return action.payload.currencies.filter((currency, index) => {
        if (currency.symbol && currency.symbol.toLowerCase().includes(action.payload.filter.toLowerCase())) {
          return currency;
        } else if (currency.name && currency.name.toLowerCase().includes(action.payload.filter.toLowerCase())) {
          return currency;
        }
      });
    case UNFILTER_CURRENCIES:
      return false;
    default:
      return state;
  }
}
