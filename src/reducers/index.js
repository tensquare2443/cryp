import { combineReducers } from "redux";
import currenciesReducer from "reducers/currencies";
import filteredCurrenciesReducer from "reducers/filtered-currencies";
import currencyDataReducer from "reducers/currency-data";
import currencyHistoryReducer from "reducers/currency-history";
import currencyReducer from "reducers/currency";
import dateRangeReducer from "reducers/date-range";
import colorReducer from "reducers/color";
import loadersReducer from "reducers/loaders";

export default combineReducers({
  currencies: currenciesReducer,
  filteredCurrencies: filteredCurrenciesReducer,
  currency: currencyReducer,
  dateRange: dateRangeReducer,
  currencyData: currencyDataReducer,
  currencyHistory: currencyHistoryReducer,
  color: colorReducer,
  loaders: loadersReducer
});
