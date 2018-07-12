import {
  GET_CURRENCIES,
  GET_CURRENCY_DATA,
  GET_CURRENCY_HISTORY,
  CHANGE_CURRENCY,
  CHANGE_DATE_RANGE,
  CHANGE_COLOR,
  FILTER_CURRENCIES,
  UNFILTER_CURRENCIES
} from 'actions/types';
import axios from 'axios';

export function getCurrencies() {
  const payload = axios.get('http://coincap.io/map');

  return {type: GET_CURRENCIES, payload};
}

export function getCurrencyData(currency) {
  const payload = axios.get(`http://coincap.io/page/${currency}`);

  return {type: GET_CURRENCY_DATA, payload};
}

// export function getCurrencyHistory(currency, time) {
//   const response = axios.get(`http://coincap.io/history/${time}/${currency}`);
//
//   return {type: GET_CURRENCY_HISTORY, payload: {response, time}};
// }

export function getCurrencyHistory(history, currency, time) {
  return {type: GET_CURRENCY_HISTORY, payload: {history, time}};
}

export function changeCurrency(newCurrency) {
  return {
    type: CHANGE_CURRENCY,
    payload: newCurrency
  };
}

export function changeDateRange(newDateRange) {
  return {
    type: CHANGE_DATE_RANGE,
    payload: newDateRange
  };
}

export function changeColor(newColor) {
  var colors = {
    Blue: ['rgb(86,93,236)','rgb(73, 77, 171)'],
    Green: ['rgb(67,214,69)','rgb(55,169,56)'],
    Red: ['rgb(207,45,45)','rgb(155,30,30)'],
    Gold: ['rgb(208,194,73)','rgb(162,152,61)'],
    Teal: ['rgb(102,225,212)','rgb(89,173,164)'],
    Purple: ['rgb(225,102,218)','rgb(188,88,182)']
  };

  return {
    type: CHANGE_COLOR,
    payload: colors[newColor]
  };
}

export function filterCurrencies(currencies, filter) {
  return {
    type: FILTER_CURRENCIES,
    payload: {currencies, filter}
  };
}
export function unfilterCurrencies() {
  return {type: UNFILTER_CURRENCIES};
}
